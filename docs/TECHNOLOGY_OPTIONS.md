# 미확정 기술·비용 비교

공식 자료 확인일: 2026-10-01. 도입 직전에 가격·약관·기능을 다시 확인한다. 사용자에게 월 운영비 수준은 허용받았으나 서비스 선택·가입·결제는 확정되지 않았다.

## 구성 비교

| 안 | 장점 | 부담 | 상태 |
| --- | --- | --- | --- |
| Next.js + Sanity Growth + Vercel Pro + Resend | 관리형 CMS로 콘텐츠·이미지·편집 운영 부담 감소 | 자유 코드 편집, 언어별 공개, 문의함은 맞춤 구현 | 우선 검토 권장 |
| Next.js + Payload + Vercel Pro + Supabase Pro + Resend | 관리 UI·블록·데이터·이력 제어 | DB·이미지 연동, 업그레이드·보안 책임 증가 | 대안 |
| 자체 관리자 + Supabase | 자유로운 구조 | CMS 기능 재개발 부담 | 우선순위 낮음 |

Sanity Free는 공개 데이터셋만 지원하므로 비공개 자료·문의 보관에 그대로 사용하지 않는다. Growth를 예산 기준으로 둔다. Sanity 기능 제공과 이 프로젝트의 맞춤 편집 흐름 구현을 구분한다. Payload 언어별 기본 공개 상태는 확인 당시 실험적이므로 별도 상태 필드와 검증을 우선 검토한다.

공개 페이지는 캐시, 초안은 인증된 미리보기, 공개 시 해당 콘텐츠 갱신 제안. 콘텐츠 변경에 코드 재배포가 필수인 흐름을 피한다. 최종 지원 방식은 실증한다.

## 비용 스냅샷

관리자 1명·기본 포함량 내 기준, USD, 세금·환율·도메인·개발 및 유지관리 비용 별도.

| 서비스 | 기본 비용 | 포함·초과 조건 요약 |
| --- | --- | --- |
| Vercel Pro | $20/월 | 포함 사용 크레딧, 추가 사용·좌석/구성 과금 확인. Hobby는 비상업용이므로 외주 영업 사이트 예산 기준 제외 |
| Sanity Growth | $15/유료 좌석/월 | 저장 100GB·전송 100GB/월, 초과 저장 $0.50/GB·전송 $0.30/GB, API 별도 |
| Resend Free | $0 | 월 3,000통·일 100통. 알림과 회신 각각 집계 |
| Resend Pro | $20/월 | 월 50,000통, 초과 $0.90/1,000통 |
| Payload | CMS 라이선스 $0 | 호스팅·DB·파일 별도 |
| Supabase Pro | $25/월부터 | 기본 프로젝트, DB 8GB·파일 100GB, 초과·추가 프로젝트·컴퓨트 별도 |
| R2 Standard 선택 | 무료량 내 $0 | 10GB-month 무료, 이후 $0.015/GB-month, 요청 과금 별도 |
| 도메인 | 미산정 | 주소·등록기관 선택 후 신규·갱신 가격 확인 |

권장안 기본 $35/월, Resend Pro 전환 시 $55/월. Payload 대안 기본 $45/월, 이메일 유료 시 $65/월. 포함량 내 가정이며 상한 보장이 아니다. 별도 백업 저장·도메인·초과·세금 제외. 비용 알림과 제한 정책을 선택 시 설정한다. R2는 초기 필수 서비스가 아니다.

Supabase DB 백업에는 Storage 실제 파일이 포함되지 않는다. CMS 수정 이력도 독립 백업을 대신하지 않는다. 관리형 서비스라도 보안 업데이트·복구 시험·서비스 변경 대응 책임은 남는다.

## 공식 자료

- https://vercel.com/pricing
- https://www.sanity.io/pricing
- https://resend.com/pricing
- https://supabase.com/pricing
- https://supabase.com/docs/guides/platform/backups
- https://developers.cloudflare.com/r2/pricing/
- https://github.com/payloadcms/payload
- https://payloadcms.com/docs/fields/blocks
- https://payloadcms.com/docs/versions/overview
- https://payloadcms.com/docs/configuration/localization
- https://www.koddi.or.kr/ud/sub1_2
- https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe
