export type ContentBlock = {
  _key: string;
  _type: "textBlock" | "customBlock";
  heading?: string;
  body?: string;
  html?: string;
  css?: string;
};
export type ProjectLocale = {
  _id: string;
  _type: "projectLocale";
  title: string;
  slug: { current: string };
  locale: "ko" | "en";
  fixture: boolean;
  blocks: ContentBlock[];
};
export function parseProject(value: unknown): ProjectLocale {
  if (!value || typeof value !== "object")
    throw new Error("프로젝트 데이터 오류");
  const p = value as Record<string, unknown>;
  if (
    typeof p._id !== "string" ||
    p._type !== "projectLocale" ||
    typeof p.title !== "string" ||
    !["ko", "en"].includes(String(p.locale)) ||
    typeof p.fixture !== "boolean" ||
    !p.slug ||
    typeof p.slug !== "object" ||
    typeof (p.slug as Record<string, unknown>).current !== "string" ||
    !Array.isArray(p.blocks)
  )
    throw new Error("프로젝트 형식 오류");
  const ids = new Set<string>();
  for (const item of p.blocks) {
    if (!item || typeof item !== "object") throw new Error("블록 오류");
    const b = item as Record<string, unknown>;
    if (
      typeof b._key !== "string" ||
      ids.has(b._key) ||
      !["textBlock", "customBlock"].includes(String(b._type))
    )
      throw new Error("블록 ID·종류 오류");
    ids.add(b._key);
    for (const key of b._type === "textBlock"
      ? ["heading", "body"]
      : ["html", "css"])
      if (typeof b[key] !== "string") throw new Error("블록 내용 오류");
  }
  return structuredClone(value) as ProjectLocale;
}
