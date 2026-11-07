const DEMO=[
{id:'EX01',program:'엑셀',category:'함수·수식',title:'#DIV/0! 나누기 오류',keywords:'분모 0 오류 계산 나누기',answer:'원인 1: 분모가 0 또는 빈 셀입니다.\n① 오류 셀을 선택합니다.\n② 수식 입력줄에서 나누는 값의 셀 주소를 확인합니다.\n③ 해당 셀에 올바른 숫자가 있는지 확인합니다.\n\n원인 2: 0이 정상적으로 발생하는 데이터입니다.\n① IF 함수를 사용하여 분모가 0인지 검사합니다.\n② 예: =IF(B2=0,"",A2/B2)\n③ 단순 표시용이라면 IFERROR도 사용할 수 있지만 실제 데이터 오류를 숨기지 않도록 주의하세요.'},
{id:'EX02',program:'엑셀',category:'함수·수식',title:'VLOOKUP에서 #N/A 오류',keywords:'브이룩업 찾기 참조 일치',answer:'① 찾는 값과 첫 번째 검색 열의 데이터 형식을 비교합니다(숫자/문자).\n② 검색 범위의 첫 열에 찾는 값이 있는지 확인합니다.\n③ 정확히 일치하는 검색은 마지막 인수에 FALSE를 지정합니다.\n④ 복사 시 검색 범위가 움직이지 않도록 $ 기호로 절대참조를 지정합니다.\n⑤ 공백·숨은 문자가 있다면 TRIM/CLEAN 사용을 검토하세요.'},
{id:'EX03',program:'엑셀',category:'서식·인쇄',title:'인쇄 시 표가 여러 페이지로 나뉨',keywords:'출력 인쇄 페이지 맞춤',answer:'① [페이지 레이아웃] 탭을 선택합니다.\n② [크기 조정]에서 너비를 1페이지로 설정하고 높이는 필요에 따라 자동으로 둡니다.\n③ [파일] → [인쇄] 미리보기로 글씨가 너무 작아지지 않았는지 확인합니다.\n④ 필요하면 용지 방향을 가로로 변경하고 인쇄 영역을 지정합니다.'},
{id:'EX04',program:'엑셀',category:'표·데이터',title:'CSV 파일의 한글이 깨짐',keywords:'csv 인코딩 utf8 글자 깨짐',answer:'① CSV를 더블클릭해서 열지 말고 Excel의 [데이터] 탭으로 이동합니다.\n② [텍스트/CSV에서]를 선택하고 파일을 지정합니다.\n③ 파일 원본 인코딩을 UTF-8 또는 한국어(Windows-949)로 바꿔 미리보기를 확인합니다.\n④ 구분 기호가 쉼표인지 확인한 뒤 [로드]를 선택합니다.'},
{id:'EX05',program:'엑셀',category:'차트·그래프',title:'그래프 데이터 범위가 잘못됨',keywords:'차트 그래프 범위 축',answer:'① 차트를 클릭합니다.\n② [차트 디자인] → [데이터 선택]을 엽니다.\n③ 차트 데이터 범위와 계열 이름을 확인합니다.\n④ 가로축 레이블을 올바른 셀 범위로 지정합니다.\n⑤ 숫자가 문자로 저장된 셀이 없는지 확인합니다.'},
{id:'EX06',program:'엑셀',category:'매크로·자동화',title:'매크로가 실행되지 않음',keywords:'vba 매크로 보안 실행',answer:'① 파일 확장자가 .xlsm인지 확인합니다.\n② 신뢰할 수 있는 파일인지 먼저 확인합니다.\n③ Excel 상단의 보안 경고 및 조직 보안 정책을 확인합니다.\n④ 기관에서 차단한 매크로는 임의로 보안을 해제하지 말고 관리자에게 문의합니다.\n⑤ VBA 편집기의 오류 메시지와 강조된 줄을 확인합니다.'},
{id:'HW01',program:'한글',category:'표·셀',title:'표가 다음 페이지에서 잘림',keywords:'표 깨짐 쪽 나눔 셀 페이지',answer:'원인 1: 표의 행 나눔 설정 문제\n① 문제가 발생한 표 안을 클릭합니다.\n② [표/셀 속성]을 엽니다(버전에 따라 메뉴 위치가 다릅니다).\n③ 표의 페이지 나눔·행 나눔 관련 옵션을 확인합니다.\n\n원인 2: 셀 높이 또는 문단 설정 문제\n① 해당 행의 높이·셀 안 여백을 확인합니다.\n② 문단의 줄 간격과 문단 보호 설정을 확인합니다.\n③ 변경 전 파일 사본을 저장하고 인쇄 미리보기로 확인합니다.'},
{id:'HW02',program:'한글',category:'쪽·편집',title:'쪽 번호가 중간부터 다시 시작됨',keywords:'페이지 번호 쪽 번호 구역',answer:'① 쪽 번호가 바뀌는 페이지 주변에 구역 나누기가 있는지 확인합니다.\n② [쪽] 메뉴에서 쪽 번호 관련 설정을 확인합니다.\n③ 새 구역에서 번호가 다시 시작되도록 설정되어 있는지 살펴봅니다.\n④ 문서 전체의 구역별 쪽 번호를 확인합니다.'},
{id:'HW03',program:'한글',category:'문단·글자',title:'문단 간격과 줄 간격이 일정하지 않음',keywords:'줄간격 문단 서식 글자',answer:'① 문제가 있는 문단을 선택합니다.\n② [문단 모양]에서 줄 간격·문단 위아래 간격을 확인합니다.\n③ 정상 문단과 설정값을 비교합니다.\n④ 필요한 문단만 선택해 동일한 설정을 적용합니다.'},
{id:'HW04',program:'한글',category:'파일·출력',title:'PDF 변환 후 표와 글자 위치가 달라짐',keywords:'pdf 변환 깨짐 출력 폰트',answer:'① 변환 전 원본 문서에서 인쇄 미리보기를 확인합니다.\n② 사용한 글꼴이 PC에 설치되어 있는지 확인합니다.\n③ 그림·표의 개체 배치 옵션을 점검합니다.\n④ 한글 프로그램의 PDF 저장 기능으로 다시 변환해 비교합니다.\n⑤ 변환 후 페이지 수·표 경계·문단 위치를 확인합니다.'},
{id:'HW05',program:'한글',category:'그림·개체',title:'그림을 넣으면 글자가 밀림',keywords:'그림 개체 글자처럼 취급 배치',answer:'① 그림을 선택하고 [개체 속성]을 엽니다.\n② 글자처럼 취급 및 본문과의 배치 방식을 확인합니다.\n③ 문서 목적에 맞게 배치 옵션을 변경합니다.\n④ 주변 문단과 쪽 나눔이 변하지 않았는지 확인합니다.'}
];
// 검증 가능한 오프라인 기본 안내. AI 미연결 상태에서도 일반적인 질문에 답할 수 있는 범위를 확장합니다.
DEMO.push(
{id:'EX07',program:'엑셀',category:'서식·인쇄',title:'조건부 서식 적용하기',keywords:'조건부서식 조건부 서식 색상 강조 규칙 사용법 예시 셀 색',answer:'예시: 집행률이 80% 미만인 셀을 빨간색으로 표시하기\n① 집행률이 입력된 범위(예: C2:C100)를 선택합니다.\n② [홈] 탭 → [조건부 서식] → [셀 강조 규칙] → [보다 작음]을 선택합니다.\n③ 기준값에 80% 또는 0.8을 입력합니다(원본 데이터 형식에 맞춰 확인).\n④ 강조 표시 형식을 선택한 뒤 [확인]을 누릅니다.\n⑤ 다른 조건이 필요하면 [홈] → [조건부 서식] → [새 규칙]을 선택합니다.\n⑥ 수식으로 조건을 설정할 때는 첫 데이터 행을 기준으로 =C2<0.8 같은 수식을 사용합니다.\n주의: 숫자가 텍스트로 저장되면 조건이 예상대로 동작하지 않을 수 있습니다.'},
{id:'EX08',program:'엑셀',category:'함수·수식',title:'SUMIF와 SUMIFS로 조건별 합계',keywords:'sumif sumifs 조건 합계 여러 조건',answer:'① 조건이 하나라면 =SUMIF(A2:A100,"기획",B2:B100) 을 사용합니다.\n② 조건이 둘 이상이라면 =SUMIFS(C2:C100,A2:A100,"기획",B2:B100,"완료")를 사용합니다.\n③ SUMIFS는 첫 번째 인수가 합계 범위입니다.\n④ 조건 범위의 행 수가 서로 같은지 확인합니다.'},
{id:'EX09',program:'엑셀',category:'함수·수식',title:'XLOOKUP으로 값 찾기',keywords:'xlookup 찾기 조회 매칭',answer:'① 조회할 값이 A2, 코드 열이 F2:F100, 결과 열이 G2:G100이라면 =XLOOKUP(A2,F2:F100,G2:G100,"없음")을 입력합니다.\n② 조회값과 코드 열의 숫자·문자 형식이 같은지 확인합니다.\n③ 구버전 Excel에서는 XLOOKUP을 지원하지 않을 수 있습니다.'},
{id:'HW06',program:'한글',category:'표·셀',title:'한글에서 표 만들기',keywords:'표 작성 만들기 삽입 셀 행 열',answer:'① 표를 넣을 위치에 커서를 둡니다.\n② [입력] → [표] 메뉴를 찾아 선택합니다(버전에 따라 메뉴 위치가 다릅니다).\n③ 행과 열 개수를 정하고 표를 삽입합니다.\n④ 표 안에서 마우스 오른쪽 버튼이나 [표/셀 속성]을 이용해 크기·테두리·안 여백을 조정합니다.\n⑤ 페이지 경계에서 표가 잘리면 표 나눔 관련 속성을 확인합니다.'}
);
DEMO.push(
{id:'HW07',program:'한글',category:'쪽·편집',title:'한글에서 쪽 번호 넣기',keywords:'쪽 번호 페이지 번호 삽입 넣기 만들기 매기기 쪽번호 페이지번호',answer:'방법 1: 문서 전체에 쪽 번호 넣기\n① 한글 문서를 열고 상단 [쪽] 메뉴를 선택합니다.\n② [쪽 번호 매기기]를 선택합니다. (버전에 따라 [쪽 번호] 관련 메뉴에서 찾을 수 있습니다.)\n③ 번호 위치(아래 가운데·오른쪽 등)와 번호 모양을 선택합니다.\n④ [넣기]를 눌러 각 페이지의 번호를 확인합니다.\n\n방법 2: 첫 페이지에 번호를 표시하지 않기\n① 첫 페이지에 커서를 둡니다.\n② [쪽] → [감추기]에서 쪽 번호 감추기를 선택합니다.\n③ 다음 페이지부터 번호가 표시되는지 확인합니다.\n주의: 표지 숨김과 번호를 1부터 다시 시작하는 설정은 서로 다릅니다.'},
{id:'HW08',program:'한글',category:'쪽·편집',title:'한글에서 쪽 번호 시작 번호 변경',keywords:'페이지 번호 시작번호 1부터 중간부터 쪽 번호 새번호',answer:'① 번호를 새로 시작할 페이지에 커서를 둡니다.\n② [쪽] 메뉴에서 [새 번호로 시작] 기능을 찾습니다.\n③ 번호 종류를 쪽 번호로 지정하고 시작 번호를 입력합니다.\n④ 앞쪽과 뒤쪽 페이지 번호가 의도대로 이어지는지 확인합니다.\n주의: 구역 설정에 따라 번호가 달라질 수 있으므로 사본에서 먼저 확인하세요.'}
);

