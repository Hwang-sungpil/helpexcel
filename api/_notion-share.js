import {text,validateFile} from './_share.js';
const API='https://api.notion.com/v1';
const HEAD=()=>({Authorization:`Bearer ${process.env.NOTION_TOKEN}`,'Notion-Version':'2025-09-03'});
export const notionReady=()=>!!(process.env.NOTION_TOKEN&&process.env.NOTION_PROBLEMS_DATA_SOURCE_ID);
async function request(path,{method='GET',body,form,timeoutMs=12000}={}){
 const headers=HEAD();if(!form&&body!==undefined)headers['Content-Type']='application/json';
 const r=await fetch(API+path,{method,headers,body:form|| (body===undefined?undefined:JSON.stringify(body)),signal:AbortSignal.timeout(timeoutMs)});
 const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(`Notion ${r.status}: ${d.message||'요청 실패'}`);return d;
}
const rich=s=>[{text:{content:text(s,1700)}}];
const META='HELP_SHARE_META:';
const metaBlock=(size,count=0)=>({object:'block',type:'paragraph',paragraph:{rich_text:rich(META+JSON.stringify({size,downloads:count}))}});
async function readMeta(pageId){const blocks=await request(`/blocks/${encodeURIComponent(pageId)}/children?page_size=100`,{timeoutMs:3500});const marker=(blocks.results||[]).find(b=>b.type==='paragraph'&&b.paragraph?.rich_text?.some(t=>(t.plain_text||t.text?.content||'').startsWith(META)));let data={};if(marker){try{data=JSON.parse(marker.paragraph.rich_text.map(t=>t.plain_text||t.text?.content||'').join('').slice(META.length))}catch{}}return {marker,data,blocks:blocks.results||[]}}
const plain=p=>p?.title?.map(x=>x.plain_text).join('')||p?.rich_text?.map(x=>x.plain_text).join('')||p?.select?.name||'';
export async function uploadNotion(b){
 if(!notionReady())throw new Error('NOTION_TOKEN 및 NOTION_PROBLEMS_DATA_SOURCE_ID 설정이 필요합니다.');
 const title=text(b.title,90),description=text(b.description,600),category=text(b.category,40),filename=text(b.filename,120);
 if(title.length<3||!description||!b.agree)throw new Error('자료명·설명·공개 동의를 확인하세요.');
 const {bytes,ext}=await validateFile(filename,b.base64);
 const contentType=ext==='xlsx'?'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':'application/zip';
 const upload=await request('/file_uploads',{method:'POST',body:{mode:'single_part',filename,content_type:contentType}});
 const form=new FormData();form.append('file',new Blob([bytes],{type:contentType}),filename);
 await request(`/file_uploads/${upload.id}/send`,{method:'POST',form});
 const source=await request(`/data_sources/${encodeURIComponent(process.env.NOTION_PROBLEMS_DATA_SOURCE_ID)}`);
 const databaseId=source.parent?.database_id||source.database_id;
 if(!databaseId)throw new Error('Notion 데이터 소스의 상위 데이터베이스 ID를 확인하지 못했습니다.');
 const properties={Name:{title:rich('[공유자료] '+title)},Program:{select:{name:ext==='xlsx'?'엑셀':'한글'}},Category:{rich_text:rich('자료 공유')},Symptom:{rich_text:rich(category+' | '+filename)},Solution:{rich_text:rich(description)},Keywords:{rich_text:rich('공유자료 '+ext)}};
 const page=await request('/pages',{method:'POST',body:{parent:{database_id:databaseId},properties,children:[{object:'block',type:'paragraph',paragraph:{rich_text:rich('공유자료 · '+category+' · '+filename)}},{object:'block',type:'file',file:{type:'file_upload',file_upload:{id:upload.id},caption:rich(description)}},metaBlock(bytes.length)]}});
 return {ok:true,id:page.id,message:'Notion에 자료가 등록되었습니다. 공유 전 개인정보 및 파일 내용을 다시 확인하세요.'};
}
async function querySharePages(){
 const id=String(process.env.NOTION_PROBLEMS_DATA_SOURCE_ID||'').trim().replace(/-/g,'');
 if(!/^[0-9a-f]{32}$/i.test(id))throw new Error('Notion 데이터 소스 ID가 올바르지 않습니다.');
 const token=process.env.NOTION_TOKEN;
 const headers=v=>({Authorization:`Bearer ${token}`,'Notion-Version':v,'Content-Type':'application/json'});
 async function call(path,version,method='POST',body={page_size:100}){
  const r=await fetch(API+path,{method,headers:headers(version),body:method==='POST'?JSON.stringify(body):undefined,signal:AbortSignal.timeout(11000)});
  const raw=await r.text();let d;try{d=JSON.parse(raw)}catch{throw new Error(`Notion ${r.status}: JSON 응답이 아닙니다`)}
  if(!r.ok)throw new Error(`Notion ${r.status}: ${d.message||d.code||'조회 실패'}`);
  return d;
 }
 let sourceId=id,errors=[];
 try{
  const info=await call(`/data_sources/${id}`,'2025-09-03','GET');
  sourceId=info.id||id;
 }catch(e){
  errors.push(e.message);
  // 데이터베이스 ID가 설정된 경우, 연결된 데이터 소스를 찾아 사용합니다.
  try{const db=await call(`/databases/${id}`,'2025-09-03','GET');sourceId=db.data_sources?.[0]?.id||id}catch(e2){errors.push(e2.message)}
 }
 try{return await call(`/data_sources/${encodeURIComponent(sourceId)}/query`,'2025-09-03')}
 catch(e){errors.push(e.message)}
 // 기존 Notion 데이터베이스 API를 쓰는 연결도 지원합니다.
 try{return await call(`/databases/${id}/query`,'2022-06-28')}
 catch(e){errors.push(e.message)}
 throw new Error(errors.join(' / ').slice(0,550));
}
export async function listNotion(q='',type=''){
 const d=await querySharePages();const arr=[];
 for(const p of d.results||[]){
  const pr=p.properties||{},name=plain(pr.Name)||plain(pr.제목);
  const symptom=plain(pr.Symptom),keywords=plain(pr.Keywords);
  const marked=name.startsWith('[공유자료] ')||/공유자료/.test(keywords)||plain(pr.Category)==='자료 공유';
  if(!marked)continue;
  const program=plain(pr.Program),parts=symptom.split(' | ');
  const filename=parts.length>1?parts.slice(1).join(' | '):'';
  const ext=/\.xlsx$/i.test(filename)?'xlsx':/\.hwpx$/i.test(filename)?'hwpx':program==='엑셀'?'xlsx':'hwpx';
  const title=name.replace(/^\[공유자료\]\s*/,'')||filename;
  const description=plain(pr.Solution),category=parts[0]||'기타';
  if(type&&type!==ext)continue;
  if(q&&!`${title} ${filename} ${description} ${category}`.toLowerCase().includes(q.toLowerCase()))continue;
  arr.push({id:p.id,title,filename:filename||title+'.'+ext,description,category,file_type:ext,file_size:null,created_at:p.created_time,downloads:null,likes:0,verification_status:'unverified',provider:'notion'});
 }
 return arr;
}
export async function downloadNotion(id){
 if(!/^[0-9a-f-]{32,36}$/i.test(String(id)))throw new Error('잘못된 자료 ID입니다.');
 const page=await request(`/pages/${encodeURIComponent(id)}`);if(!plain(page.properties?.Name).startsWith('[공유자료] '))throw new Error('공유자료가 아닙니다.');
 const {blocks,marker,data}=await readMeta(id);const block=blocks.find(x=>x.type==='file'&&x.file?.file?.url);
 if(!block)throw new Error('Notion 파일을 찾을 수 없습니다.');
 const next=(Number.isInteger(data.downloads)&&data.downloads>=0?data.downloads:0)+1;
 try{if(marker){await request(`/blocks/${marker.id}`,{method:'PATCH',body:{paragraph:{rich_text:rich(META+JSON.stringify({...data,downloads:next}))}}})}else{await request(`/blocks/${encodeURIComponent(id)}/children`,{method:'PATCH',body:{children:[metaBlock(null,next)]}})}}catch(e){throw new Error('다운로드 횟수 기록 실패: '+e.message)}
 return block.file.file.url;
}
