import assert from "node:assert/strict";
import { createClient } from "next-sanity";
import { parseProject } from "../src/content/model";

async function main() {
process.loadEnvFile(".env.local");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN;
const secret = process.env.PREVIEW_SECRET;
assert.ok(projectId && dataset && token && secret, "CMS 로컬 설정 필요");
const query = '*[_type=="projectLocale" && locale=="ko" && slug.current==$slug][0]{_id,_type,title,slug,locale,fixture,blocks}';
const client = createClient({projectId,dataset,token,apiVersion:"2026-10-01",useCdn:false,perspective:"drafts"});
const slug = process.argv[2] || "cms-study";
const saved = parseProject(await client.fetch(query,{slug}));
assert.ok(saved.fixture, "이 검증은 테스트 문서에만 사용합니다.");
assert.deepEqual(parseProject(await client.fetch(query,{slug})),saved);
const base = process.env.CMS_CHECK_BASE_URL || "http://127.0.0.1:3000";
const auth = await fetch(base+"/api/preview",{method:"POST",body:new URLSearchParams({secret,slug}),redirect:"manual"});
assert.equal(auth.status,303);
const cookie = auth.headers.get("set-cookie");
assert.ok(cookie);
const response = await fetch(base+"/ko/projects/"+slug,{headers:{cookie}});
assert.equal(response.status,200);
const html = await response.text();
assert.ok(html.includes("인증된 초안 미리보기"));
const escape = (s:string)=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
for(const block of saved.blocks)if(block._type==="customBlock"){
 assert.ok(html.includes(escape(block.html!)),"HTML 원본이 상세에 일치해야 합니다.");
 assert.ok(html.includes(escape(block.css!)),"CSS 원본이 상세에 일치해야 합니다.");
}
const published = await client.withConfig({token:undefined,perspective:"published"}).fetch(query,{slug});
const publicResponse = await fetch(base+"/ko/projects/"+slug);
assert.equal(publicResponse.status,published?200:404);
console.log(`Sanity 저장 재조회·원본 코드·실제 초안 미리보기 통과: ${saved.blocks.length}블록, 공개본 ${published?"있음":"없음"}`);
// Do not print source content, tokens, cookies, or preview URLs with secrets.
}
main().catch((error:unknown)=>{console.error("CMS 검증 실패:",error instanceof Error?error.message.split("\n")[0]:"설정 확인 필요");process.exitCode=1;});
