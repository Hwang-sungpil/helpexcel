import {configured} from './_share.js';
export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 const missing=[];
 if(!process.env.SUPABASE_URL)missing.push('SUPABASE_URL');
 if(!process.env.SUPABASE_SERVICE_ROLE_KEY)missing.push('SUPABASE_SERVICE_ROLE_KEY');
 if(!process.env.TURNSTILE_SITE_KEY)missing.push('TURNSTILE_SITE_KEY');
 if(!process.env.TURNSTILE_SECRET_KEY)missing.push('TURNSTILE_SECRET_KEY');
 res.status(200).json({enabled:missing.length===0&&configured(),siteKey:process.env.TURNSTILE_SITE_KEY||'',missing,message:missing.length?`파일 공유 설정 미완료: ${missing.join(', ')}`:'파일 공유 설정이 확인되었습니다. 파일 저장소 및 DB 테이블은 등록 시 검증됩니다.'});
}
