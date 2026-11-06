const notionVersion='2022-06-28';
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'GET만 지원합니다.'});
 const token=process.env.NOTION_TOKEN,id=process.env.NOTION_PROBLEMS_DATA_SOURCE_ID;
 if(!token||!id)return res.status(200).json({connected:false,items:[]});
 try{
  const r=await fetch(`https://api.notion.com/v1/data_sources/${encodeURIComponent(id)}/query`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Notion-Version':'2025-09-03','Content-Type':'application/json'},body:JSON.stringify({page_size:100})});
  const d=await r.json();if(!r.ok)return res.status(502).json({error:d.message||'Notion 조회 실패'});
  const value=(p)=>p?.title?.map(x=>x.plain_text).join('')||p?.rich_text?.map(x=>x.plain_text).join('')||p?.select?.name||'';
  const items=(d.results||[]).map(x=>({id:x.id,title:value(x.properties?.Name)||value(x.properties?.제목)||value(x.properties?.문제),program:value(x.properties?.Program)||value(x.properties?.프로그램)||'공통',category:value(x.properties?.Category)||value(x.properties?.분류)||'기타',symptom:value(x.properties?.Symptom)||value(x.properties?.증상),solution:value(x.properties?.Solution)||value(x.properties?.해결책),keywords:value(x.properties?.Keywords)||value(x.properties?.키워드)})).filter(x=>x.title);
  res.setHeader('Cache-Control','s-maxage=60, stale-while-revalidate=300');return res.status(200).json({connected:true,items,has_more:d.has_more});
 }catch(e){return res.status(502).json({error:'Notion 연결 오류'})}
}
