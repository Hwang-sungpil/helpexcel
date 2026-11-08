import {sign,clean} from './_common.js';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
const MODEL=(process.env.GEMINI_MODEL||'gemini-3.8-flash').trim().replace(/^models\//,'');
const FALLBACK_MODEL=(process.env.GEMINI_FALLBACK_MODEL||'gemini-3.1-flash-lite').trim().replace(/^models\//,'');
const FAST_MODEL=(process.env.GEMINI_FAST_MODEL||'gemini-3.1-flash-lite').trim().replace(/^models\//,'');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const SYSTEM=`당신은 한국어 엑셀·한글 실무 및 데이터 분석 전문가다. 사용자의 요청을 ① 오류·사용법 해결 ② 표·그래프 작성 ③ 첨부 문서 요약·내용 분석·작성 취지 파악 중에서 판별하고, 요청 목적에 맞게 답하라. 첫 줄에 반드시 '작업 유형: 오류해결' 또는 '작업 유형: 시각화' 또는 '작업 유형: 내용분석'을 쓴다. 다음 줄은 '대상 프로그램: 엑셀' 또는 '대상 프로그램: 한글' 또는 '대상 프로그램: 불확실' 중 하나. 오류해결이면 진단, 실제 메뉴 경로, 1~5단계 방법과 확인 사항을 작성한다. 내용분석이면 '핵심 요약', '주요 내용', '취지·시사점', '자료의 한계'로 구분하고 첨부에서 확인된 사실만 사용한다. 시각화 요청이면 메뉴 위치 안내·수식 입력법·문제 해결 개념도·긴 서론을 절대 작성하지 않는다. 사용자가 요청한 대상(예: 남, 여, 특정 월, 특정 항목)만 정확히 선택한다. 시각화 응답은 제목과 짧은 해석 2~3문장만 작성하고, 답변 맨 끝에 정확히 다음 형식의 코드블록을 반드시 추가한다: \`\`\`vizjson\n{"title":"제목","chartType":"bar","columns":["항목","값"],"rows":[["2024",12],["2025",15]],"xColumn":0,"yColumn":1,"yColumns":[1],"unit":"건"}\n\`\`\` . chartType은 bar,line,pie,table 중 하나다. 이미지에서 판독한 값은 임의로 보간하지 않고 요청 항목과 단위·월을 일치시킨다. 열과 행은 실제 확인한 수치만 사용하며 원문에 수치가 없으면 임의 수치를 생성하지 말고 표를 만들어 달라는 요청이라도 자료 부족을 설명한다. 그래프의 yColumn은 반드시 숫자 열을 가리킨다. 사용자가 Y축 최소·최대·눈금 간격을 지정하면 vizjson에 "axis":{"yMin":0,"yMax":10,"yStep":2} 형태로 정확히 반영한다. 요청한 그래프 유형(라인·막대)과 남·여 등의 전체 계열도 반드시 반영한다. 두 개 이상 계열을 요청하면(남여, 남·여, 남과 여, 성별 등) columns와 rows에 모든 계열을 넣고 yColumns:[1,2]처럼 숫자 계열의 열 인덱스를 모두 제공한다. 남여 요청에 남만 또는 여만 출력하는 것은 오답이다. 묶은 막대그래프로 표시하며 월별 남녀 값이 모두 포함되어야 한다. 표만 요청하면 chartType=table로 한다. 첨부가 여러 시트나 페이지의 일부만 추출되었다면 분석 범위를 명확히 밝힌다. 첨부파일에서 확인한 수치와 답변 수치가 일치하도록 검증한다. 개인정보를 되풀이하지 않는다. 화면 캡처나 문서 형식을 직접 확인하지 못한 사항은 확인했다고 주장하지 않는다. 답변은 한국어로 작성한다.`;
function failure(status,data){const message=String(data?.error?.message||'');const details=JSON.stringify(data?.error?.details||[]);const s=(message+' '+details).toLowerCase();if(status===429){const daily=/per.day|per_day|daily|requests_per_day|rpd|free_tier_requests/.test(s);const minute=/per.minute|per_minute|rpm|tpm|rate.limit/.test(s);return {code:daily?'DAILY_QUOTA':minute?'RATE_LIMIT':'QUOTA_UNKNOWN',error:daily?'Gemini 일일 무료 할당량에 도달했을 수 있습니다. AI Studio에서 사용량과 초기화 시점을 확인하세요.':minute?'분당 요청 제한입니다. 잠시 후 다시 시도하세요.':'Gemini 요청 한도(429)에 도달했습니다. 일일 소진인지 일시 제한인지 AI Studio에서 확인하세요.'}}if(status===401||status===403)return {code:'AUTH',error:'Gemini API 키 또는 프로젝트 권한을 확인하세요.'};if(status===404)return {code:'MODEL',error:'Gemini 모델 호출이 404로 실패했습니다. /api/gemini-status에서 사용 가능한 모델을 확인하세요. Google 응답: '+message.slice(0,260)};if(status>=500)return {code:'TEMPORARY',error:`Gemini 서버 응답 HTTP ${status}: ${message.slice(0,420)||'상세 메시지 없음'}. 잠시 후 다시 시도하세요.`,googleStatus:status,googleErrorCode:data?.error?.status||null};return {code:'API_ERROR',error:'Gemini API 오류: '+message.slice(0,300)}}
function textOfXml(xml){return xml.replace(/<[^>]*>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim()}
async function parseAttachment(a){
 const ext=(a.name||'').split('.').pop().toLowerCase();const m=String(a.dataUrl||'').match(/^data:([^;,]+);base64,([A-Za-z0-9+/=]+)$/);if(!m)throw Error('파일 형식이 올바르지 않습니다.');const b=Buffer.from(m[2],'base64');if(b.length>7*1024*1024)throw Error('첨부파일은 각각 7MB 이하만 지원합니다.');
 if(['png','jpg','jpeg','webp'].includes(ext)||m[1].startsWith('image/'))return {inline_data:{mime_type:m[1],data:m[2]}};
 if(ext==='pdf')return {inline_data:{mime_type:'application/pdf',data:m[2]}};
 if(ext==='csv'){const decoded=new TextDecoder('utf-8',{fatal:false}).decode(b);return {text:`CSV 파일 ${a.name} 내용(일부):\n${decoded.slice(0,16000)}`}}
 if(['xlsx','xlsm'].includes(ext)){
  const book=new ExcelJS.Workbook();await book.xlsx.load(b);const out=[];for(const sheet of book.worksheets.slice(0,8)){const rows=[];sheet.eachRow({includeEmpty:false},(row,n)=>{if(rows.length>=70)return;const cells=[];row.eachCell({includeEmpty:false},(cell,col)=>{if(cells.length>=22)return;const value=cell.formula?`수식=${cell.formula};값=${JSON.stringify(cell.result??'')}`:String(cell.text||'');cells.push(`${cell.address}:${value.slice(0,160)}`)});rows.push(`${n}행 ${cells.join(' | ')}`)});out.push(`시트: ${sheet.name} (${sheet.rowCount}행, ${sheet.columnCount}열)\n${rows.join('\n')}`)}return {text:`엑셀 파일 ${a.name}의 추출된 셀·수식 (일부, 전체 파일 분석 아님):\n${out.join('\n\n').slice(0,22000)}`};
 }
 if(ext==='hwpx'){
  const zip=await JSZip.loadAsync(b);const names=Object.keys(zip.files).filter(x=>/^Contents\/section\d+\.xml$/i.test(x)).sort((x,y)=>Number(x.match(/\d+/)?.[0]||0)-Number(y.match(/\d+/)?.[0]||0));if(!names.length)throw Error('HWPX 본문 XML을 찾지 못했습니다.');let result='';for(const name of names.slice(0,12)){const xml=await zip.file(name).async('string');result+=`\n${name}: ${textOfXml(xml).slice(0,6500)}`;if(result.length>22000)break}return {text:`한글 HWPX ${a.name} 추출 본문 (텍스트만; 실제 셀 배경색 등 서식은 이미지로 확인 필요):${result.slice(0,22000)}`};
 }
 throw Error('지원하지 않는 파일 형식입니다: '+ext)
}
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST만 지원합니다.'});
 if(!process.env.GEMINI_API_KEY)return res.status(503).json({code:'NO_KEY',error:'Vercel 환경변수 GEMINI_API_KEY를 등록하세요.'});
 try{
 const {question='',program='',version='',attachments=[],context=[],previousAnswer=''}=req.body||{};
 if(!String(question).trim()&&!attachments.length)return res.status(400).json({code:'INPUT',error:'질문 또는 첨부가 필요합니다.'});
 if(attachments.length>5)return res.status(400).json({code:'INPUT',error:'첨부는 최대 5개까지 가능합니다.'});
 const parts=[{text:`프로그램 자동 판별 힌트(미확인은 결정하지 말 것): ${program}; 버전: ${version||'미확인'}\n질문: ${String(question).slice(0,4500)}\n이전 실패 답변: ${String(previousAnswer).slice(0,2500)}\n참고 지식(질문과 일치할 때만): ${JSON.stringify(context).slice(0,2200)}`}];const attachmentWarnings=[];
 for(const a of attachments){try{const item=await parseAttachment(a);parts.push({text:`첨부파일 이름: ${String(a.name).slice(0,150)}`});parts.push(item)}catch(e){attachmentWarnings.push(`${String(a.name).slice(0,70)}: ${e.message}`)}}
 if(!parts.some(p=>p.inline_data||String(p.text||'').includes('추출'))&&!String(question).trim())return res.status(400).json({code:'INPUT',error:'첨부파일을 분석할 수 없습니다. '+attachmentWarnings.join(' / ')});
 const isVisualRequest=/(그래프|차트|시각화|막대|꺾은선|원형|도표|표\s*(?:로|작성|만들|그려)|plot|chart)/i.test(String(question));
 // 짧은 시각화 요청은 빠른 경량 모델을 우선 사용하고, 실패한 경우에만 일반 모델을 시도합니다.
 // 429(할당량), 401/403(인증), 400(요청 오류)은 재시도하지 않아 무료 한도 낭비를 방지합니다.
 async function callGemini(model,timeoutMs){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeoutMs);
  try{
   const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,{
    method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},
    body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM}]},contents:[{role:'user',parts}],generationConfig:{maxOutputTokens:isVisualRequest?850:1200}}),signal:controller.signal
   });
   const data=await response.json().catch(()=>({}));
   if(!response.ok)console.error('[Gemini generateContent]',JSON.stringify({model,status:response.status,googleStatus:data?.error?.status,message:String(data?.error?.message||'').slice(0,800)}));
   return {response,data,model};
  }finally{clearTimeout(timer)}
 }
 const firstModel=isVisualRequest?FAST_MODEL:MODEL;
 const secondModel=isVisualRequest?MODEL:FALLBACK_MODEL;
 const firstTimeout=isVisualRequest?14000:20000;
 const secondTimeout=isVisualRequest?14000:18000;
 let result=null,networkError=null;
 try{result=await callGemini(firstModel,firstTimeout)}catch(e){networkError=e;console.error('[Gemini first attempt]',firstModel,String(e.message||e))}
 // 할당량/인증/잘못된 요청에는 다른 모델을 호출하지 않아 무료 API 소모를 줄입니다.
 const shouldFallback=secondModel&&secondModel!==firstModel&&(!result||[404,500,502,503,504].includes(result.response.status));
 if(shouldFallback){
  if(result?.response?.status===503)await sleep(650+Math.floor(Math.random()*450));
  console.warn('[Gemini retry]',JSON.stringify({from:firstModel,to:secondModel,reason:networkError?.message||result?.response.status}));
  try{result=await callGemini(secondModel,secondTimeout);networkError=null}catch(e){networkError=e;console.error('[Gemini retry failed]',secondModel,String(e.message||e))}
 }
 if(!result || (networkError&&shouldFallback))return res.status(504).json({code:'TIMEOUT',error:'Gemini 응답 시간이 초과되었습니다. 모델별 요청 기록을 Vercel Logs에서 확인하세요.'});
 const {response,data,model:usedModel}=result;
 if(!response.ok){
  const failed=failure(response.status,data);
  if(response.status===503)failed.error='Gemini 서버가 현재 혼잡합니다(503). 다른 모델 재시도도 실패했습니다. 잠시 후 다시 요청하세요. Google 응답: '+String(data?.error?.message||'').slice(0,250);
  return res.status(response.status).json({...failed,attemptedModel:usedModel});
 }
 const answer=(data.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();if(!answer)return res.status(502).json({code:'EMPTY',error:'AI가 답변을 생성하지 않았습니다. 다른 질문으로 다시 시도하세요.'});const taskType=answer.match(/^작업 유형:\s*(오류해결|시각화|내용분석)/m)?.[1]||'오류해결';const detectedProgram=answer.match(/^대상 프로그램:\s*(엑셀|한글|불확실)/m)?.[1]||'불확실';const proof=sign({q:clean(question,600),a:clean(answer,1900),p:detectedProgram,exp:Date.now()+30*60*1000});return res.status(200).json({answer,taskType,detectedProgram,attachmentWarnings,model:usedModel,feedbackProof:proof});
 }catch(e){return res.status(503).json({code:'NETWORK',error:e.name==='AbortError'?'Gemini 응답 시간이 초과되었습니다.':'첨부 분석 또는 API 연결 실패: '+String(e.message||'').slice(0,160)})}
}
