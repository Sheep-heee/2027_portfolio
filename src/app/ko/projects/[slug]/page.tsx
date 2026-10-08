import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/services/sanity";
import "../../../study.css";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const p = await getProject(slug, isEnabled);
  if (!p) notFound();
  return (
    <main className="study">
      <Link href="/">← 연결 실증 홈</Link>
      <p>
        {p.fixture ? "검토용 테스트 콘텐츠 · " : ""}
        {isEnabled ? "인증된 초안 미리보기" : "공개본 조회 모드"} · 공개 사이트
        아님
      </p>
      <h1>{p.title}</h1>
      {p.blocks.map((b) => (
        <section key={b._key}>
          {b._type === "textBlock" ? (
            <>
              <h2>{b.heading}</h2>
              <p>{b.body}</p>
            </>
          ) : (
            <>
              <h2>자유 코드 원본 확인</h2>
              <p>
                이 단계에서는 안전한 텍스트로 표시합니다. 격리 렌더링은 기존
                실증 화면에서 확인합니다.
              </p>
              <pre>{b.html}</pre>
              <pre>{b.css}</pre>
            </>
          )}
        </section>
      ))}
      {isEnabled && <a href="/api/preview/disable">초안 미리보기 종료</a>}
    </main>
  );
}
