# 코드 구조 명세 · 대표 시안 이후 구현 기준

작성일: 2026-10-01. 2026-10-08 갱신: Next.js/TypeScript + Sanity Free 로컬 연결 실증 골격을 작성한다. Workers 배포 어댑터와 전체 운영 스키마는 실증 후 결정한다.

## 현재 시안과 실제 앱의 경계

`prototype/`은 설치가 필요 없는 HTML·CSS·JavaScript 디자인 검토물이다. hash 주소와 메모리 fixture를 사용한다. 전체 앱의 구조로 그대로 확장하지 않는다. CMS·로그인·실제 문의·메일·백업·배포가 없다. 사용자 작성 JavaScript를 지원하지 않는 요구와 시안의 UI 동작용 JavaScript는 별개다.

검토 엔트리: `prototype/review.html`, 실제 반응형 화면: `prototype/index.html`.

2단계 편집 실증은 `prototype/editor.html`로 분리되어 있다. `block-model.mjs`가 블록 구조·복제·이동·검증, `editor.mjs`가 편집·로컬 저장, `editor-preview.mjs`가 안전한 DOM 렌더링을 담당한다. 실증 localStorage를 운영 CMS 저장소로 가정하지 않는다. 상세는 `docs/BLOCK_EDITOR_STUDY.md` 참조.

