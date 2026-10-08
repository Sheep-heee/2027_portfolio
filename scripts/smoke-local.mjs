// Run only against the local study server. Secret is read locally, never printed.
import assert from "node:assert/strict";
import fs from "node:fs";
const base = "http://127.0.0.1:3000";
for (const [path, needle] of [
  ["/", "콘텐츠 운영 준비"],
  ["/studio", "CMS 프로젝트 연결 대기"],
  ["/ko/projects/cms-study", "검토용 테스트 콘텐츠"],
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  assert.ok((await response.text()).includes(needle));
}
const authenticate = (secret, slug) =>
  fetch(base + "/api/preview", {
    method: "POST",
    body: new URLSearchParams({ secret, slug }),
    redirect: "manual",
  });
assert.equal((await authenticate("incorrect", "cms-study")).status, 401);
assert.equal((await fetch(base + "/ko/projects/missing")).status, 404);
const secret =
  process.env.PREVIEW_SECRET ||
  fs.readFileSync(".env.local", "utf8").match(/^PREVIEW_SECRET=(.+)$/m)?.[1];
assert.ok(secret, "로컬 PREVIEW_SECRET 필요");
const invalid = await authenticate(secret, "https://example.com");
assert.equal(invalid.status, 400);
const response = await authenticate(secret, "cms-study");
assert.equal(response.status, 303);
assert.equal(
  new URL(response.headers.get("location")).pathname,
  "/ko/projects/cms-study",
);
const cookie = response.headers.get("set-cookie");
assert.ok(cookie?.includes("__prerender_bypass="));
const draft = await fetch(base + "/ko/projects/cms-study", {
  headers: { cookie },
});
assert.ok((await draft.text()).includes("인증된 초안 미리보기"));
const exit = await fetch(base + "/api/preview/disable", {
  headers: { cookie },
  redirect: "manual",
});
assert.equal(exit.status, 307);
console.log(
  "로컬 HTTP 검증 통과: 홈·CMS 안내·상세·401·404·외부 주소 차단·초안 쿠키·종료",
);
