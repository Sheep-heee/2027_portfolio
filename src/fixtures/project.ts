import type { ProjectLocale } from "../content/model";
export const fixture: ProjectLocale = {
  _id: "fixture-project-ko",
  _type: "projectLocale",
  locale: "ko",
  fixture: true,
  title: "CMS 연결을 검토하는 테스트 프로젝트",
  slug: { current: "cms-study" },
  blocks: [
    {
      _key: "intro",
      _type: "textBlock",
      heading: "저장과 미리보기의 경계",
      body: "실제 경력·고객 자료가 아닌 연결 검토용 콘텐츠입니다.",
    },
    {
      _key: "custom",
      _type: "customBlock",
      html: "<!-- 원본 보존 검토 -->\n<section><h2>자유 블록</h2></section>\n",
      css: "/* 원본 보존 검토 */\nsection { padding:1rem; }\n",
    },
  ],
};
