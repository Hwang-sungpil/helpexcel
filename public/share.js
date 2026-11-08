'use strict';
const $=id=>document.getElementById(id);let items=[],selected=null,siteKey='',widgetId=null;
const fmt=n=>Number(n||0).toLocaleString('ko-KR');
function el(tag,cls,text){const x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x}
function modal(id,open){$(id).hidden=!open;document.body.style.overflow=open?'hidden':''}
function message(t){$('listStatus').textContent=t}
async function json(url,options){const r=await fetch(url,options);const d=await r.json().catch(()=>({error:'응답을 읽을 수 없습니다.'}));if(!r.ok)throw new Error(d.error||`HTTP ${r.status}`);return d}
async function load(){message('자료를 불러오는 중...');$('cards').replaceChildren();try{const q=$('search').value.trim(),type=$('type').value;const d=await json(`/api/share-list?q=${encodeURIComponent(q)}&type=${encodeURIComponent(type)}`);items=d.items||[];if(!d.configured)message('공유 저장소 연결 전입니다. README의 Supabase 설정을 완료해 주세요.');else message(`공유자료 ${items.length}건 · 등록자의 자료로 검증 전 상태입니다.`);render()}catch(e){message(e.message)}}
function render(){const root=$('cards');root.replaceChildren();if(!items.length){root.append(el('div','empty','검색 결과가 없습니다.'));return}for(const d of items){const card=el('article','card');card.append(el('span','badge',d.file_type==='xlsx'?'▦ 엑셀':'▤ 한글'));card.append(el('h3','',d.title));card.append(el('p','sub',d.description.length>100?d.description.slice(0,100)+'…':d.description));card.append(el('p','muted',`${d.category} · ${Math.ceil(d.file_size/1024)}KB · 다운로드 ${fmt(d.downloads)} · 추천 ${fmt(d.likes)}`));const actions=el('div','actions'),btn=el('button','outline','상세 보기');btn.onclick=()=>openDetail(d);actions.append(btn);card.append(actions);root.append(card)}}
function openDetail(d){selected=d;$('detailTitle').textContent=d.title;$('detailMeta').textContent=`${d.file_type.toUpperCase()} · ${d.category} · ${new Date(d.created_at).toLocaleDateString('ko-KR')} · ${d.verification_status==='verified'?'검증 완료':'미검증 공유자료'}`;$('detailText').textContent=d.description;$('detailStatus').textContent='';modal('detailModal',true)}
async function action(type,reason){if(!selected)return;try{const d=await json('/api/share-action',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:selected.id,action:type,reason})});$('detailStatus').textContent=d.message;load()}catch(e){$('detailStatus').textContent=e.message}}
$('downloadBtn').onclick=()=>{if(selected)window.location.href=`/api/share-download?id=${encodeURIComponent(selected.id)}`};
$('likeBtn').onclick=()=>{if(!selected)return;const k=`liked-${selected.id}`;if(sessionStorage.getItem(k)){ $('detailStatus').textContent='이 브라우저 세션에서는 이미 추천했습니다.';return}sessionStorage.setItem(k,'1');action('like')};
$('reportBtn').onclick=()=>{const reason=prompt('신고 사유를 8자 이상 입력해 주세요. (개인정보, 저작권, 유해 파일 등)');if(reason!==null)action('report',reason)};
$('detailClose').onclick=()=>modal('detailModal',false);
$('openUpload').onclick=()=>{modal('uploadModal',true);$('uploadStatus').textContent=uploadConfig.enabled?'파일을 선택하고 등록하기를 누르세요.':(uploadConfig.message||'저장소 연결 상태를 확인 중입니다.');};$('closeUpload').onclick=()=>modal('uploadModal',false);
$('searchBtn').onclick=load;$('type').onchange=load;$('search').onkeydown=e=>{if(e.key==='Enter')load()};
$('file').onchange=()=>{const f=$('file').files[0];if(f&&!$('title').value)$('title').value=f.name.replace(/\.(xlsx|hwpx)$/i,'').slice(0,90)};
let uploadConfig={enabled:false,missing:[]},captchaReady=false;
async function initCaptcha(){
 const btn=$('submitUpload');btn.disabled=false;
 try{
  const d=await json('/api/share-config');uploadConfig=d;
  if(!d.enabled){$('uploadStatus').textContent=d.message+' · Vercel 환경변수를 등록한 후 재배포하세요.';return}
  $('uploadStatus').textContent='공유 저장소 설정 확인됨 · 인증 화면을 불러오는 중입니다.';
  const s=document.createElement('script');s.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';s.async=true;
  s.onload=()=>{try{widgetId=turnstile.render('#captchaBox',{sitekey:siteKey||d.siteKey,theme:'light',callback:()=>{$('uploadStatus').textContent='인증 완료 · 등록할 수 있습니다.'},'error-callback':()=>{$('uploadStatus').textContent='자동 등록 방지 인증 오류: 브라우저 확장 프로그램 또는 네트워크 차단 여부를 확인하세요.'}});captchaReady=true;$('uploadStatus').textContent='자동 등록 방지 인증을 완료한 후 등록하세요.'}catch(err){$('uploadStatus').textContent='인증 화면 표시 실패: '+err.message}};
  s.onerror=()=>{$('uploadStatus').textContent='Cloudflare 인증 스크립트를 불러올 수 없습니다. 광고 차단 또는 네트워크를 확인하세요.'};
  siteKey=d.siteKey||'';document.head.append(s);
 }catch(e){$('uploadStatus').textContent='서버 설정 확인 실패: '+e.message}
}
function fileBase64(f){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('파일을 읽을 수 없습니다.'));reader.readAsDataURL(f)})}
$('uploadForm').onsubmit=async e=>{e.preventDefault();const f=$('file').files[0];if(!f){$('uploadStatus').textContent='파일을 선택하세요.';return}if(!uploadConfig.enabled){$('uploadStatus').textContent='등록 불가: '+(uploadConfig.message||'공유 저장소 연결이 필요합니다.')+' · /api/share-config에서 누락된 설정을 확인하세요.';return}if(f.size>2*1024*1024){$('uploadStatus').textContent='최대 2MB 파일만 등록할 수 있습니다.';return}const title=$('title').value.trim(),desc=$('description').value.trim();if(!title||!desc||!$('agree').checked){$('uploadStatus').textContent='자료명, 자료 설명, 공개 동의 항목을 확인하세요.';return}const token=window.turnstile&&widgetId!==null?turnstile.getResponse(widgetId):'';if(!token){$('uploadStatus').textContent=captchaReady?'자동 등록 방지 인증을 완료하세요.':'자동 등록 방지 인증을 불러오지 못했습니다. 네트워크와 Turnstile 설정을 확인하세요.';return}const btn=$('submitUpload');btn.disabled=true;$('uploadStatus').textContent='파일을 검사하고 등록 중입니다...';try{const base64=await fileBase64(f);const d=await json('/api/share-upload',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({filename:f.name,base64,title:$('title').value,description:$('description').value,category:$('category').value,agree:$('agree').checked,captcha:token,website:$('website').value})});$('uploadStatus').textContent=d.message;$('uploadForm').reset();if(window.turnstile&&widgetId!==null)turnstile.reset(widgetId);await load();setTimeout(()=>modal('uploadModal',false),800)}catch(err){$('uploadStatus').textContent=err.message;if(window.turnstile&&widgetId!==null)turnstile.reset(widgetId)}finally{btn.disabled=false}};
initCaptcha();load();
