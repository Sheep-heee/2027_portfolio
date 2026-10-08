import { defineField, defineType } from "sanity";
export const schemaTypes = [
  defineType({
    name: "textBlock",
    title: "제목·본문",
    type: "object",
    fields: [
      defineField({
        name: "heading",
        title: "제목",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "body",
        title: "본문",
        type: "text",
        validation: (r) => r.required(),
      }),
    ],
  }),
  defineType({
    name: "customBlock",
    title: "자유 HTML·CSS",
    type: "object",
    description:
      "원본 문자열 보존. 사용자 JavaScript 금지. 현재 공개용 검증·격리 렌더러는 연결 전입니다.",
    fields: [
      defineField({
        name: "html",
        title: "HTML 원본",
        type: "text",
        rows: 12,
        validation: (r) => r.required(),
      }),
      defineField({
        name: "css",
        title: "CSS 원본",
        type: "text",
        rows: 12,
        validation: (r) => r.required(),
      }),
    ],
  }),
  defineType({
    name: "projectLocale",
    title: "프로젝트 · 언어별 연결 실증",
    type: "document",
    description:
      "현재 연결 검토용 단순 모델. 운영 공유 구조·이미지·언어별 공개 스냅샷은 후속 단계.",
    fields: [
      defineField({
        name: "title",
        title: "제목",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "slug",
        title: "주소",
        type: "slug",
        options: { source: "title" },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "locale",
        title: "언어",
        type: "string",
        initialValue: "ko",
        options: {
          list: [
            { title: "한국어", value: "ko" },
            { title: "영어 · 구조 검토 전용", value: "en" },
          ],
        },
        validation: (r) => r.required(),
      }),
      defineField({
        name: "fixture",
        title: "검토용 테스트 콘텐츠",
        type: "boolean",
        initialValue: true,
        validation: (r) => r.required(),
      }),
      defineField({
        name: "blocks",
        title: "본문 블록",
        type: "array",
        of: [{ type: "textBlock" }, { type: "customBlock" }],
        validation: (r) => r.required(),
      }),
    ],
  }),
];
