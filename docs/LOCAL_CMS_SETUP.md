# 로컬 앱·CMS 연결 실증

작성: 2026-10-08. 사용자가 Sanity 프로젝트 생성을 완료했다고 알렸다. 프로젝트 ID·dataset 설정 및 실제 연결 검증은 아직 하지 않았다. 전체 사이트 구현·Cloudflare 배포·실제 문의는 이번 범위 밖이다.

## 실행

Node.js 22 사용. `npm install` 후 `npm run dev`, http://127.0.0.1:3000 접속. `npm run typecheck`, `npm test`, `npm run build`로 검사한다. 버전은 설치 후 package-lock.json에 고정한다. 공개 서비스 가입 자동 CLI는 사용하지 않는다.

- `/`: 연결 실증 안내
- `/studio`: 프로젝트 설정 전에는 준비 안내, 설정 후 Sanity 로그인·관리자
- `/ko/projects/cms-study`: 명시적인 테스트 콘텐츠 상세
- `/api/preview`: 비밀 값 확인 후 프로젝트 존재 검증·초안 쿠키 설정·상세로 이동
- `/api/preview/disable`: 초안 모드 종료

`.env.local`이 없을 때만 `.env.example`을 복사한다. 현재 작업 PC에는 로컬 파일과 생성된 PREVIEW_SECRET이 있으므로 덮어쓰지 말고 필요한 값만 수정한다. 초기 CONTENT_SOURCE=fixture. fixture는 읽기 전용이며 브라우저 편집 저장이나 CMS 저장을 흉내 내지 않는다. 실제 수정·저장은 Sanity Studio가 담당한다. localStorage 편집 실증은 기존 prototype/에 남아 있다. Sanity 설정을 잘못 입력하면 fixture로 조용히 전환하지 않는다.

## 사용자 프로젝트 준비 후 연결

