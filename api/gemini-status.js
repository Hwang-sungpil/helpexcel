// Diagnostic endpoint: never returns API keys or raw private request data.
export default async function handler(req,res){
 if(req.method!=='GET')return res.status(405).json({error:'GET only'});
 res.setHeader('Cache-Control','no-store');
 const key=process.env.GEMINI_API_KEY;
 const configured=(process.env.GEMINI_MODEL||'gemini-2.5-flash').trim().replace(/^models\//,'');
 if(!key)return res.status(503).json({connected:false,code:'NO_KEY',configuredModel:configured,message:'GEMINI_API_KEY is not set in this deployment.'});
 try{
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=100',{headers:{'x-goog-api-key':key},signal:AbortSignal.timeout(12000)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)return res.status(200).json({connected:false,code:data.error?.status||'API_ERROR',httpStatus:r.status,configuredModel:configured,message:String(data.error?.message||'Gemini model list failed').slice(0,350)});
  const models=(data.models||[]).filter(m=>(m.supportedGenerationMethods||[]).includes('generateContent')).map(m=>m.name.replace(/^models\//,''));
  const matching=models.includes(configured);
  return res.status(200).json({connected:true,configuredModel:configured,modelAvailable:matching,availableFlashModels:models.filter(m=>/flash/i.test(m)).slice(0,25),message:matching?'Configured model is listed as available.':'Configured model is not in the API model list. Choose a model listed here; check its free-tier eligibility in AI Studio.'});
 }catch(e){return res.status(200).json({connected:false,code:'NETWORK',configuredModel:configured,message:String(e.message).slice(0,180)});}
}
