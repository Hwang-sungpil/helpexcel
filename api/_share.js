import crypto from 'node:crypto';
import JSZip from 'jszip';
const url=()=>String(process.env.SUPABASE_URL||'').replace(/\/$/,'');
const key=()=>process.env.SUPABASE_SERVICE_ROLE_KEY||'';
export const configured=()=>!!(url()&&key());
export function headers(extra={}){return {apikey:key(),Authorization:`Bearer ${key()}`,...extra}}
export function fail(res,status,message){return res.status(status).json({error:message})}
export async function db(path,options={}){
 const r=await fetch(`${url()}/rest/v1/${path}`,{...options,headers:headers({'Content-Type':'application/json',...options.headers})});
 const txt=await r.text();let data;try{data=txt?JSON.parse(txt):null}catch{data={message:txt.slice(0,200)}};
 if(!r.ok)throw new Error(`DB ${r.status}: ${data?.message||data?.error||'요청 실패'}`);return data;
}
export async function verifyCaptcha(token,ip){
 const secret=process.env.TURNSTILE_SECRET_KEY;
 if(!secret)return false; // 공개 업로드는 봇 검증 없이는 허용하지 않음
 const form=new URLSearchParams({secret,response:String(token||''),remoteip:ip||''});
 const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:form,signal:AbortSignal.timeout(9000)});
 const data=await r.json();return data.success===true;
}
export function text(v,max=150){return String(v||'').replace(/[\u0000-\u001f<>]/g,' ').trim().slice(0,max)}
export async function validateFile(filename,base64){
 const ext=String(filename||'').toLowerCase().split('.').pop();
 if(!['xlsx','hwpx'].includes(ext))throw new Error('현재 공유는 XLSX·HWPX 파일만 허용합니다.');
 if(typeof base64!=='string'||base64.length>3_000_000)throw new Error('파일은 최대 2MB까지 등록할 수 있습니다.');
 const bytes=Buffer.from(base64,'base64');
 if(bytes.length<100||bytes.length>2*1024*1024||bytes.subarray(0,4).toString('hex')!=='504b0304')throw new Error('파일 형식 또는 크기가 올바르지 않습니다.');
 const zip=await JSZip.loadAsync(bytes,{checkCRC32:false});
 const entries=Object.values(zip.files);if(entries.length>2000)throw new Error('압축 항목이 너무 많습니다.');
 let total=0;for(const f of entries){const n=f.name.toLowerCase();if(f.dir)continue;total+=f._data?.uncompressedSize||0;if(total>30*1024*1024)throw new Error('압축 해제 크기 제한을 초과했습니다.');if(/(^|\/)(vbaproject\.bin|activex|embeddings|externallinks|oleobjects)(\/|\.|$)/i.test(n)||/\.exe$|\.js$|\.vbs$|\.bat$|\.ps1$/i.test(n))throw new Error('매크로·외부 연결·삽입 실행 객체가 포함된 파일은 공유할 수 없습니다.');}
 const names=entries.map(x=>x.name.toLowerCase());
 if(ext==='xlsx'&&!names.includes('xl/workbook.xml'))throw new Error('정상적인 XLSX 파일이 아닙니다.');
 if(ext==='hwpx'&&!names.some(n=>n.startsWith('contents/section')&&n.endsWith('.xml')))throw new Error('정상적인 HWPX 파일이 아닙니다.');
 return {bytes,ext};
}
export async function storage(path,bytes){const r=await fetch(`${url()}/storage/v1/object/shared-documents/${path}`,{method:'POST',headers:headers({'Content-Type':'application/octet-stream','x-upsert':'false'}),body:bytes});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(`파일 저장 실패: ${d.message||r.status}`)}
export async function removeStorage(path){await fetch(`${url()}/storage/v1/object/shared-documents/${path}`,{method:'DELETE',headers:headers()}).catch(()=>{})}
export async function signed(path){const r=await fetch(`${url()}/storage/v1/object/sign/shared-documents/${path}`,{method:'POST',headers:headers({'Content-Type':'application/json'}),body:JSON.stringify({expiresIn:60})});const d=await r.json();if(!r.ok||!d.signedURL)throw new Error('다운로드 주소 생성 실패');return `${url()}/storage/v1${d.signedURL}`}
export const uuid=()=>crypto.randomUUID();