1. 사용자 소유 Sanity Free 프로젝트·public dataset 준비. 공개 가능한 작업물만 저장. 문의는 여기에 저장하지 않는다.
2. NEXT_PUBLIC_SANITY_PROJECT_ID와 NEXT_PUBLIC_SANITY_DATASET 설정. 이 두 식별자는 공개 가능하다.
3. Sanity CORS에 실제 로컬 주소(http://127.0.0.1:3000)를 credentials 허용으로 등록하고 Studio에서 로그인.
4. Studio에서 projectLocale 생성. 언어 ko, fixture=true, slug=cms-study. 제목·본문·자유 HTML/CSS 테스트 블록 작성. 자동 저장 완료 확인.
5. 초안 미리보기용 읽기 토큰은 SANITY_API_READ_TOKEN에 로컬 입력. PREVIEW_SECRET은 충분히 긴 무작위 값으로 설정. 토큰·secret을 채팅·Git에 넣지 않는다.
6. CONTENT_SOURCE=sanity로 전환하고 서버 재시작. 일반 상세는 공개본만 조회한다. 초안만 존재하면 404가 정상이다.
7. 로컬 브라우저에서 `/preview`를 열고 비밀 값과 slug를 입력해 POST로 인증한다. 비밀 값을 URL에 넣지 않는다. 이 수동 경로는 연결 실증용이며 운영에서는 로그인된 Studio의 안전한 미리보기 연결로 교체한다.
8. 미리보기에서 초안 확인, 종료 후 공개본 확인. 테스트 문서 공개 후 공개본 조회, 다시 수정해 공개본 유지 확인. 공개 검증을 위해서는 사용자 프로젝트 내 테스트 문서를 공개하게 된다는 점을 구분한다.
9. HTML/CSS 주석·들여쓰기·줄바꿈을 저장 후 재접속해 비교하고 복제/순서 변경을 확인한다.

Project ID와 dataset 이름은 https://www.sanity.io/manage 에서 해당 프로젝트를 열어 확인한다. Dataset은 실제 생성한 이름을 사용하며 production이라고 추정하지 않는다. API의 CORS origins에 `http://127.0.0.1:3000`을 추가하고 Allow credentials를 켠다. `localhost` 주소도 사용한다면 그 주소를 별도로 등록한다. API Tokens에서 초안 조회용 읽기 전용(Viewer) 토큰을 만들고 `.env.local`의 SANITY_API_READ_TOKEN에 직접 입력한다. Studio 저장은 사용자의 로그인 권한으로 처리하므로 이 토큰에 쓰기 권한을 줄 필요가 없다.

설정 예시(실제 값은 로컬 파일에 입력):

```dotenv
NEXT_PUBLIC_SANITY_PROJECT_ID=실제프로젝트ID
NEXT_PUBLIC_SANITY_DATASET=실제dataset이름
CONTENT_SOURCE=sanity
SANITY_API_READ_TOKEN=로컬에만입력
# 기존 PREVIEW_SECRET 값은 유지
```

설정 후 개발 서버를 종료하고 `npm run dev`로 다시 시작한다. http://127.0.0.1:3000/studio 에서 로그인한다. Project ID와 dataset 이름만 채팅에 공유할 수 있으며 토큰과 PREVIEW_SECRET은 공유하지 않는다.

현재 새로고침 기반 미리보기다. 실시간 동기화·Presentation 연결·운영용 공개 검증은 후속 작업이며 완료로 표시하지 않는다. 자유 코드 원본은 React 텍스트로만 표시해 실행하지 않는다. 기존 sandbox 렌더러의 실제 앱 연결도 후속 과제다.

## 코드 책임과 제한

`src/services/sanity.ts`만 조회 SDK·서버 토큰을 다룬다. `src/content/model.ts`는 외부 값 검증, `src/fixtures/project.ts`는 테스트 전용, `src/sanity/schema.ts`는 Studio 스키마다. 조회는 cache:no-store, published/drafts 분리. 미리보기 요청의 외부 redirect를 허용하지 않는다. 페이지는 noindex이며 공개 사이트가 아니다.

연결 실증 모델은 제목·본문과 자유 코드 두 블록만 지원한다. 공유 구조·이미지·언어별 공개 스냅샷은 운영 스키마로 확장할 때 도입한다. 영어는 구조 검토 필드만 있으며 영어 공개 페이지/언어 메뉴는 없다. Studio 기본 UI의 서체는 공급자 기본이고 사이트 Koddi 스타일 범위와 분리한다. 로컬 폰트는 Git 제외된 public/fonts에 준비한다.

Sanity Free의 published/non-draft 문서는 공개 API 접근 대상이다. 화면 필터를 비공개 보호 수단으로 쓰지 않는다. 실제 문의 저장·D1·메일·예약 재시도·백업 복원은 미구현이다. Cloudflare 어댑터 미선정이며 로컬 Next.js 성공은 Workers 런타임 성공을 뜻하지 않는다.

공식 참고(2026-10-08): https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs , https://nextjs.org/docs/app/api-reference/functions/draft-mode

## 이번 로컬 검증 결과

- 타입 검사 통과, 데이터 테스트 2건 통과(원본 주석·줄바꿈 보존, 복사 독립성, 중복 ID/필드 누락 거절).
- HTTP 검사 통과: 홈·CMS 미연결 안내·테스트 상세 200, 잘못된 인증 401, 누락 상세 404, 외부 주소 400, 인증 POST 303 및 초안 쿠키, 초안 표시·종료.
- `node scripts/smoke-local.mjs`는 fixture 모드·CMS 미연결 상태·로컬 PREVIEW_SECRET을 전제로 한다. 실제 Sanity 연결 상태에서는 별도 실증 절차를 사용한다. 비밀 값은 출력하지 않는다.
- 최초 Next.js 빌드 통과. 최종 빌드 결과는 STATUS에 기록한다.
- 설치된 직접 의존성 버전과 lockfile 고정. Next 16.4.0, React 19.3.0, Sanity 6.18.0, next-sanity 13.3.4. 로컬 Node 22.19.0.
- `npm audit`와 일반 `npm audit fix` 후 18건(중간 9·높음 9) 남음. Sanity CLI/codegen 등 간접 의존성이 포함된다. 진단이 제안한 Sanity 5.14.1 강제 변경은 현재 next-sanity의 peer 범위(^5.29 또는 ^6)보다 낮아 실행하지 않았다. 실제 노출 범위 평가·호환 가능한 공급자 수정판 확인은 공개 배포 전 과제다. 위험이 없다고 판단한 것이 아니다.
- Sanity 로그인·실제 저장·공개본/초안 분리·이미지·실시간 미리보기·Workers 런타임은 미검증. 사용자 프로젝트 생성 후 진행한다.
