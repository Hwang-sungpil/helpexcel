# Help 엑셀▪한글 — 자동 프로그램 판별 버전

- 입력 화면의 엑셀/한글 선택 및 버전 설정을 제거했습니다.
- Gemini가 질문과 첨부자료를 바탕으로 대상 프로그램을 판별합니다.
- AI 판별 후 엑셀은 녹색, 한글은 파란색 테마를 적용합니다. 판별 전에는 중립색을 사용합니다.
- AI 판별이 틀리면 답변 상단의 **엑셀로 다시 분석 / 한글로 다시 분석** 버튼을 사용하세요.
- 프로그램 버전이 중요한 질문은 AI 답변에서 추가 확인을 요청할 수 있습니다.
- 실제 이미지 분석은 Vercel 배포 후 GEMINI_API_KEY가 등록되어야 작동합니다. 로컬 file:// 실행에서는 AI가 작동하지 않습니다.
- Gemini API 사용량 제한 시 오류 메시지를 표시하며 유료로 자동 전환하지 않습니다.

# Help 엑셀▪한글 — Gemini + Notion + Vercel

## 시작하기
1. ZIP을 풀고 `office-helper` 폴더 전체를 GitHub 비공개 저장소에 업로드합니다. (루트에 `api/`, `public/`, `package.json`, `vercel.json`이 보여야 합니다.)
2. Vercel → Add New → Project → GitHub 저장소 선택 → Framework Preset **Other** → Root Directory는 `office-helper`(저장소 최상위에 이 폴더가 있는 경우) → Deploy.
3. Vercel 프로젝트 → Settings → Environment Variables에 아래 키를 등록합니다. 값에 따옴표는 붙이지 않습니다. Production/Preview 사용 환경을 확인합니다.
   - `GEMINI_API_KEY`: Google AI Studio에서 발급한 키
   - `GEMINI_MODEL`: `gemini-2.5-flash` (무료 제공 및 모델 이용 가능 여부는 AI Studio에서 확인)
   - `NOTION_TOKEN`: Notion Integration 비밀 토큰
   - `NOTION_PROBLEMS_DATA_SOURCE_ID`: 해결 팁 DB의 **Data source ID**
4. **Redeploy** 후 Vercel URL에서 테스트합니다. API 키는 HTML·브라우저 코드·GitHub에 넣지 않습니다.
5. `public/index.html` 직접 실행은 기본 도움말만 이용 가능합니다. AI와 Notion은 Vercel 배포 주소에서 작동합니다.

## Notion 연결 순서
1. Notion에서 새 데이터베이스(전체 페이지) **Help 엑셀▪한글 해결 팁**을 만듭니다.
2. 다음 속성을 **영문 이름 그대로** 생성합니다. `Name`(제목/title), `Program`(선택/select: 엑셀, 한글, 공통), `Category`(텍스트/rich text), `Symptom`(텍스트/rich text), `Solution`(텍스트/rich text), `Keywords`(텍스트/rich text). 기존 DB를 사용한다면 `Name`, `Program` 등의 속성명을 확인하세요.
3. https://www.notion.so/profile/integrations 에서 내부 Integration을 생성하고 읽기 권한(Read content)을 부여합니다. 발급된 **Internal Integration Secret**을 `NOTION_TOKEN`으로 저장합니다.
4. 해당 데이터베이스에서 `···` → `Connections`(또는 `Add connections`) → 생성한 Integration을 연결합니다. 권한을 부여하지 않으면 403 오류가 발생합니다.
5. 데이터베이스의 **Manage data sources** 또는 데이터 소스 설정에서 Data source ID를 확인합니다. Notion API 2025-09-03 기준 `data_sources/{id}/query` 엔드포인트를 사용합니다. 일반 DB ID와 Data source ID는 다릅니다. Notion API를 통해 `GET /v1/databases/{database_id}`를 호출하면 `data_sources[].id`를 확인할 수 있습니다.
6. `NOTION_PROBLEMS_DATA_SOURCE_ID`에 Data source ID를 넣고 Vercel에서 Redeploy 합니다. `/api/knowledge` 주소에서 `connected:true`와 `items`가 보이면 연결 성공입니다.
7. Notion의 `Name`(문제 제목)과 `Solution`(해결 방법)을 입력하면 '해결 팁 찾기'에 표시됩니다.

## 파일 분석 범위
- 이미지 PNG/JPEG/WEBP: Gemini 이미지 입력. 첨부 이미지는 모두 분석에 전달됩니다.
- PDF: Gemini PDF 입력.
- XLSX/XLSM: ExcelJS로 최대 8개 시트, 시트당 70행·행당 22개 셀의 텍스트/수식을 추출. 매크로 코드는 실행/분석하지 않습니다.
- CSV: UTF-8 텍스트 일부를 추출. EUC-KR/CP949 파일은 먼저 UTF-8로 변환해야 정확합니다.
- HWPX: 문서 내부 XML에서 본문 텍스트 일부를 추출. 표 셀 색상/배치 등 시각적 서식 판단에는 화면 캡처가 추가로 필요합니다.
- HWP(구형 바이너리)는 지원하지 않습니다. HWPX 또는 PDF로 저장해 첨부하세요.
- 파일당 최대 7MB, 이미지 5MB, 최대 5개. 파일 내용은 Gemini로 전송되며 서버/Notion에 원본 저장하지 않습니다.
- 사용자의 질문만으로도 메뉴 경로·단계별 텍스트 도식과 대안을 생성합니다. **실제 메뉴 스크린샷을 자동 생성하는 기능은 아닙니다.**

## 무료 한도 안내
429 오류를 `DAILY_QUOTA`, `RATE_LIMIT`, `QUOTA_UNKNOWN`으로 분류합니다. Google이 세부 한도를 명시하지 않으면 일일 소진이라고 단정하지 않습니다. 자동 유료 전환 코드는 없습니다. Google AI Studio의 실제 무료 등급·결제 연결 여부는 사용자가 확인해야 합니다.

## 보안과 운영
- 공공기관의 개인정보·비공개 문서를 외부 Gemini API에 업로드하지 마세요. 첨부파일 자동 비식별화는 구현되지 않았습니다.
- Notion은 검증된 해결 팁을 관리자가 직접 입력하는 **읽기 전용 공동 DB**입니다. 로그인 없는 공개 환경에서 익명 자동 등록은 스팸·개인정보 위험 때문에 비활성화했습니다.
- 이 프로젝트는 프로토타입입니다. 실제 AI 모델 호출, 실제 Notion DB 조회, Vercel 배포는 사용자의 키와 계정으로 검증해야 합니다.

## 화면 균등 배치
데스크톱에서 문제 등록 및 답변 패널을 동일한 너비(50:50)와 동일한 높이로 표시합니다. 920px 이하에서는 세로 배치로 전환합니다.
