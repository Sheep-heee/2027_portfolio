import Link from "next/link";
import "./study.css";
export default function Page() {
  return (
    <main className="study">
      <p>로컬 앱·CMS 연결 실증 · 공개 사이트 아님</p>
      <h1>콘텐츠 운영 준비.</h1>
      <p>전체 화면 구현 전 데이터·초안·미리보기 연결을 확인합니다.</p>
      <nav>
        <Link href="/studio">CMS 설정 확인 →</Link>
        <Link href="/ko/projects/cms-study">테스트 상세 보기 →</Link>
        <Link href="/preview">초안 미리보기 인증 →</Link>
      </nav>
    </main>
  );
}