DEMO.push(
{id:'HW09',program:'한글',category:'표·셀',title:'한글 표 셀 배경색 변경',keywords:'표 셀 배경색 하늘색 노란색 색상 채우기 테두리 배경',answer:'① 색을 바꿀 표의 셀을 마우스로 선택합니다.\n② 선택한 셀에서 마우스 오른쪽 버튼을 눌러 [셀 테두리/배경] 관련 항목을 찾습니다. 버전에 따라 [표/셀 속성]의 배경 설정에서도 변경할 수 있습니다.\n③ [배경] 또는 [채우기]에서 색을 선택합니다.\n④ 노란색을 선택하고 [설정] 또는 [확인]을 누릅니다.\n⑤ 색이 바뀌지 않으면 선택 범위와 셀 배경·문단 배경 설정을 다시 확인합니다.'},
{id:'HW10',program:'한글',category:'표·셀',title:'한글 표 셀 색이 변경되지 않음',keywords:'표 셀 배경색 변경 안됨 색상 적용 안됨',answer:'① 표 안의 글자만 선택한 상태인지 확인하고 셀 자체를 선택합니다.\n② [셀 테두리/배경]에서 적용 대상이 셀인지 확인합니다.\n③ 셀 배경이 아닌 글자 배경 또는 문단 배경이 지정되어 있는지 확인합니다.\n④ 여러 셀이라면 범위를 다시 지정해 적용합니다.'},
{id:'EX10',program:'엑셀',category:'서식·인쇄',title:'엑셀 셀 배경색 변경',keywords:'셀 표 배경색 하늘색 노란색 채우기 색',answer:'① 색을 변경할 셀 또는 범위를 선택합니다.\n② 상단 [홈] 탭을 클릭합니다.\n③ [글꼴] 그룹의 페인트통 모양 [채우기 색] 옆 화살표를 클릭합니다.\n④ 노란색을 선택합니다.\n⑤ 색이 유지되지 않으면 [홈] → [조건부 서식] → [규칙 관리]에서 다른 규칙이 색을 덮어쓰는지 확인합니다.'}
);
let feedbackProof=null;let program='미확인',tab='answer',knowledge=[...DEMO],last=null,canvasImage=null,maskRects=[],start=null;
const $=id=>document.getElementById(id);const escapeHtml=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function maskText(s){return s.replace(/\b\d{6}[- ]?[1-8]\d{6}\b/g,'[주민번호 제외]').replace(/\b01[016789][ -]?\d{3,4}[ -]?\d{4}\b/g,'[전화번호 제외]').replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,'[이메일 제외]').replace(/\b\d{2,3}-\d{2,6}-\d{2,6}\b/g,'[번호 제외]')}
function showTab(name){tab=name;document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active',b.dataset.tab===name));['answer','library'].forEach(t=>$(t+'View').classList.toggle('hide',t!==name));if(name==='library')renderLibrary()}
function renderCategories(){const cats=[...new Set(knowledge.filter(x=>program==='미확인'||x.program===program).map(x=>x.category))];$('categories').innerHTML=cats.map(x=>`<button class="cat" data-category="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join('');document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{showTab('library');$('search').value=b.dataset.category;renderLibrary()});$('examples').innerHTML=['VLOOKUP 오류','CSV 한글 깨짐','한글 표 배경색 변경','쪽 번호 오류'].map(t=>`<button class="pill" data-example="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('');document.querySelectorAll('[data-example]').forEach(b=>b.onclick=()=>{$('question').value=b.dataset.example;showTab('answer')})}
function renderLibrary(){const q=($('search').value||'').toLowerCase();const items=knowledge.filter(x=>x.program===program&&[x.title,x.category,x.keywords,x.symptom,x.solution].join(' ').toLowerCase().includes(q));$('libraryItems').innerHTML=items.length?items.map(x=>`<div class="card"><div class="row"><span class="tag">${escapeHtml(x.category)}</span><strong>${escapeHtml(x.title)}</strong></div><p class="sub">${escapeHtml((x.answer||x.solution||'').slice(0,110))}...</p><button class="secondary mini" data-item="${escapeHtml(x.id)}">해결 방법 보기</button></div>`).join(''):'<p class="sub">검색 결과가 없습니다. 질문을 입력해 AI 분석을 시도하세요.</p>';document.querySelectorAll('[data-item]').forEach(b=>b.onclick=()=>showAnswer(knowledge.find(x=>x.id===b.dataset.item),'지식백과'))}
function formatAnswer(txt){return escapeHtml(txt).split('\n').filter(Boolean).map(line=>{const m=line.match(/^([①②③④⑤⑥⑦⑧⑨⑩]|\d+[.)])\s*(.*)/);return m?`<div class="answerStep"><span class="stepNum">${escapeHtml(m[1])}</span>${escapeHtml(m[2])}</div>`:`<p style="margin:9px 0">${line}</p>`}).join('')}
let currentItem=null,attempt=0,originalQuestion='',alternatives=[];
function visualGuide(item){
 const guideProgram=item.program||program;
 const t=(item.title+' '+(item.category||'')).toLowerCase();let tabs,focus,desc;
 if(guideProgram==='엑셀'){
  if(/배경색|채우기|색상|셀 색/.test(t)){tabs=['파일','홈','삽입','페이지 레이아웃','수식','데이터'];focus='채우기 색';desc='홈 → 글꼴 → 채우기 색 → 노란색';}
  else if(/조건부/.test(t)){tabs=['파일','홈','삽입','페이지 레이아웃','수식','데이터'];focus='조건부 서식';desc='홈 탭 → 조건부 서식 → 셀 강조 규칙';}
  else if(/인쇄|페이지/.test(t)){tabs=['파일','홈','삽입','페이지 레이아웃','수식'];focus='크기 조정';desc='페이지 레이아웃 → 크기 조정';}
  else if(/csv|데이터|vlookup|lookup/.test(t)){tabs=['파일','홈','삽입','수식','데이터'];focus=/csv/.test(t)?'텍스트/CSV에서':'함수 삽입';desc=/csv/.test(t)?'데이터 → 텍스트/CSV에서':'수식 입력줄과 참조 범위를 확인';}
  else {tabs=['파일','홈','삽입','수식','데이터'];focus='수식 입력줄';desc='문제가 있는 셀을 선택하고 수식을 확인';}
 }else{
  tabs=['파일','편집','보기','입력','서식','쪽','도구'];focus=/배경색|채우기|색상/.test(t)?'셀 테두리/배경':/표|셀/.test(t)?'표/셀 속성':/쪽|페이지/.test(t)?'쪽 설정':/그림|개체/.test(t)?'개체 속성':'문단 모양';desc=/배경색|채우기|색상/.test(t)?'셀 선택 → 셀 테두리/배경 → 배경 → 색 선택':'문제 요소 선택 → 관련 속성 확인 (버전별 메뉴 차이 있음)';
 }
 return `<div class="visualGuide"><div class="visualHead"><span class="visualApp">${guideProgram==='엑셀'?'▦ Excel':'▤ 한글'}</span><span>메뉴 위치 개념도 · 실제 프로그램 버전별 위치는 다를 수 있습니다</span></div><div class="visualTabs">${tabs.map(x=>`<span class="${x===(guideProgram==='엑셀'?(/인쇄|페이지/.test(t)?'페이지 레이아웃':/csv/.test(t)?'데이터':'홈'):/쪽|페이지/.test(t)?'쪽':/배경색|채우기|색상/.test(t)?'표':'서식')?'selected':''}">${escapeHtml(x)}</span>`).join('')}</div><div class="visualRibbon"><span class="visualArrow">①</span><strong>${escapeHtml(focus)}</strong><span class="visualArrow">②</span><span>${escapeHtml(desc)}</span></div><div class="visualSheet">${guideProgram==='엑셀'?'<div class="sheetCols">A　　B　　C　　D　　E</div><div class="sheetRow">1　항목　　 값　　 결과</div><div class="sheetRow focusRow">2　예시　　 80%　　 확인 ✓</div><div class="sheetRow">3　예시　　 60%　　 확인</div>':(/배경색|채우기|색상/.test(t)?'<div class="docPage"><div class="docTitle">한글 표 셀 배경색 변경 개념도</div><div class="docTable"><span style="background:#b9e3f5">변경 전</span><span style="background:#ffe46b">변경 후</span><span>노란색 선택</span></div></div>':'<div class="docPage"><div class="docTitle">문서 편집 화면 예시</div><div class="docLine"></div><div class="docLine short"></div><div class="docTable"><span>항목</span><span>내용</span><span>예시</span></div></div>')}</div><div class="visualCaption">위 그림은 설명용 모식도이며 실제 오류 화면을 분석하거나 메뉴를 캡처한 이미지는 아닙니다.</div></div>`;
}
function alternativeAnswer(item,n){const title=item.title||'';if(/배경색|채우기|색상/.test(title)&&/표|셀/.test(title)){if(item.program==='한글')return n===1?'다른 원인: 셀 배경이 아니라 문단 또는 글자 배경일 수 있습니다.\n① 표 셀 안에서 커서를 놓고 셀 전체를 선택했는지 확인합니다.\n② [셀 테두리/배경]에서 적용 대상이 선택한 셀인지 확인합니다.\n③ 셀 배경을 노란색으로 지정한 뒤 확인합니다.\n④ 여전히 하늘색이면 문단 모양이나 글자 배경 설정을 확인합니다.':'다른 방법: 기존 셀 배경 설정 충돌 확인\n① 문서 사본에서 해당 셀 하나만 선택해 테스트합니다.\n② [표/셀 속성]의 배경 관련 설정을 확인합니다.\n③ 표 전체가 아닌 선택 셀에 적용했는지 확인합니다.\n④ 계속 실패하면 한글 버전과 화면을 알려주세요.';return n===1?'다른 원인: 조건부 서식이 셀 채우기 색을 덮어쓸 수 있습니다.\n① 해당 셀을 선택합니다.\n② [홈] → [조건부 서식] → [규칙 관리]를 엽니다.\n③ 적용 범위와 채우기 규칙을 확인합니다.\n④ 필요하면 해당 규칙을 수정한 뒤 색을 적용합니다.':'다른 방법: 셀 스타일 또는 보호 확인\n① 새 빈 셀에 노란색 채우기가 되는지 시험합니다.\n② 특정 셀만 안 된다면 셀 스타일과 시트 보호를 확인합니다.\n③ 기관 파일이라면 원본을 복사해 테스트하세요.';}if(/조건부\s*서식/.test(title)||/조건부\s*서식/.test(originalQuestion))return n===1?'대안 1: 새 규칙으로 직접 지정하기\n① 서식을 적용할 셀 범위를 선택합니다.\n② [홈] → [조건부 서식] → [새 규칙]을 엽니다.\n③ [수식을 사용하여 서식을 지정할 셀 결정]을 선택합니다.\n④ 첫 데이터 행 기준으로 =AND(ISNUMBER(C2),C2<0.8)처럼 입력합니다.\n⑤ [서식]에서 채우기 색을 선택하고 적용합니다.\n주의: 범위 첫 행과 수식의 행 번호가 일치해야 합니다.': '대안 2: 데이터 형식 및 기존 규칙 충돌 확인\n① 셀 값이 숫자인지 =ISNUMBER(C2)로 확인합니다.\n② 숫자가 문자라면 원본 데이터를 확인한 뒤 숫자로 변환합니다.\n③ [홈] → [조건부 서식] → [규칙 관리]를 엽니다.\n④ 적용 대상 범위와 규칙 순서, [참이면 중지] 여부를 확인합니다.\n⑤ 충돌하는 규칙을 수정하고 다시 확인합니다.';
 if(/vlookup|#n\/a/i.test(title))return '다른 원인: 조회값 형식·공백 문제\n① =ISNUMBER(A2)로 조회값의 숫자 여부를 확인합니다.\n② 원본 범위 첫 열의 형식과 일치시킵니다.\n③ 앞뒤 공백은 TRIM 함수로 검사합니다.\n④ 검색 범위를 $F$2:$G$100처럼 고정하고 FALSE(정확히 일치)를 사용합니다.';
 if(/쪽 번호|페이지 번호/.test(title)||/쪽 번호|페이지 번호/.test(originalQuestion))return n===1?'다른 방법: 쪽 번호를 넣었지만 보이지 않을 때\n① [쪽] 메뉴의 [감추기] 설정을 확인합니다.\n② 현재 페이지에서 쪽 번호 감추기가 설정되었으면 해제합니다.\n③ [쪽 번호 매기기]에서 번호 위치와 모양을 다시 선택합니다.\n④ 인쇄 미리보기에서도 번호가 보이는지 확인합니다.':'다른 방법: 중간 페이지부터 번호가 달라질 때\n① 번호가 달라지는 페이지에 커서를 둡니다.\n② [쪽] → [새 번호로 시작] 설정을 확인합니다.\n③ 시작 번호를 원하는 값으로 지정합니다.\n④ 구역 나눔이 있다면 앞뒤 구역의 번호 설정을 함께 확인합니다.';
 if(/표|쪽|페이지|인쇄/.test(title))return '다른 원인: 문서·출력 환경 확인\n① 원본 사본을 저장합니다.\n② 해당 표 또는 개체의 크기와 여백을 확인합니다.\n③ 편집 용지·쪽 나눔·인쇄 미리보기를 비교합니다.\n④ 글꼴과 프로그램 버전이 다른 환경에서도 같은 문제가 발생하는지 확인합니다.';
 return `추가 점검 방법 ${n}\n① 기존 방법에서 어느 단계가 실패했는지 확인합니다.\n② 입력 데이터의 형식, 참조 범위 및 프로그램 버전을 점검합니다.\n③ 관련 메뉴의 설정을 기본값과 비교합니다.\n④ 문제가 계속되면 오류 메시지나 화면 캡처를 첨부하여 원인을 좁혀 주세요.`;
}
function showAnswer(item,source,opts={}){currentItem=item;if(!opts.retry){attempt=0;originalQuestion=item.title;alternatives=[]}last={question:originalQuestion||item.title,answer:item.answer||item.solution||'등록된 해결책이 없습니다.',program:item.program||program};$('source').textContent=source;$('result').innerHTML=`<h3>${escapeHtml(item.title)}</h3>${visualGuide(item)}<div class="answer">${formatAnswer(last.answer)}</div>${opts.retry?`<div class="notice">이전 해결 방법으로 해결되지 않아 다른 원인과 점검 방법을 표시했습니다. (${attempt}차 추가 안내)</div>`:''}`;$('feedback').style.display='flex';showTab('answer');$('result').scrollTop=0}
function loadImage(file){if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>5*1024*1024){alert('5MB 이하 PNG/JPG/WEBP 이미지만 가능합니다.');return}const img=new Image();img.onload=()=>{canvasImage=img;maskRects=[];draw();URL.revokeObjectURL(img.src)};img.src=URL.createObjectURL(file)}
$('redactCanvas').addEventListener('pointerdown',e=>{const r=e.target.getBoundingClientRect();start={x:(e.clientX-r.left)*e.target.width/r.width,y:(e.clientY-r.top)*e.target.height/r.height};e.target.setPointerCapture(e.pointerId)});
$('redactCanvas').addEventListener('pointerup',e=>{if(!start)return;const c=e.target,r=c.getBoundingClientRect(),x=(e.clientX-r.left)*c.width/r.width,y=(e.clientY-r.top)*c.height/r.height;maskRects.push({x:Math.min(start.x,x),y:Math.min(start.y,y),w:Math.abs(x-start.x),h:Math.abs(y-start.y)});start=null;draw()});
let attachedFiles=[];const imageUrls=new Map();
function refreshAttachments(){
 const gallery=$('attachmentGallery');gallery.innerHTML='';
 attachedFiles.forEach((f,i)=>{const tile=document.createElement('div');tile.className='attachmentTile';
 if(f.type.startsWith('image/')){let url=imageUrls.get(f);if(!url){url=URL.createObjectURL(f);imageUrls.set(f,url)}const img=document.createElement('img');img.src=url;img.alt=f.name||'붙여넣은 이미지';img.onerror=()=>{tile.textContent='이미지 표시 실패'};tile.appendChild(img)}
 else{const label=document.createElement('span');label.className='fileLabel';label.textContent='📄 '+f.name;tile.appendChild(label)}
 const remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.title='첨부 제거';remove.setAttribute('aria-label','첨부 제거');remove.onclick=()=>{attachedFiles.splice(i,1);if(imageUrls.has(f)){URL.revokeObjectURL(imageUrls.get(f));imageUrls.delete(f)}const first=attachedFiles.find(x=>x.type.startsWith('image/'));canvasImage=null;maskRects=[];if(first)loadImage(first);refreshAttachments()};tile.appendChild(remove);gallery.appendChild(tile)
 });
 $('fileList').textContent='';
}
function attachFiles(files){for(const f of files){if(attachedFiles.some(x=>x.name===f.name&&x.size===f.size&&x.lastModified===f.lastModified))continue;attachedFiles.push(f);if(f.type.startsWith('image/')&&!canvasImage)loadImage(f)}refreshAttachments()}
$('imageFile').onchange=e=>{attachFiles([...e.target.files]);e.target.value=''};
const drop=document.querySelector('.drop');['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('dragging')}));['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('dragging')}));drop.addEventListener('drop',e=>attachFiles([...e.dataTransfer.files]));
$('undoMask').onclick=()=>{maskRects.pop();draw()};$('removeImage').onclick=()=>{canvasImage=null;maskRects=[];$('imageFile').value='';$('imageControls').classList.add('hide')};
document.addEventListener('paste',e=>{const images=[...(e.clipboardData?.items||[])].filter(x=>x.type.startsWith('image/')).map(x=>x.getAsFile()).filter(Boolean);if(images.length){e.preventDefault();attachFiles(images)}});
function score(x,q){const norm=t=>String(t||'').toLowerCase().replace(/\s+/g,'');const words=q.toLowerCase().split(/[\s,./!?]+/).filter(w=>w.length>=2);const corpus=norm([x.title,x.keywords,x.category,x.symptom].join(' '));let pts=words.reduce((a,w)=>a+(corpus.includes(norm(w))?2:0),0);if(norm(q).includes(norm(x.title)))pts+=9;if(x.id==='EX07'&&/조건부\s*서식/.test(q))pts+=15;return pts}
function localAnswer(question,matches){
 const q=String(question||'').replace(/\s+/g,'');
 let direct=null;
 if(/(배경|채우기|색상|색깔|색을)/.test(q)&&/(표|셀|하늘색|노란색)/.test(q)){
   direct=knowledge.find(x=>x.id===(program==='한글'?'HW09':'EX10'));
 }

 if(!direct&&program==='한글'&&/(쪽번호|페이지번호)/.test(q))direct=knowledge.find(x=>x.id===(/(시작|변경|다시|중간|1부터)/.test(q)?'HW08':'HW07'));
 if(direct){showAnswer({...direct,title:question||direct.title},'기본 해결 백과');return}
 const best=matches[0];if(best&&best._score>=6){showAnswer({...best,title:question||best.title},'기본 해결 백과');if(best.title!==question)$('result').insertAdjacentHTML('beforeend',`<p class="sub">관련 기본 도움말: ${escapeHtml(best.title)}</p>`);return}last=null;$('source').textContent='추가 정보 필요';$('result').innerHTML=`<h3>${escapeHtml(question||'첨부 자료 질문')}</h3><div class="notice">현재 등록된 지식백과에 해당 해결 방법이 없습니다. 질문을 다시 입력할 필요는 없습니다. AI 서버를 연결하면 등록되지 않은 질문도 분석할 수 있습니다.</div><p class="sub">현재는 오프라인 기본 지식백과로 답변합니다. 프로그램 버전은 일반적인 질문에 필수 입력 사항이 아닙니다.</p>`}
