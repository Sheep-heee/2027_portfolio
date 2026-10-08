import "../study.css";
export default function Page() {
  return (
    <main className="study">
      <h1>초안 미리보기 인증</h1>
      <p>로컬 연결 실증용입니다. 비밀 값은 URL에 넣지 않고 전송합니다.</p>
      <form method="post" action="/api/preview">
        <p>
          <label htmlFor="secret">로컬 미리보기 비밀 값</label>
          <br />
          <input
            id="secret"
            name="secret"
            type="password"
            required
            autoComplete="off"
          />
        </p>
        <p>
          <label htmlFor="slug">프로젝트 주소</label>
          <br />
          <input
            id="slug"
            name="slug"
            defaultValue="cms-study"
            required
            pattern="[a-z0-9-]+"
          />
        </p>
        <button type="submit">초안 미리보기 열기</button>
      </form>
      <a href="/">실증 홈</a>
    </main>
  );
}
