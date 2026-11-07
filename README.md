# Help 엑셀▪한글 — 사용 안내 및 Vercel 배포

## 무엇을 하는 프로그램인가요?
엑셀·한글의 오류, 서식, 함수, 표 편집 문제를 **질문이나 화면 캡처/파일로 등록**하면 Gemini AI가 해당 프로그램을 자동 판별하고 메뉴 경로와 해결 순서를 설명합니다. 엑셀 답변은 녹색, 한글 답변은 파란색 계열로 표시됩니다. 프로그램 선택·버전 입력은 기본적으로 필요하지 않습니다.

## 사용 방법
1. 질문을 자연스럽게 입력하세요. 예: `한글 표에서 하늘색 셀 배경을 노란색으로 바꾸고 싶어`.
2. 오류 화면을 Ctrl+V로 붙여넣거나 이미지, XLSX/XLSM/CSV, HWPX, PDF를 첨부할 수 있습니다. 개인정보·비공개 문서·비밀번호는 **첨부하지 마세요**. 서버에 외부 AI 분석용으로 전달됩니다.
3. **문제 등록하고 해결 방법 보기**를 누르면 AI가 파일 내용과 질문을 함께 분석합니다. HWPX의 모든 서식/색상이 추출되는 것은 아니므로 시각적 문제는 화면 캡처를 함께 넣으세요.
4. 답변의 메뉴 경로를 따라 작업합니다. 프로그램 판별이 틀리면 답변 상단에서 엑셀/한글로 바꿔 재분석합니다.
5. 해결되지 않았다면 **해결되지 않았어요**를 눌러 다른 원인과 해결책을 요청합니다.
6. 실제로 해결됐다면 **해결됐어요**를 누릅니다. **현재 표시된 채택 답변과 일반화된 질문이 Notion 공동 DB에 자동 저장**됩니다. 별도 로그인이나 관리자 수동 입력은 필요하지 않습니다.
7. **해결 팁 찾기**에서 다른 사용자가 해결한 사례를 검색할 수 있습니다.

## 공동 DB가 쌓이면 어떤 점이 좋아지나요?
- 사용자가 채택한 실제 해결 사례가 누적되어 비슷한 질문에 **과거 성공 사례를 우선 참고**할 수 있습니다.
- 누적된 사례를 Gemini의 참고 문맥으로 전달해 더 구체적이고 관련성 높은 답변을 생성하도록 돕습니다.
- 단, **사례 증가가 AI 모델 자체를 재학습시키거나 정답률 상승을 보장하는 것은 아닙니다.** 잘못된 채택, 중복, 유사도 오판이 있을 수 있어 품질 관리가 필요합니다.
- 동일한 질문과 답변은 중복 등록을 줄입니다. 사용자별 계정이나 첨부 원본은 Notion에 저장하지 않습니다.

## 무료 Gemini API 안내
무료 사용량·속도 제한은 Google AI Studio 프로젝트별로 다릅니다. 429 응답이 발생하면 일일 할당량인지 분당 제한인지 가능한 범위에서 구분하여 안내합니다. 유료 모델로 자동 전환하지 않습니다. API 키는 Vercel 환경변수에만 등록합니다. `index.html`을 파일로 직접 열면 AI 및 Notion 서버 기능은 동작하지 않습니다.

## Notion DB 만들기
1. Notion에서 `Help 엑셀▪한글 해결 사례` 데이터베이스를 만듭니다.
2. 다음 속성을 **영문 이름과 타입 그대로** 생성하세요.

| 속성명 | Notion 속성 유형 |
| --- | --- |
| Name | 제목 (Title) |
| Program | 선택 (Select) — `엑셀`, `한글`, `공통` |
| Category | 텍스트 (Rich text) |
| Symptom | 텍스트 (Rich text) |
| Solution | 텍스트 (Rich text) |
| Keywords | 텍스트 (Rich text) |

3. https://www.notion.so/profile/integrations 에서 내부 Integration을 만들고 **읽기 및 콘텐츠 삽입 권한**을 부여합니다.
4. 데이터베이스의 연결(Connections)에 Integration을 추가합니다.
5. Notion API의 **데이터 소스 ID**를 확인합니다. 데이터베이스 ID와 혼동하지 마세요. 최신 API에서 데이터 소스 목록을 조회하여 ID를 확인할 수 있습니다.
6. 아래 환경변수를 Vercel에 등록합니다. **토큰을 README, GitHub, 브라우저 JS에 넣지 마세요.**

## Vercel 배포
1. ZIP을 풀고 **내부 파일들**(`api/`, `public/`, `package.json`, `vercel.json`)을 GitHub 저장소 루트에 업로드합니다.
2. https://vercel.com/new 에서 저장소를 Import 합니다. Framework Preset은 Other로 지정할 수 있습니다.
3. Settings → Environment Variables에서 다음을 입력합니다.
   - `GEMINI_API_KEY`: Google AI Studio API 키
   - `GEMINI_MODEL`: `gemini-2.5-flash` (무료 제공 여부는 계정에서 확인)
   - `NOTION_TOKEN`: Notion Integration 비밀 토큰
   - `NOTION_PROBLEMS_DATA_SOURCE_ID`: 연결한 데이터 소스 ID
   - `FEEDBACK_SIGNING_SECRET`: 임의로 만든 **32자 이상 비밀 문자열**