function detectProgram(question,files,selected){
 const q=String(question||'');
 const hangul=/(한글|한컴|HWPX?|\.hwp|\.hwpx|쪽\s*번호|문단\s*모양|글자\s*모양|표\s*\/\s*셀\s*속성|셀\s*테두리\s*\/\s*배경)/i.test(q);
 const excel=/(엑셀|excel|\.xlsx?|\.xlsm|\.csv|vlookup|xlookup|sumifs?|피벗\s*테이블|조건부\s*서식|셀\s*참조|매크로|#DIV\/0|#N\/A)/i.test(q);
 if(hangul!==excel)return {name:hangul?'한글':'엑셀',reason:'질문 내용',certain:true};
 const kinds=new Set(files.map(f=>/\.(hwp|hwpx)$/i.test(f.name)?'한글':/\.(xls|xlsx|xlsm|csv)$/i.test(f.name)?'엑셀':null).filter(Boolean));
 if(kinds.size===1)return {name:[...kinds][0],reason:'첨부 문서 형식',certain:true};
 // 이미지 파일명은 프로그램 정보가 아닙니다. 이미지 내용을 읽지 않고 단정하지 않습니다.
 // 표의 배경색 질문은 한글 문서에서 자주 발생하므로 한글을 우선 제안하되 추정으로 표시합니다.
 if(!hangul&&!excel&&/(표|셀)/.test(q)&&/(배경|채우기|색상|색깔|하늘색|노란색)/.test(q)&&files.some(f=>f.type.startsWith('image/'))){
   return {name:'한글',reason:'표 배경색 질문에 따른 임시 추정(이미지 내용은 미판독)',certain:false};
 }
 return {name:'미확인',reason:'AI 이미지·질문 분석 필요',certain:false};
}

function applyTheme(){document.body.classList.toggle('theme-hangul',program==='한글');document.body.classList.toggle('theme-excel',program==='엑셀')}
function selectProgram(next){program=next;applyTheme();renderCategories();renderLibrary()}
function showAiError(payload){
 const code=payload?.code||'NETWORK';const msg=payload?.error||'AI 서버에 연결할 수 없습니다.';
 const heading=['DAILY_QUOTA','RATE_LIMIT','QUOTA_UNKNOWN'].includes(code)?'Gemini 무료 사용량 제한':code==='NO_KEY'?'Gemini API 연결 설정 필요':'Gemini AI 응답 실패';
 $('source').textContent='AI 연결 상태';
 $('result').innerHTML=`<h3>${escapeHtml(heading)}</h3><div class="notice">${escapeHtml(msg)}</div><p class="sub">Google AI Studio에서 무료 사용량과 모델 접근 가능 여부를 확인하세요. 자동으로 유료 API를 호출하지 않습니다.</p><button class="secondary mini" id="offlineAnswer">기본 지식백과에서 찾아보기</button>`;
 $('feedback').style.display='none';$('offlineAnswer').onclick=()=>{const q=$('question').value.trim();const matches=knowledge.filter(x=>program==='미확인'||x.program===program).map(x=>({...x,_score:score(x,q)})).sort((a,b)=>b._score-a._score).slice(0,3);localAnswer(q,matches)};
}
async function prepareAttachments(){
 const output=[];
 for(const f of attachedFiles){
  const ext=(f.name.split('.').pop()||'').toLowerCase();
  if(f.type.startsWith('image/')){
   if(f.size>5*1024*1024)throw Error('이미지는 파일당 5MB 이하여야 합니다.');
   const url=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(f)});
   output.push({name:f.name,mimeType:f.type,dataUrl:url});
  }else if(['xlsx','xlsm','csv','hwpx','pdf'].includes(ext)){
   if(f.size>7*1024*1024)throw Error(f.name+' 파일이 7MB를 초과합니다.');
   const url=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(f)});
   output.push({name:f.name,mimeType:f.type||'application/octet-stream',dataUrl:url});
  }
 }
 return output;
}
// Gemini가 제공한 수치형 데이터로 브라우저에서 SVG 차트·CSV를 직접 생성합니다.
function renderVisualization(answer){
 const match=answer.match(/```vizjson\s*([\s\S]*?)```/i);if(!match)return;
 let d;try{d=JSON.parse(match[1]);}catch{return}
 if(!Array.isArray(d.columns)||!Array.isArray(d.rows)||!d.rows.length)return;
 const cols=d.columns.map(String).slice(0,15),rows=d.rows.filter(r=>Array.isArray(r)).slice(0,250).map(r=>r.slice(0,cols.length));
 const clean=answer.replace(/```vizjson\s*[\s\S]*?```/i,'').replace(/^작업 유형:.*$/gm,'').replace(/^대상 프로그램:.*$/gm,'').trim();
 const answerEl=$('result').querySelector('.answer');if(answerEl){answerEl.innerHTML=formatAnswer(clean);answerEl.classList.add('vizInterpretation');}
 const wrapper=document.createElement('div');wrapper.className='vizOutput';
 const title=document.createElement('h3');title.textContent=d.title||'분석 결과';wrapper.appendChild(title);
 const actions=document.createElement('div');actions.className='row';wrapper.appendChild(actions);
 const download=(filename,body,mime)=>{const blob=new Blob([body],{type:mime});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)};
 const csvCell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
 const csv='\uFEFF'+[cols,...rows].map(r=>r.map(csvCell).join(',')).join('\r\n');
 const csvBtn=document.createElement('button');csvBtn.className='secondary';csvBtn.textContent='표 CSV 다운로드';csvBtn.onclick=()=>download('분석표.csv',csv,'text/csv;charset=utf-8');actions.appendChild(csvBtn);
 const table=document.createElement('div');table.className='vizTable';const t=document.createElement('table');const head=t.createTHead().insertRow();cols.forEach(c=>{const th=document.createElement('th');th.textContent=c;head.appendChild(th)});const body=t.createTBody();rows.forEach(r=>{const tr=body.insertRow();cols.forEach((_,i)=>{const td=tr.insertCell();td.textContent=String(r[i]??'')})});table.appendChild(t);
 const chartType=['bar','line','pie'].includes(d.chartType)?d.chartType:'table';
 if(chartType!=='table'){
 const x=Number.isInteger(d.xColumn)?d.xColumn:0;
 const requested=$('question').value||'';
 const normalized=txt=>String(txt||'').replace(/\s+/g,'').toLowerCase();
 const wantsBoth=/(남\s*[·,\/과와및&+\-]?\s*여|여\s*[·,\/과와및&+\-]?\s*남|남녀|여남|성별)/.test(normalized(requested));
 const numericCols=cols.map((c,i)=>i).filter(i=>i!==x&&rows.some(r=>Number.isFinite(Number(String(r[i]??'').replace(/,/g,'')))&&String(r[i]??'').trim()!==''));
 let yCols=Array.isArray(d.yColumns)?d.yColumns.filter(i=>numericCols.includes(i)):[];
 if(!yCols.length)yCols=[numericCols.includes(d.yColumn)?d.yColumn:numericCols[0]].filter(i=>i!==undefined);
 const genderCols=numericCols.filter(i=>/^(남|남자|남성|여|여자|여성)$/.test(normalized(cols[i])));
 if(wantsBoth&&genderCols.length===2)yCols=genderCols;
 else if(wantsBoth&&genderCols.length!==2){const warning=document.createElement('p');warning.className='notice';warning.textContent='남·여 두 계열을 모두 확인할 수 없습니다. 누락된 열을 확인한 뒤 다시 요청해 주세요.';wrapper.appendChild(warning)}
 const series=yCols.map((col,j)=>({name:cols[col],color:['#4169bd','#df7382','#2d9c86','#8b65c5','#e3a34e'][j%5],values:rows.slice(0,24).map(r=>{const raw=String(r[col]??'').replace(/,/g,'').trim();return raw!==''&&Number.isFinite(Number(raw))?Number(raw):null})}));
 const labels=rows.slice(0,24).map(r=>String(r[x]??''));
 const all=series.flatMap(s=>s.values.filter(v=>v!==null));
 if(all.length){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('viewBox','0 0 900 480');svg.setAttribute('role','img');svg.setAttribute('aria-label',d.title||'데이터 차트');svg.classList.add('vizChart');
 const add=(tag,attrs,text)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=String(text);svg.appendChild(n);return n};
 add('rect',{width:900,height:480,fill:'#fff'});add('text',{x:450,y:34,'text-anchor':'middle','font-size':22,'font-weight':700,fill:'#1c3353'},d.title||'데이터 시각화');
 if(chartType==='pie'){
 const positive=labels.map((label,i)=>({label,value:series[0]?.values[i]||0})).filter(o=>o.value>0),sum=positive.reduce((a,b)=>a+b.value,0);let ang=-Math.PI/2;positive.forEach((o,i)=>{const delta=o.value/sum*2*Math.PI;const x1=330+155*Math.cos(ang),y1=250+155*Math.sin(ang);const x2=330+155*Math.cos(ang+delta),y2=250+155*Math.sin(ang+delta);add('path',{d:`M 330 250 L ${x1} ${y1} A 155 155 0 ${delta>Math.PI?1:0} 1 ${x2} ${y2} Z`,fill:['#4169bd','#df7382','#2d9c86','#8b65c5','#e3a34e'][i%5],stroke:'#fff','stroke-width':2});ang+=delta;add('text',{x:580,y:96+i*26,'font-size':13,fill:'#25344c'},`${o.label} ${(o.value/sum*100).toFixed(1)}%`)});
 }else{
 const min=Math.min(0,...all),max=Math.max(0,...all),span=max-min||1,left=82,right=855,top=90,bottom=380;
 for(let i=0;i<=4;i++){const val=min+span*i/4,yy=bottom-(val-min)/span*(bottom-top);add('line',{x1:left,y1:yy,x2:right,y2:yy,stroke:'#dce6ef'});add('text',{x:left-9,y:yy+4,'text-anchor':'end','font-size':12,fill:'#52647d'},Number(val.toFixed(2)).toLocaleString('ko-KR'))}
 const step=(right-left)/labels.length,zero=bottom-(0-min)/span*(bottom-top);
 labels.forEach((label,i)=>{const cx=left+step*(i+.5);add('text',{x:cx,y:bottom+20,'text-anchor':'middle','font-size':Math.max(9,Math.min(13,310/labels.length)),fill:'#34435b'},label.slice(0,12))});
 series.forEach((ser,j)=>{let points=[];ser.values.forEach((v,i)=>{if(v===null){if(chartType==='line'&&points.length>1)add('polyline',{points:points.join(' '),fill:'none',stroke:ser.color,'stroke-width':3});points=[];return}const cx=left+step*(i+.5),cy=bottom-(v-min)/span*(bottom-top);if(chartType==='bar'){const width=Math.min(48,step*.75/series.length),bx=cx-step*.375+j*width;add('rect',{x:bx,y:Math.min(cy,zero),width:width-2,height:Math.max(1,Math.abs(zero-cy)),rx:2,fill:ser.color});if(labels.length<=12)add('text',{x:bx+(width-2)/2,y:Math.min(cy,zero)-6,'text-anchor':'middle','font-size':10,fill:'#233a56'},v)}else{points.push(`${cx},${cy}`);add('circle',{cx,cy,r:4,fill:ser.color});if(labels.length<=12)add('text',{x:cx,y:cy-9-j*12,'text-anchor':'middle','font-size':10,fill:ser.color},v)}});if(chartType==='line'&&points.length>1)add('polyline',{points:points.join(' '),fill:'none',stroke:ser.color,'stroke-width':3})});
 series.forEach((ser,j)=>{const lx=left+j*135;add('rect',{x:lx,y:430,width:14,height:14,rx:2,fill:ser.color});add('text',{x:lx+20,y:442,'font-size':14,fill:'#25344c'},ser.name)});
 }
 add('text',{x:855,y:465,'text-anchor':'end','font-size':12,fill:'#52647d'},d.unit||'');wrapper.appendChild(svg);
 const btn=document.createElement('button');btn.className='secondary';btn.textContent='그래프 SVG 다운로드';btn.onclick=()=>download('분석그래프.svg',new XMLSerializer().serializeToString(svg),'image/svg+xml;charset=utf-8');actions.appendChild(btn);
 }}wrapper.appendChild(table);const result=$('result');const interpretation=result.querySelector('.vizInterpretation');if(interpretation){result.insertBefore(wrapper,interpretation);const label=document.createElement('h3');label.textContent='간단한 데이터 해석';result.insertBefore(label,interpretation)}else result.appendChild(wrapper);
}
async function requestAI(previousAnswer='',forcedProgram=''){
 const question=$('question').value.trim();
 const classification=detectProgram(question,attachedFiles,program);
 const attachments=await prepareAttachments();
 const detected=forcedProgram||classification.name;
 const safe=maskText(question);
 const matches=knowledge.filter(x=>detected==='미확인'||x.program===detected||x.program==='공통').map(x=>({...x,_score:score(x,safe)})).sort((a,b)=>b._score-a._score).slice(0,5);
 const response=await fetch('/api/assist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:safe,program:detected,attachments,previousAnswer:maskText(previousAnswer),version:'',context:matches.filter(x=>x._score>=5).map(x=>({title:x.title,answer:x.answer||x.solution,source:String(x.id).startsWith('EX')||String(x.id).startsWith('HW')?'기본 도움말':'사용자 해결 확인 사례'}))})});
 const data=await response.json().catch(()=>({code:'API_ERROR',error:'서버 응답을 해석하지 못했습니다.'}));
 if(!response.ok)throw data;feedbackProof=data.feedbackProof||null;
 const actual=['한글','엑셀'].includes(data.detectedProgram)?data.detectedProgram:(['한글','엑셀'].includes(detected)?detected:'미확인');
 if(actual!==program)selectProgram(actual);
 const isViz=data.taskType==='시각화'||/```vizjson\s*/i.test(data.answer||'');
 if(isViz){
  currentItem=null;last={question:question||'첨부 자료',answer:data.answer,program:actual};
  $('source').textContent='Gemini AI · '+(data.model||'분석');
  $('result').innerHTML='<div class="vizIntro"><h3>'+escapeHtml(question||'자료 시각화')+'</h3></div><div class="answer vizRaw"></div>';
  renderVisualization(data.answer);
  if(!$('result').querySelector('.vizOutput'))$('result').innerHTML='<h3>시각화 데이터 확인 필요</h3><div class="answer">'+formatAnswer((data.answer||'').replace(/```vizjson[\s\S]*?```/i,''))+'</div><p class="notice">표·그래프 데이터를 생성하지 못했습니다. 수치가 보이는 자료를 첨부하여 다시 요청해 주세요.</p>';
  $('result').scrollTop=0;showTab('answer');
 }else{showAnswer({title:question||'첨부 파일 분석',answer:data.answer,program:actual},'Gemini AI · '+(data.model||'분석'));}

 if(data.taskType!=='오류해결'||isViz)$('feedback').style.display='none';
 if(data.attachmentWarnings?.length)$('result').insertAdjacentHTML('beforeend',`<p class="notice">${escapeHtml(data.attachmentWarnings.join(' / '))}</p>`);
}
$('askBtn').onclick=async()=>{
 if(!$('question').value.trim()&&!attachedFiles.length){alert('질문 또는 파일을 첨부하세요.');return}
 showTab('answer');$('source').textContent='Gemini 분석 중';$('result').innerHTML='<p class="sub">답변을 생성하고 있습니다...</p>';$('feedback').style.display='none';$('askBtn').disabled=true;
 try{await requestAI()}catch(e){showAiError(e)}finally{$('askBtn').disabled=false}
};
$('resolved').onclick=async()=>{
 if(!last)return;
 $('resolved').disabled=true;$('source').textContent='공동 DB 저장 중';
 const note=document.createElement('p');note.className='notice';note.textContent='채택한 해결책을 공동 지식 DB에 저장하고 있습니다...';$('result').appendChild(note);
 try{
  const r=await fetch('/api/feedback',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({feedbackProof})});const d=await r.json().catch(()=>({}));
  if(!r.ok)throw Error(d.error||'저장에 실패했습니다.');
  note.textContent=d.message||'공동 DB에 저장했습니다.';$('source').textContent='해결 완료 · DB 축적';$('feedback').style.display='none';
  // 방금 저장한 질문은 이 브라우저에서도 즉시 검색할 수 있도록 반영
  if(!d.duplicate){knowledge.push({id:'saved-'+Date.now(),program:last.program||program,category:'사용자 해결 확인',title:last.question,answer:last.answer,keywords:''});renderCategories();renderLibrary()}
 }catch(e){note.textContent='해결 여부는 확인했습니다. 다만 공동 DB 저장 실패: '+e.message;$('source').textContent='해결 완료 · DB 저장 실패';}
 finally{$('resolved').disabled=false}
};
$('retry').onclick=async()=>{
 if(!last)return;const previous=last.answer;
 $('retry').disabled=true;$('source').textContent='Gemini 추가 진단 중';
 try{await requestAI(previous)}catch(e){showAiError(e)}finally{$('retry').disabled=false}
};
$('clearBtn').onclick=()=>{feedbackProof=null;$('question').value='';attachedFiles=[];imageUrls.forEach(url=>URL.revokeObjectURL(url));imageUrls.clear();refreshAttachments();canvasImage=null;$('imageControls').classList.add('hide');$('imageFile').value='';$('result').innerHTML='<p class="sub">질문을 입력하세요.</p>';$('feedback').style.display='none'};
$('search').oninput=renderLibrary;document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));
async function init(){applyTheme();renderCategories();renderLibrary();try{const r=await fetch('/api/knowledge');if(r.ok){const d=await r.json();if(d.connected){knowledge=[...DEMO,...d.items.map(x=>({...x,answer:x.solution}))];renderCategories();renderLibrary()}}}catch(e){}}init();
