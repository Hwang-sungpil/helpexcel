import {configured} from './_share.js';
export default function handler(req,res){res.setHeader('Cache-Control','no-store');res.status(200).json({enabled:configured()&&!!process.env.TURNSTILE_SECRET_KEY&&!!process.env.TURNSTILE_SITE_KEY,siteKey:configured()?process.env.TURNSTILE_SITE_KEY||'':'',message:configured()?'':'공유 저장소 설정이 필요합니다.'})}
