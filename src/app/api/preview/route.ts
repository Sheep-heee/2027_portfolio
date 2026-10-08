import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { getProject } from "@/services/sanity";
export async function POST(request: Request) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin)
    return new Response("요청 출처 오류", { status: 403 });
  const form = await request.formData();
  const secret = String(form.get("secret") || "");
  const expected = process.env.PREVIEW_SECRET || "";
  const a = Buffer.from(secret),
    b = Buffer.from(expected);
  if (!expected || a.length !== b.length || !timingSafeEqual(a, b))
    return new Response("미리보기 인증 실패", { status: 401 });
  const slug = String(form.get("slug") || "");
  if (!/^[a-z0-9-]+$/.test(slug))
    return new Response("주소 오류", { status: 400 });
  const project = await getProject(slug, true);
  if (!project) return new Response("프로젝트 없음", { status: 404 });
  (await draftMode()).enable();
  return NextResponse.redirect(
    new URL(`/ko/projects/${slug}`, url.origin),
    303,
  );
}
