# 대표 화면 디자인 시안

HTML·CSS·JavaScript로 만든 독립 검토물. 전체 사이트 구현이나 기술 선택이 아니다.

## 실행

프로젝트 루트에서 Node.js로 실행:

```sh
node prototype/server.cjs
```

- 화면 비교: http://127.0.0.1:4173/review.html
- 홈: http://127.0.0.1:4173/index.html#home
- 목록: http://127.0.0.1:4173/index.html#projects
- 상세: http://127.0.0.1:4173/index.html#detail/web
- 문의: http://127.0.0.1:4173/index.html#contact

비교 화면에서 네 화면과 모바일 360/390/768px 선택 가능. 각 iframe은 실제 해당 폭으로 렌더링한다. 데스크톱은 1440px 화면을 50% 축소 표시하며 좁은 비교 창에서는 가로 스크롤한다. 서체 크기의 최종 검토는 단독 화면에서 한다. 브라우저 너비를 바꾸면 단독 화면도 반응형으로 작동한다. 서버는 localhost만 수신한다. 종료는 실행 터미널에서 Ctrl+C.

추가 콘텐츠 변화 확인:

- `index.html?name=long#home`: 긴 한글 검토용 이름.
- `index.html?name=english#home`: 긴 영문 검토용 이름.
- `index.html?title=english#projects`: 긴 영문 프로젝트 제목.

문의는 입력 검증과 결과 안내 시연만 수행하며 저장·메일·전송하지 않는다. 공개 이메일·실제 경력·고객 자료가 없다. 자유 블록은 sandbox 배치 예시이고 코드 편집·검증·자동 높이·저장 이력 실증은 다음 단계다.

## 서체·이미지

- KoddiUD: 사용자의 Downloads에 있는 Regular/Bold/ExtraBold WOFF2를 수정 없이 복사. 공식 이용 안내: https://www.koddi.or.kr/ud/sub1_2 . 서체 자체 판매·수정 금지, 배포 전 공식 조건 재확인.
- Montserrat: Google Fonts 공식 CSS가 가리키는 Regular/Bold 파일을 저장. `assets/fonts/Montserrat-OFL.txt` 동봉.
- SVG는 이번 시안에서 직접 만든 중립 비율 테스트 이미지. 외부 레퍼런스 사진·문구 복제 없음.
- 네트워크 요청 없이 로컬 폰트와 이미지를 사용한다. `assets/montserrat.css`는 다운로드 출처 기록이며 페이지에서 로드하지 않는다.

코드 구조 명세: `../docs/CODE_STRUCTURE_SPEC.md`.
