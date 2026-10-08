# Cloudflare 배포 준비

## 실제 검토 배포 결과 (2026-10-08)

- 사이트: https://portfolio-web.jinhh.workers.dev
- 관리자: https://portfolio-web.jinhh.workers.dev/studio
- 초안 인증: https://portfolio-web.jinhh.workers.dev/preview
- Workers Free, 최종 버전05a4a659-4573-41f0-8c78-2aa895f425e4. 두 원격 secret 등록 유지.
- Studio SSR500은 StudioLoader의 브라우저 전용 로딩으로 수정. 사용자 CORS credentials 저장 후 로그인 제공자 화면 확인. 사용자 로그인/원격 편집 저장은 미검증.
- 원격 CMS 초안 인증·원본 코드 일치·공개본 조회, 없는 상세404·외부 출처403 확인, 최종 Next 빌드 통과.
- 일부 요청 CPU37~81ms, 재요청 홈6ms. 당시200/outcome ok였지만 기본 Free10ms 초과 샘플이 있어 지속 안정성 별도 확인 필요. 요금제 변경 없음.
- 아래 준비/주소 대기 기록은 과거 단계. 전체 사이트/문의/앱 자유 코드 격리 렌더러는 미완료.

확인일: 2026-10-08. 현재는 로컬 실증까지다. 사용자는 Cloudflare 가입 완료. wrangler whoami로 CLI 미인증 확인. 요금제 변경·원격 배포는 수행하지 않았다.

후속 사용자 확인: CLI 로그인 완료, 현재 Workers Free. dry-run 업로드 약8.85MiB로 공식 비압축64MiB 제한 충족. Free 검토 배포 가능 후보이나 요청당 CPU10ms·시작시간1초는 실제 배포 후 확인 필요. 지금 결제 변경 권장하지 않으며 Paid 운영 결정은 유지하되 Free 검토 사용을 제안한다. 원격 secret/배포는 아직 미수행.

후속 Free 검토 배포 승인·진행: portfolio-web 생성과 두 원격 secret 등록, 빌드/asset/Worker 업로드 성공. Cloudflare 시작시간12ms. 계정의 workers.dev 기본 subdomain 미등록으로 주소 활성화 실패. 사용자 onboarding에서 기본 이름 등록 후 배포 재실행 필요. 이 이름은 공개 이름과 별개이며 실제 외부 주소는 등록 완료 전 확정하지 않는다. 외부 HTTP/미리보기/CPU 사용은 아직 미검증.

사용자가 Wrangler의 onboarding 링크 404 보고. 해당 링크를 다시 안내하지 않는다. 공식 현재 안내는 Cloudflare 대시보드 계정의 Workers & Pages 목록에서 Your subdomain 옆 Change 선택. 개별 portfolio-web 상세의 도메인 설정과 구분. 새 계정에서 메뉴를 찾기 어려우면 사용자가 원하는 계정 subdomain 문자열을 지정하고 Wrangler의 등록 흐름으로 에이전트가 등록·배포를 마무리한다. subdomain은 임의로 선택하지 않는다.

제한 확인(2026-10-08): https://developers.cloudflare.com/workers/platform/limits/

## 실행 경로와 선택 상태

기존 Next.js 개발 경로는 유지한다. Cloudflare용으로 vinext 1.0.1 + Cloudflare Vite 플러그인을 병행 추가했다. 공식 안내는 vinext를 권장하지만 베타이며 Next.js API를 Vite에서 구현하는 별도 런타임이다. 기존 Next.js 자체를 그대로 실행하는 어댑터로 해석하지 않는다. OpenNext는 대안이며 이번 작업에서 설치·검증하지 않았다. 최종 채택은 운영 요구와 아래 제한 검토 후 결정한다.

공식 자료: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/

```powershell
npm ci
npm run dev
# Cloudflare용 빌드와 로컬 실행
npm run build:vinext
npm run start:vinext -- --port 8787
```

일반 개발은 3000, 로컬 Worker는 8787이다. 둘 모두 로컬 주소이며 외부 접속 주소가 아니다. Worker 시작 후 http://127.0.0.1:8787/preview 에서 인증한다. Studio는 기존 http://127.0.0.1:3000/studio 사용 가능.

## 설정과 비밀 값

