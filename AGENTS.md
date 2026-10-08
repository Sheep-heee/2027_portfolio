# AI 작업 지침

이 저장소는 개인 포트폴리오 웹사이트 프로젝트다. 사용자가 직접 코드를 수정하고 브라우저에서 콘텐츠를 운영할 수 있어야 한다.

## 작업 시작 순서

1. `docs/PROJECT_CONTEXT.md`에서 목적, 확정 조건, 미정 사항을 읽는다.
2. `docs/DESIGN_SPEC.md`, `docs/CONTENT_AND_OPERATIONS.md`, `docs/CODE_GUIDELINES.md`에서 현재 작업과 관련된 내용을 읽는다.
3. `docs/STATUS.md`에서 실제 진행 상태와 다음 단계를 확인한다.
4. 기존 코드와 작업 중인 변경을 확인한 후 필요한 범위만 수정한다.

## 반드시 지킬 사항

- 대표 화면·서체·블록 편집·자유 코드 실증 검토는 완료했다. 2026-10-08 사용자 요청으로 현재 단계는 로컬 앱·CMS 골격과 저장·미리보기 연결 실증이다. 전체 화면 구현·공개 배포까지 승인된 것으로 해석하지 않는다. `docs/LOCAL_CMS_SETUP.md`와 `docs/STATUS.md`를 참고한다.
- 확정 요구사항과 권장안, 미정 사항을 구분한다. 문서의 제안을 사용자 승인으로 바꾸지 않는다.
- 사용자의 최신 직접 지시가 이 문서보다 우선한다. 승인된 변경은 관련 문서에도 반영한다.
- 공개 이름은 미정이다. 첨부에 나온 실명이나 회사 이름을 확정값으로 사용하지 않는다.
- 경력, 고객, 후기, 성과, 수치를 만들어 넣지 않는다. 테스트 콘텐츠는 검토용임을 명시하고 실제 데이터와 분리한다.
- 우측 사이드바를 만들지 않는다. 시계, 날씨, 기록 메뉴, 다국어 이름 표기 등 참고 이미지의 기능을 임의로 추가하지 않는다.
- 별도 포인트 컬러를 추가하지 않는다. 작은 글씨의 대비를 검증하고 요소 전체 opacity로 이미지와 글씨를 흐리지 않는다.
- CSS는 16px=1rem 기준으로 작성한다. content width·border·breakpoint만 정확한 px를 사용한다. KoddiUD 400=Regular, 500=Bold, 700=ExtraBold, 합성 굵기 금지. 상세는 `docs/CODE_GUIDELINES.md` 참조.
- KoddiBold는 사용자 테스트에 따라 정확히 1.5rem(24px) 또는 1.875rem(30px) 이상에서만 제한적으로 사용한다. 작은 UI는 Regular, 20px대 제목은 24px로 조정한다. 상세 제한은 코드 지침 참조.
- 자유 블록은 HTML·CSS를 지원하고 JavaScript는 지원하지 않는다. 사이트와 다른 블록에 영향을 주지 않도록 격리한다.
- 한국어만 초기 공개한다. 준비되지 않은 언어 메뉴를 노출하지 않는다.
- Sanity Free + Cloudflare Workers Paid + D1 + Resend Free는 2026-10-02 사용자 채택 완료. 월 $5에 사이트 호스팅 포함, 도메인·세금·초과 사용 별도. Next.js/TypeScript 방향 유지, Cloudflare 배포 어댑터는 실증 후 선택한다. 가입·유료 결제·배포·실제 문의 전송을 로컬 골격 작성 권한에 포함시키지 않는다.
- 기존 사용자 변경을 덮어쓰거나 관련 없는 파일을 정리하지 않는다.
- 사용자가 직접 커스텀할 수 있도록 단순하고 명시적인 코드 구조를 유지한다. 상세 규칙은 `docs/CODE_GUIDELINES.md`를 따른다.
- 별도 요청이나 적용되는 지침 없이 하위 에이전트를 생성하지 않는다.

## 작업 종료 시

- 실제 변경, 검증 결과, 남은 제한을 간단히 보고한다.
- `docs/STATUS.md`를 갱신한다. 수행하지 않은 테스트나 구현을 완료로 쓰지 않는다.
- 목적·요구·기술 결정이 바뀌면 관련 설계 문서와 결정 기록도 갱신한다.
- 문서 간 충돌은 숨기지 않고 기록한다. 사용자 결정을 추정해 해결하지 않는다.

## Git 버전관리

- 사용자가 Git 저장소를 구성했다. 지침 재작성과 큰 코드 변경은 Git으로 변경 이력을 관리한다.
- 작업 시작 시 현재 브랜치, 상태, 최근 이력을 확인한다. 사용자 변경과 이번 작업 변경을 구분한다.
- 큰 변경은 목적별로 검토 가능한 단위로 나눈다. 지침 변경에는 결정 근거를, 코드 변경에는 관련 문서와 검증 결과를 함께 남긴다.
- 커밋 전 diff와 포함 파일을 확인한다. 전체 파일을 무조건 스테이징하지 않고 해당 작업 파일만 포함한다.
- 사용자의 버전관리 방침을 자동 커밋·푸시 요청으로 해석하지 않는다. 커밋 요청 또는 합의된 자동 커밋 정책이 있으면 따른다.
- reset, clean, 강제 푸시, 기존 커밋 수정 등으로 사용자 작업이나 이력을 임의로 제거하지 않는다.
- 비밀키, 실제 문의·비공개 고객 자료, 환경변수 값, 빌드 산출물을 커밋하지 않는다. Git은 CMS 콘텐츠와 원본 이미지 백업을 대신하지 않는다.

기준일: 2026-10-01 (Asia/Seoul)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
