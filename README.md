# 포트폴리오 웹사이트

외주 문의와 작업 역량·경력 확인을 위한 포트폴리오 프로젝트입니다. 초기에는 한국어로 공개하며, 브라우저 콘텐츠 편집과 이후 다국어 확장을 목표로 합니다.

현재는 **실제 CMS 저장·미리보기와 Cloudflare 배포 준비 단계**입니다. 대표 시안 검토는 완료했고 Next.js/Sanity 연결 골격을 실증했습니다. 전체 사이트·문의·외부 배포는 아직 완료하지 않았습니다.

대표 시안 실행: `node prototype/server.cjs` → http://127.0.0.1:4173/review.html . 상세 안내는 [시안 README](prototype/README.md)를 참고하세요.

## 문서 안내

| 문서 | 내용 |
| --- | --- |
| [AGENTS.md](AGENTS.md) | 이후 AI 작업의 진입점과 금지·준수 사항 |
| [프로젝트 맥락](docs/PROJECT_CONTEXT.md) | 사용자 요구, 결정 상태, 참고 자료 해석 |
| [화면·디자인 설계](docs/DESIGN_SPEC.md) | 페이지, 목록, 색상, 서체, 반응형 규칙 |
| [콘텐츠·운영 설계](docs/CONTENT_AND_OPERATIONS.md) | 데이터, 블록, 자유 코드, 다국어, 문의, 백업 |
| [코드 작성 규칙](docs/CODE_GUIDELINES.md) | 직접 커스텀하기 쉬운 구현·변경 규칙 |
| [코드 구조 명세](docs/CODE_STRUCTURE_SPEC.md) | 시안과 실제 앱의 경계, 모델·모듈·데이터 흐름 |
| [대표 시안 검토 기록](docs/PROTOTYPE_REVIEW.md) | 화면 검토 포인트, 검증 결과, 미검증 범위 |
| [블록 편집 실증](docs/BLOCK_EDITOR_STUDY.md) | 편집·복제·순서 변경·로컬 저장·미리보기 검토 |
| [기술·비용 비교](docs/TECHNOLOGY_OPTIONS.md) | 미확정 권장 구성, 비용과 공식 자료 |
| [현재 상태](docs/STATUS.md) | 완료 사항, 다음 단계, 결정 기록 |

## 인수 자료의 범위

이 문서는 대화 맥락을 보존하는 설계 지침입니다. 아직 없는 구현이나 설정을 설명하는 실행 매뉴얼은 아닙니다. 기술 선택과 구현이 진행되면 실행·배포·환경변수·복구 절차를 실제 검증 결과에 맞춰 추가합니다. 비밀키나 계정 비밀번호를 문서에 넣지 않습니다.
# 로컬 앱·CMS 연결 실증 (2026-10-08)

승인된 prototype 시안과 별도로 루트에 Next.js/TypeScript·Sanity Studio 연결 골격을 추가했다. `npm ci` → `npm run dev` → http://127.0.0.1:3000 . 사용자가 Sanity Studio에 저장한 실제 테스트 초안 2블록을 조회하고 인증된 미리보기의 원본 코드 일치를 확인했다.

실행·환경변수·연결·검증·제한: [docs/LOCAL_CMS_SETUP.md](docs/LOCAL_CMS_SETUP.md). `.env.local`, `node_modules`, `.next`, 로컬 폰트는 Git에 포함하지 않는다. 현재 단계에서 전체 사이트·문의·배포는 구현하지 않았다.

Cloudflare 후보 경로: `npm run build:vinext` → `npm run start:vinext -- --port 8787`. 실제 로컬 Worker에서 CMS 초안 검증까지 통과했다. vinext는 베타 후보이며 원격 배포는 수행하지 않았다. 계정·비밀 값·workers.dev 연결 순서는 [배포 준비 문서](docs/CLOUDFLARE_DEPLOYMENT.md)를 따른다. `.dev.vars`, `dist`, `.wrangler`도 Git에 포함하지 않는다.
