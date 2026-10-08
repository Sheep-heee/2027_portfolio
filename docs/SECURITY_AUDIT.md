# 패키지 보안 경고 분류

확인일: 2026-10-08. npm audit·npm ls·설치된 typeid-js 코드·src 검색으로 확인. 패키지와 앱 코드는 수정하지 않았다.

## 후속 수정 결과 (2026-10-08)

사용자가 수정 승인. 아래 최초 표는 수정 전 기록이며 현재 결과는 이 항목을 우선한다.

- package.json overrides 및 lockfile 갱신: @vercel/frameworks의 js-yaml 3.15.2·smol-toml 1.9.0, typeid-js의 uuid 11.1.1, sharp 0.35.5, fflate 0.7.5. 상위 Sanity·Next·vinext 버전과 콘텐츠 모델 유지.
- sharp는 범위 제한 override에서 기존 중첩 사본이 남았으므로 전역 0.35.5로 통일해 취약 사본을 제거했다. npm ls 정상 확인.
- 최종 audit 19항목(높음15/중간4/치명적0). 직접 원인은 braces/sprintf-js 2개. js-yaml 이름이 여전히 표시되는 것은 argparse/sprintf-js 하위 영향이며 수정한 YAML 취약점이 남은 것은 아니다.
- YAML safeLoad·TOML parse·TypeID 생성/UUID 변환·ZIP 압축/해제·SVG→PNG 변환 호환 확인. 타입 검사·데이터 테스트 2건·Next/Cloudflare 빌드 통과. Worker 실제 CMS 초안 인증·원본 코드 검사 통과. 이번 재검증에서 테스트 공개본 존재 관찰, 에이전트가 CMS를 수정/공개하지 않음.
- braces/sprintf-js는 공식 advisory와 최신 npm 확인 시 수정판 없음. CLI·파일 검색·빌드 경로이며 방문자 패턴/포맷 입력 기능은 없다. 경고 숨김이나 취약 소스 임의 패치는 하지 않았다. 잔여 위험·전체 번들 도달성 미증명은 남는다. 도구 교체는 별도 비교 후 결정한다.
- override는 상위 패키지가 수정판을 채택하면 제거하고 두 빌드·CMS를 재검증한다. 이번 요청의 커밋·푸시는 수행하지 않았다.

29개는 영향받는 패키지 항목 수(높음16/중간13/치명적0)다. 직접 원인은 7개 패키지의 13개 advisory이며 나머지는 상위 의존성으로 전파된 경고다.

| 원인 / 설치 버전 | 심각도 | 설치 경로와 현재 노출 판단 | 검토할 수정 |
| --- | --- | --- | --- |
| braces 3.0.3 | 높음 | Sanity CLI codegen/chokidar와 vinext 빌드 플러그인의 파일 패턴 처리. 중첩 패턴으로 프로세스 중단. 방문자 패턴 입력 경로는 발견하지 못함 | advisory 기준 수정 버전 없음. 상위 도구·입력 제한 평가 |
| js-yaml 3.13.1 | 높음 | Sanity CLI → @vercel/frameworks. YAML 객체 오염·CPU 과소비 5개 경고. 앱 YAML 업로드/파싱 없음 | 호환 3.x 수정판 검토 |
| smol-toml 1.5.2 | 높음 | 위 frameworks의 TOML 설정 탐지. 과소비/중단 3개 경고. 앱 TOML 파싱 없음. CLI 직속 1.9.0과 별개 | 상위 도구 또는 제한적 override 검토 |
| sprintf-js 1.0.3 | 중간 | 위 js-yaml → argparse. 과도한 정밀도 포맷 입력으로 자원 고갈. CLI 중심 | YAML/CLI 의존 경로와 함께 정리 |
| uuid 10.0.0 | 중간 | Sanity CLI → typeid-js. 취약 조건은 v3/v5/v6 + 사용자 버퍼. 설치된 typeid-js는 v7/stringify 사용, 해당 조건 미발견 | 후순위 호환 갱신 검토 |
| fflate 0.7.3 | 중간 | vinext → @vercel/og → satori/opentype. ZIP64 unzipSync 무한 루프. 앱 ImageResponse/ZIP 기능 없음. 운영 번들 도달성 추가 확인 필요 | 0.7.5 이상 호환 교체 검토 |
| sharp 0.35.4 | 높음 | Cloudflare Vite 플러그인 → miniflare의 로컬 이미지 처리. librsvg 메모리 오류. Next/OG의 0.35.5는 이 경고 대상 아님 | miniflare 갱신 또는 sharp 0.35.5 호환 교체 검토 |

위 판단은 정적 경로 확인이며 공격 실증·전체 호출 그래프·배포 번들 도달성 증명이 아니다. 현재 공개 HTTP 경로에서 취약 입력을 직접 전달하는 경로는 발견하지 못했지만 전체 안전성으로 해석하지 않는다.

수정 단위: ① Sanity 개발 도구(YAML/TOML 우선) ② Cloudflare 로컬 도구(sharp) ③ vinext 후보(fflate/braces). 수정판 있는 의존성부터 호환성 확인 후 두 빌드·CMS 인증 재검증 권장. braces는 상위 도구/노출 검토 필요. 사용자 수정 지시 대기.

npm 강제 수정 제안에는 sanity 5.14.1, vinext 0.2.1, wrangler 4.15.2 등 이전 버전 선택이 있어 그대로 적용하지 않는다. OpenNext 대안 역시 별도 보안·호환 검증이 필요하다.

직접 확인: `npm audit`, `npm ls braces js-yaml smol-toml sprintf-js uuid fflate sharp --all`.

근거:
- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- https://github.com/advisories/GHSA-2883-xcg3-v3hh
- https://github.com/advisories/GHSA-r4xh-jqrq-34v2
- https://github.com/advisories/GHSA-hp3w-g68c-fv3c
- https://github.com/advisories/GHSA-w5hq-g745-h8pq
- https://github.com/advisories/GHSA-px8p-9vwx-vf98
- https://github.com/advisories/GHSA-wq5f-xc86-pv6w
