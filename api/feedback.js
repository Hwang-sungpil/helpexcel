// Anonymous feedback is disabled by default to prevent public Notion database spam.
// Set ENABLE_PUBLIC_FEEDBACK=true only after implementing CAPTCHA/rate limiting.
export default async function handler(req,res){
 if(req.method!=='POST')return res.status(405).json({error:'POST만 지원합니다.'});
 if(process.env.ENABLE_PUBLIC_FEEDBACK!=='true')return res.status(503).json({code:'REVIEW_REQUIRED',error:'공동 지식 저장은 관리자 검토 방식입니다. 공개 자동 등록은 비활성화되어 있습니다.'});
 return res.status(503).json({code:'SECURITY',error:'익명 공개 저장은 스팸·개인정보 위험으로 차단됩니다. 관리자 인증과 검토 대기열을 먼저 구현해야 합니다.'});
}