- wrangler.jsonc: 임시 Worker 리소스 이름 portfolio-web, workers_dev 활성화, 공개 Project ID·dataset, CONTENT_SOURCE=sanity. 공개 이름 결정과 별개다.
- .env.local: Next 개발과 빌드의 공개 Sanity 설정, 서버 초안 조회 토큰·미리보기 키. Git 제외.
- .dev.vars: 로컬 Worker의 SANITY_API_READ_TOKEN·PREVIEW_SECRET. .dev.vars.example을 기준으로 작성, Git 제외. 현재 로컬 값은 .env.local과 동일하게 준비했다.
- 빌드가 dist/server/.dev.vars를 복사하므로 dist 전체도 Git 제외. 배포 시 로컬 파일을 원격 secret 등록으로 간주하지 않는다.
- 비밀 값은 브라우저에 전달하거나 NEXT_PUBLIC_ 접두사를 붙이지 않는다. 빌드 산출물 JS/JSON/HTML에서 실제 비밀 값이 없는 것을 검사했다.

## 실제 배포 시 순서 (아직 실행하지 않음)

1. 사용자가 Cloudflare 계정과 Workers 요금제 상태를 확인하고 원격 배포를 승인한다. 현재 선택은 Workers Paid 기본 월 $5, 도메인·세금·초과 사용 별도다.
2. 프로젝트 터미널에서 `npx wrangler login`으로 사용자 계정 인증. 로그인·토큰 값은 채팅에 보내지 않는다.
3. `npx wrangler secret put SANITY_API_READ_TOKEN --config wrangler.jsonc`, `npx wrangler secret put PREVIEW_SECRET --config wrangler.jsonc`로 사용자 입력을 통해 원격 secret 등록. 이 명령은 원격 리소스를 변경하므로 승인된 배포 단계에 실행한다.
4. `npm run build:vinext` 후 `npm run deploy:vinext`. 배포 출력의 실제 workers.dev 주소를 기록한다. 계정 subdomain 미확정이므로 주소를 미리 만들지 않는다.
5. Sanity 관리에서 실제 배포 origin을 CORS에 추가하고 Studio 인증을 위해 credentials를 허용한다. 전체 origin wildcard는 사용하지 않는다.
6. 외부 브라우저에서 홈·Studio 로그인·공개 상세·초안 인증·미리보기 종료를 확인한다. 미리보기 키는 POST 폼에만 입력한다.

D1·Resend·문의 기능은 아직 연결하지 않았다. KV/R2/이미지 서비스와 CDN·데이터 캐시는 이번 실증에 추가하지 않았다. 실제 프로젝트 콘텐츠에는 별도 이미지 최적화 설계가 필요하다.

## 검증과 남은 제한

- vinext 정적 호환성 검사: 지원 항목 11개, 정적 문제 0개. 전체 런타임 호환성을 보장하지 않는다.
- Cloudflare용 빌드 성공, 로컬 workerd 실행 성공.
- 저장된 테스트 초안 2블록을 재조회하고 인증된 상세에서 자유 HTML·CSS 원본 일치 확인. 공개본 없음, 일반 요청 404.
- 자유 블록은 현재 코드 텍스트 표시다. 실제 앱의 sandbox 렌더러·모바일 높이 연결은 미구현이며 기존 prototype 실증과 구분한다.
- Studio 브라우저 로그인·편집은 사용자가 기존 Next 로컬 화면에서 수행했다. Worker에서 Studio 편집·공개 후 수정·미리보기 실시간 갱신은 미검증.
- 후속 보안 수정과 두 빌드/CMS 재검증 완료. npm audit 19항목(중간4/높음15), 직접 원인은 수정판 없는 braces/sprintf-js 2개. 상세는 SECURITY_AUDIT.md. 강제 다운그레이드·경고 숨김 미수행.
- Next와 vinext가 같은 .next 타입 파일을 생성한다. typecheck는 next typegen을 먼저 실행해 충돌을 복구한다. 두 도구의 빌드를 동시에 실행하지 않는다.
- 빌드 경고(rxjs import 최적화, 큰 Studio 청크 등)가 남았다. 로컬 HTTP 실증 통과와 별개로 운영 화면 성능·의존성 검토가 필요하다.

재검증:
```powershell
npm run typecheck
npm test
npx --no-install tsx scripts/check-cms.ts
$env:CMS_CHECK_BASE_URL='http://127.0.0.1:8787'
npx --no-install tsx scripts/check-cms.ts
```
이 스크립트는 fixture=true 테스트 문서를 읽기만 한다. CMS를 수정·공개하지 않으며 비밀 값·원본 콘텐츠·쿠키를 출력하지 않는다.
