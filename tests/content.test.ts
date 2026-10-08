import test from "node:test";
import assert from "node:assert/strict";
import { parseProject } from "../src/content/model";
import { fixture } from "../src/fixtures/project";
test("CMS 직렬화 왕복과 원본 공백 보존", () => {
  const result = parseProject(JSON.parse(JSON.stringify(fixture)));
  assert.deepEqual(result, fixture);
  result.blocks[1].html = "수정";
  assert.notEqual(result.blocks[1].html, fixture.blocks[1].html);
});
test("외부 데이터 중복 ID와 누락 코드 거절", () => {
  const p = structuredClone(fixture);
  p.blocks[1]._key = p.blocks[0]._key;
  assert.throws(() => parseProject(p));
  const q = structuredClone(fixture);
  delete q.blocks[1].css;
  assert.throws(() => parseProject(q));
});
