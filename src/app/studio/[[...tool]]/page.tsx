import Studio from "@/sanity/StudioLoader";
import "../../study.css";
export default function Page() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (!projectId || !dataset)
    return (
      <main className="study">
        <h1>CMS 프로젝트 연결 대기</h1>
        <p>
          Sanity 프로젝트는 아직 만들지 않았습니다. 실제 저장이 가능한 상태가
          아닙니다.
        </p>
        <ol>
          <li>사용자 소유 Sanity Free 프로젝트 생성</li>
          <li>public dataset 생성 · 공개 가능한 작업 자료만 등록</li>
          <li>.env.local에 Project ID와 dataset 설정</li>
          <li>Sanity에서 localhost:3000 CORS 허용 및 로그인</li>
        </ol>
        <a href="/">연결 실증 홈</a>
      </main>
    );
  return <Studio projectId={projectId} dataset={dataset} />;
}
