import "server-only";
import { createClient } from "next-sanity";
import { parseProject } from "@/content/model";
import { fixture } from "@/fixtures/project";
export async function getProject(slug: string, preview: boolean) {
  const source = process.env.CONTENT_SOURCE || "fixture";
  if (source === "fixture")
    return slug === fixture.slug.current ? parseProject(fixture) : null;
  if (source !== "sanity") throw new Error("CONTENT_SOURCE 설정 오류");
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset)
    throw new Error("Sanity 프로젝트 설정이 필요합니다.");
  if (preview && !process.env.SANITY_API_READ_TOKEN)
    throw new Error("초안 읽기 토큰이 필요합니다.");
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-10-01",
    useCdn: false,
    perspective: preview ? "drafts" : "published",
    token: preview ? process.env.SANITY_API_READ_TOKEN : undefined,
  });
  const result: unknown = await client.fetch(
    '*[_type=="projectLocale" && locale=="ko" && slug.current==$slug][0]{_id,_type,title,slug,locale,fixture,blocks}',
    { slug },
    { cache: "no-store" },
  );
  return result === null ? null : parseProject(result);
}
