import {sign,clean} from './_common.js';
import ExcelJS from 'exceljs';
import JSZip from 'jszip';
const MODEL=process.env.GEMINI_MODEL||'gemini-2.5-flash';
const SYSTEM=`당신은 한국어 실무 지원 전문가다. 대상 프로그램은 엑셀 또는 한글(HWP/HWPX)이다. 첨부된 실제 이미지·문서 내용과 사용자의 질문을 최우선으로 판단한다. 사용자가 선택한 프로그램이 이미지나 문서 내용과 충돌하면 첨부를 우선한다. 절대로 엑셀 메뉴를 한글 질문에 안내하지 않는다. 첨부 내용에 없는 사실을 추측해 단정하지 않는다. 첫 줄은 반드시 '대상 프로그램: 엑셀' 또는 '대상 프로그램: 한글' 또는 '대상 프로그램: 불확실' 중 하나. 다음에는 '문제 진단', '따라 하기'를 표시하고 1~5단계로 실제 프로그램 메뉴 경로를 '상위 메뉴 → 하위 메뉴 → 버튼' 형식으로 명확하게 적는다. 메뉴 위치를 찾기 쉽게 각 단계마다 클릭할 위치와 기대 결과를 설명한다. '메뉴 위치 요약'에서 텍스트 도식(예: [표] → [셀 테두리/배경] → [배경])을 표시한다. 버전별 차이를 인정하고, 실제 화면을 보지 않은 메뉴는 확인했다고 주장하지 않는다. 첨부파일을 분석했다면 파일에서 확인한 시트명, 셀, 표 내용 또는 문서 텍스트 근거를 짧게 적는다. 마지막에 '해결되지 않을 때' 대안을 제시한다. 이전 답변이 제공되면 같은 방법을 반복하지 말고 다른 원인을 제시한다. 개인정보를 답변에 되풀이하지 않는다. 공공기관의 개인정보·비공개 문서는 외부 전송을 피하도록 안내한다. 이미지 자체를 생성할 수 없는 경우 실제 캡처라고 주장하지 않는다.`;
function failure(status,data){const message=String(data?.error?.message||'');const details=JSON.stringify(data?.error?.details||[]);const s=(message+' '+details).toLowerCase();if(status===429){const daily=/per.day|per_day|daily|requests_per_day|rpd|free_tier_requests/.test(s);const minute=/per.minute|per_minute|rpm|tpm|rate.limit/.test(s);return {code:daily?'DAILY_QUOTA':minute?'RATE_LIMIT':'QUOTA_UNKNOWN',error:daily?'Gemini 일일 무료 할당량에 도달했을 수 있습니다. AI Studio에서 사용량과 초기화 시점을 확인하세요.':minute?'분당 요청 제한입니다. 잠시 후 다시 시도하세요.':'Gemini 요청 한도(429)에 도달했습니다. 일일 소진인지 일시 제한인지 AI Studio에서 확인하세요.'}}if(status===401||status===403)return {code:'AUTH',error:'Gemini API 키 또는 프로젝트 권한을 확인하세요.'};if(status===404)return {code:'MODEL',error:'모델을 찾을 수 없습니다. GEMINI_MODEL 설정을 확인하세요.'};if(status>=500)return {code:'TEMPORARY',error:'Gemini 서버 일시 오류입니다. 다시 시도하세요.'};return {code:'API_ERROR',error:'Gemini API 오류: '+message.slice(0,300)}}
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
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),45000);let response;
 try{response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM}]},contents:[{role:'user',parts}],generationConfig:{temperature:0.1,maxOutputTokens:2400}}),signal:controller.signal})}finally{clearTimeout(timer)}
 const data=await response.json().catch(()=>({}));if(!response.ok)return res.status(response.status).json(failure(response.status,data));const answer=(data.candidates?.[0]?.content?.parts||[]).map(p=>p.text||'').join('').trim();if(!answer)return res.status(502).json({code:'EMPTY',error:'AI가 답변을 생성하지 않았습니다. 다른 질문으로 다시 시도하세요.'});const detectedProgram=answer.match(/^대상 프로그램:\s*(엑셀|한글|불확실)/m)?.[1]||'불확실';const proof=sign({q:clean(question,600),a:clean(answer,1900),p:detectedProgram,exp:Date.now()+30*60*1000});return res.status(200).json({answer,detectedProgram,attachmentWarnings,model:MODEL,feedbackProof:proof});
 }catch(e){return res.status(503).json({code:'NETWORK',error:e.name==='AbortError'?'Gemini 응답 시간이 초과되었습니다.':'첨부 분석 또는 API 연결 실패: '+String(e.message||'').slice(0,160)})}
}
