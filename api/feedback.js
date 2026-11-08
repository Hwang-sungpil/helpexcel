import {verify,clean,rich,getText} from './_common.js';
const VERSION='2025-09-03';
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST만 지원합니다.'});
 const token=process.env.NOTION_TOKEN,id=process.env.NOTION_PROBLEMS_DATA_SOURCE_ID;
 if(!token||!id||!process.env.FEEDBACK_SIGNING_SECRET)return res.status(503).json({code:'NOT_CONFIGURED',error:'Notion 자동 축적 환경변수 설정이 필요합니다.'});
 const proof=verify(req.body?.feedbackProof);
 if(!proof)return res.status(403).json({code:'INVALID_PROOF',error:'Gemini가 생성한 답변의 해결 확인만 저장할 수 있습니다. 다시 질문해 주세요.'});
 const question=clean(proof.q,600),answer=clean(proof.a,1900),program=['엑셀','한글'].includes(proof.p)?proof.p:'공통';
 if(question.length<4||answer.length<20)return res.status(400).json({code:'INVALID_CONTENT',error:'저장할 질문 또는 답변이 부족합니다.'});
 const headers={Authorization:`Bearer ${token}`,'Notion-Version':VERSION,'Content-Type':'application/json'};
 try{
  const query=await fetch(`https://api.notion.com/v1/data_sources/${encodeURIComponent(id)}/query`,{method:'POST',headers,body:JSON.stringify({page_size:100,sorts:[{timestamp:'created_time',direction:'descending'}]})});
  const found=await query.json();if(!query.ok)return res.status(502).json({code:'NOTION_READ',error:found.message||'Notion 조회 실패'});
  const normalize=s=>String(s||'').toLowerCase().replace(/\s+/g,'').slice(0,300);
  const duplicate=(found.results||[]).find(page=>normalize(getText(page.properties?.Name))===normalize(question)&&getText(page.properties?.Program)===program&&normalize(getText(page.properties?.Solution))===normalize(answer));
  if(duplicate)return res.status(200).json({saved:true,duplicate:true,message:'이미 공동 DB에 등록된 해결책입니다.'});
  // Notion 속성은 README에 명시된 정확한 이름/타입으로 생성합니다.
  const properties={Name:{title:rich(question)},Program:{select:{name:program}},Category:{rich_text:rich('사용자 해결 확인')},Symptom:{rich_text:rich(question)},Solution:{rich_text:rich(answer)},Keywords:{rich_text:rich('자동 축적 · 해결 확인')}};
  const created=await fetch('https://api.notion.com/v1/pages',{method:'POST',headers,body:JSON.stringify({parent:{type:'data_source_id',data_source_id:id},properties})});const data=await created.json();
  if(!created.ok)return res.status(502).json({code:'NOTION_WRITE',error:data.message||'Notion 저장 실패'});
  return res.status(200).json({saved:true,duplicate:false,message:'채택한 해결책을 공동 DB에 저장했습니다.'});
 }catch(e){return res.status(502).json({code:'NOTION_NETWORK',error:'Notion 통신 오류: '+String(e.message).slice(0,120)})}
}