4. Redeploy 합니다. `/api/knowledge`에서 `connected:true`를 확인합니다.
5. 새 질문을 Gemini로 해결한 뒤 **해결됐어요**를 눌러 Notion DB에 새 페이지가 생성되는지 확인합니다.
6. 저장 실패 메시지가 나오면 Notion 속성 이름·유형, Integration의 쓰기 권한, 데이터 소스 ID를 점검합니다.

## 보안 및 운영상의 한계
- 사용자 클릭만으로 저장되므로 **채택은 성공 보고이지 전문 검증을 뜻하지 않습니다**. 운영자는 부정확한 사례를 정리할 수 있어야 합니다.
- 저장 API는 Gemini 응답에 서명한 **30분 유효 토큰**을 요구하여 무제한 임의 문장 등록을 줄입니다. 그러나 로그인 없는 공개 서비스의 **스팸·자동 클릭·반복 요청을 완전히 차단하지 못합니다**. 공개 배포 시 Vercel WAF/Rate Limiting 또는 별도 CAPTCHA를 추가하세요.
- 서버의 정규식 기반 개인정보 마스킹은 완전하지 않습니다. 이름, 주소, 기관 내부정보 등이 포함된 질문은 사용자가 먼저 제거해야 합니다. 원본 첨부파일은 Notion에 저장하지 않습니다.
- 현재 Notion 검색은 최근 최대 100건을 조회해 브라우저에서 검색합니다. 데이터가 많아지면 서버 측 검색·페이지네이션·유사도 검색으로 개선해야 합니다.
- Gemini는 무료 사용량이 소진되면 일시적으로 중단될 수 있지만, 기존 공동 DB의 검색은 별도로 이용할 수 있습니다.

## 구현 범위
코드에 자동 저장과 중복 검사 및 기존 DB 조회가 구현되어 있습니다. 실제 Notion/Gemini 계정의 키가 없어 운영 환경에서의 실연동은 아직 검증되지 않았습니다.

## Gemini 연결 오류 진단 (추가)

Vercel에 배포한 뒤 브라우저에서 `https://본인배포주소/api/gemini-status`를 엽니다.
이 주소는 비밀 API 키를 공개하지 않고, 현재 배포가 Gemini 모델 목록을 조회할 수 있는지 검사합니다.
- `connected: false`, `code: NO_KEY`: 배포에 API 키가 적용되지 않았습니다. Production 환경변수를 확인하고 Redeploy 하세요.
- `connected: false`, `httpStatus: 400/403`: Google API 응답 메시지를 확인하고 AI Studio의 API 키·프로젝트 권한을 점검하세요.
- `connected: true`, `modelAvailable: false`: `availableFlashModels`에 나타나는 모델 중 Google AI Studio에서 무료 등급을 확인한 모델명을 `GEMINI_MODEL`에 지정하고 Redeploy 하세요.
- `connected: true`, `modelAvailable: true`: 모델 조회는 정상입니다. 실제 질문 시 오류가 나면 Vercel Logs에서 `/api/assist`의 오류를 확인하세요.

**중요:** 모델 목록 조회 성공은 실제 답변 생성 성공이나 무료 사용 가능성을 보장하지 않습니다. 무료 등급 여부는 AI Studio에서 별도 확인하세요. 키를 브라우저 주소나 공개 저장소에 넣지 마세요.


## Gemini 답변 시간초과 대응 (2026-11)
- 기본 `GEMINI_MODEL=gemini-3.8-flash`, 대체 `GEMINI_FALLBACK_MODEL=gemini-3.1-flash-lite` (선택 사항).
- 기본 모델 20초 안에 응답하지 않거나 HTTP 500/502/503/504를 반환하면 대체 모델로 20초 한 번만 재시도합니다.
- 429 할당량, 401/403 인증, 400 요청 오류에는 대체 요청을 보내지 않습니다.
- 대체 모델이 실제 사용 가능한지는 API 키의 프로젝트 권한·무료 할당량에 따라 달라집니다. 대체 모델도 실패할 수 있습니다.
- Vercel Function Logs에서 `[Gemini primary network]`, `[Gemini fallback]`, `[Gemini generateContent]`를 확인하세요.
- 코드 문법 검사는 수행했지만 실제 사용자 API 키로 원격 호출은 수행하지 않았습니다.


## v3 신규 기능
- 질문 내용을 바탕으로 오류 해결 / 표·그래프 작성 / 내용 요약·분석 자동 분기
- Gemini가 원본에서 추출한 데이터로 JSON 표를 반환하면 브라우저에서 표와 SVG 그래프 렌더링
- 표는 UTF-8 BOM CSV, 그래프는 SVG로 내려받아 보고서에 삽입 가능
- 시각화 수치가 자료에 없을 때 임의 생성 금지. CSV와 SVG는 클라이언트에서 생성하여 별도 서버 저장하지 않음
- Excel/HWPX는 기존과 같이 일부 행/텍스트만 추출하므로 전체 문서 분석으로 오인하지 말 것
- Notion에 해결 확인 사례 저장은 기존 오류해결 질문에만 표시
- 실제 Gemini API 동작은 배포 및 API 키 환경에서 별도 확인 필요
