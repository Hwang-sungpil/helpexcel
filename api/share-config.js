import {configured} from './_share.js';
import {notionReady} from './_notion-share.js';
export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const missing=[];
 if(!process.env.SUPABASE_URL)missing.push('SUPABASE_URL');
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY)missing.push('SUPABASE_SERVICE_ROLE_KEY');
 if(!process.env.TURNSTILE_SITE_KEY)missing.push('TURNSTILE_SITE_KEY');
 if(!process.env.TURNSTILE_SECRET_KEY)missing.push('TURNSTILE_SECRET_KEY');
 const provider=configured()&&process.env.TURNSTILE_SITE_KEY&&process.env.TURNSTILE_SECRET_KEY?'supabase':notionReady()?'notion':null;
 res.status(200).json({enabled:!!provider,provider,siteKey:provider==='supabase'?process.env.TURNSTILE_SITE_KEY:'',missing:provider?[]:missing,message:provider==='notion'?'Notion 파일 공유 사용 가능 (파일 업로드 API 지원 필요)':provider==='supabase'?'Supabase 파일 공유 설정 완료':`저장소 설정 미완료: ${missing.join(', ')}. Notion 연결도 확인하세요.`});
}