| 시안 파일 | 책임 | 실제 앱으로 옮길 개념 |
| --- | --- | --- |
| styles.css | 토큰·폰트·레이아웃·반응형 | 토큰과 컴포넌트별 CSS Modules |
| fixtures.js | 명시적인 검토용 프로젝트 | fixture 전용 모듈, 운영 데이터와 분리 |
| app.js | 화면 조합·필터·메뉴·문의 시연 | 페이지·기능 컴포넌트로 분리 |
| free-block.html | sandbox 문서의 배치 예시 | 검증된 별도 문서 렌더러 |
| assets/*.svg | 자체 제작 비율 테스트 이미지 | 운영 asset과 분리 |
| server.cjs | localhost 정적 검토 서버 | 운영 서버로 사용하지 않음 |

현재 HTML 문자열 렌더링은 고정 fixture 전용이다. CMS·사용자 데이터를 문자열 보간해 innerHTML에 넣는 구현으로 복사하지 않는다.

## 권장 앱 구조 (Next.js 선택 시)

```text
src/
  app/[locale]/
    layout.tsx
    page.tsx
    projects/page.tsx
    projects/[slug]/page.tsx
    about/page.tsx
    contact/page.tsx
    privacy/page.tsx
  app/api/contact/route.ts
  components/layout/{Header,MobileMenu,Footer,Container}.tsx
  components/ui/{TextLink,Field,StatusMessage}.tsx
  features/home/{HomeHero,SelectedProjects,ServiceOverview}.tsx
  features/projects/{ProjectGrid,ProjectCard,CategoryFilter}.tsx
  features/contact/{ContactForm,contact-schema,contact-service}.ts(x)
  blocks/{BlockRenderer,TextBlock,ImageBlock,ImagePairBlock,CustomBlock}.tsx
  content/{models,project-repository,site-repository}.ts
  content/adapters/             # 선택한 CMS 연결
  services/{mail,media,notifications}/
  i18n/{locales,dictionaries}/
  styles/{tokens,fonts,globals}.css
  fixtures/projects.ts
```

괄호가 있는 확장자와 복수 파일 표기는 설명용이다. 빈 구조만 먼저 대량 생성하지 않는다. CMS 고유 schema·관리 설정은 별도 디렉터리로 두고 채택 서비스에 맞춰 배치한다.

## 타입과 책임 경계

```ts
type Locale = 'ko' | 'en';
type PublicationState = 'draft' | 'reviewed' | 'published';
type CategoryId = 'graphic' | 'web' | 'uiux' | 'frontend';
type Localized<T> = Partial<Record<Locale, T>>;

interface ProjectTranslation {
  title: string;
  summary?: string;
  role?: string;
  publication: PublicationState;
  seo: { title?: string; description?: string };
}

interface AssetReference {
  id: string;
  width: number;
  height: number;
  fit: 'contain' | 'cover';
  focalPoint?: { x: number; y: number }; // 0~1로 정규화한 값
  alt: Localized<string>;
}

interface BlockBase {
  id: string;
  width: 'reading' | 'wide' | 'full';
  spacing: 'small' | 'normal' | 'large';
}

type ProjectBlock =
  | (BlockBase & { type: 'text'; text: Localized<StructuredText> })
  | (BlockBase & { type: 'image'; asset: AssetReference; caption: Localized<string> })
  | (BlockBase & { type: 'imagePair'; assets: [AssetReference, AssetReference] })
  | (BlockBase & { type: 'custom'; html: Localized<string>; css: string;
      localeCss: Localized<string>; sourceVersion: number });

interface Project {
  id: string;
  slug: string;
  categories: CategoryId[];
  order?: number;
  featured: boolean;
  period?: { start?: string; end?: string };
  thumbnail: AssetReference;
  translations: Localized<ProjectTranslation>;
  blocks: ProjectBlock[];
  schemaVersion: number;
}
```

위 `StructuredText`는 채택 CMS의 리치텍스트를 표시 모델로 변환하기 위한 미정 설계 타입이다. 구현된 타입으로 사용하지 않는다. 나머지 기본 블록도 채택 시 같은 판별 가능한 union에 추가한다.

## 조회·공개 흐름

- 서버 repository: `listPublishedProjects(locale, category, cursor)`와 `getPublishedProject(locale, slug)`.
- 미리보기는 별도 인증 경계의 `getPreviewProject`로 읽는다. 공개 repository에서 초안 fallback 금지.
- 화면은 CMS 응답이 아니라 검증·정규화한 표시 모델을 받는다.
- 분야 ID는 고정 키, 표시 이름은 언어 사전. 이미지·블록 ID는 언어별 재생성 금지.
- 공개본 스냅샷과 편집 초안은 분리. 언어 공개 시 해당 언어 페이지·목록 캐시 갱신.
- 공유 구조 수정이 다른 언어의 공개본을 즉시 바꾸지 않도록 공개 revision 구조를 실증한다.
- 필터는 URL query에 보관하고 상세 복귀 시 필터·스크롤을 복원. 더 보기는 cursor 방식 제안.
- 운영 빌드에서 검토 fixture가 공개 경로에 들어가지 않도록 환경 및 데이터 경계 검증.

## 블록 렌더링

- `BlockRenderer`는 type별 렌더러만 선택. CMS 접근이나 스타일 문자열 생성 책임을 갖지 않는다.
- 공통 폭·간격은 wrapper, 내용별 배치는 block renderer가 담당.
- 자유 코드 source는 저장부터 내보내기까지 원문 보존. 렌더링 시 별도 parser·허용 목록 검증.
- `CustomBlock`은 승인된 토큰과 폰트 참조를 주입한 격리 문서를 렌더링. 사용자 스크립트·이벤트·외부 import 불허.
- 높이 자동 맞춤·정적 높이 대안·검색·접근성은 다음 실증 과제. 현재 시안은 화면별 고정 높이로 예시만 제공.

## 문의 처리 상태

`editing → submitting → received` 또는 `failed`로 구분. notification 상태는 별도 `pending / sent / failed`로 관리한다.

- 서버가 입력·스팸·동의·idempotency key를 확인하고 비공개 저장 후 접수 응답.
- 메일 알림은 저장 결과와 분리, 실패 시 재시도·중복 방지.
- 실제 저장 실패·통신 불확실성은 내용 유지, 성공 안내 금지.
- 운영 모듈은 개인정보의 저장소·보관 기간·삭제 정책을 확정한 후 구현.
- 시안의 scenario select는 검토 도구이며 실제 폼에 포함하지 않는다.

## 커스텀 안내

| 변경 | 수정 경계 |
| --- | --- |
| 색·간격·서체 | styles 토큰·폰트 |
| 이름·소개·연락처 | 사이트 설정, 번역 데이터 |
| 카드 정보 | ProjectCard + 표시 모델 |
| 새 블록 | 타입·CMS schema·renderer·미리보기·내보내기 |
| 언어 추가 | locale·UI 사전·공개 정책·URL·검색 metadata |
| CMS 교체 | adapter·schema migration, 화면 책임 유지 |
| 문의 공급자 교체 | 저장/메일 adapter, 상태 계약 유지 |

## 실제 구현 전 합의할 사항

대표 화면 디자인, 서비스 선택, 비공개 데이터와 문의 보관 정책, 관리자 인증, 자유 블록의 높이·접근성 처리. 승인되지 않은 설계를 자동 확정하지 않는다.

3단계 자유 코드 실증은 `custom-block.mjs`에서 입력 검증·격리 문서·공통 토큰·높이 브리지를 담당한다. 원본 모델과 렌더링을 분리하며 상세 제한은 `docs/CUSTOM_BLOCK_STUDY.md` 참조. 운영 CMS나 서버 검증은 미구현이다.
