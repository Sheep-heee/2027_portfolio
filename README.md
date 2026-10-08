# 포트폴리오 웹사이트

외주 문의와 작업 역량·경력 확인을 위한 포트폴리오 프로젝트입니다. 초기에는 한국어로 공개하며, 브라우저 콘텐츠 편집과 이후 다국어 확장을 목표로 합니다.

현재는 **대표 화면 검토 단계**입니다. 독립적인 디자인 시안이 있으며 전체 애플리케이션, 배포 환경, 서비스 계정은 아직 구성하지 않았습니다.

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

승인된 prototype 시안과 별도로 루트에 Next.js/TypeScript·Sanity Studio 연결 골격을 추가했다. `npm install` → `npm run dev` → http://127.0.0.1:3000 . 현재는 읽기 전용 테스트 콘텐츠이며 실제 Sanity 저장은 프로젝트 준비 후 검증한다.

실행·환경변수·연결·검증·제한: [docs/LOCAL_CMS_SETUP.md](docs/LOCAL_CMS_SETUP.md). `.env.local`, `node_modules`, `.next`, 로컬 폰트는 Git에 포함하지 않는다. 현재 단계에서 전체 사이트·문의·배포는 구현하지 않았다.
