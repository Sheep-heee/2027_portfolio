export const labels={text:'제목·본문',image:'이미지',pair:'이미지 2열',info:'정보 목록',space:'구분·여백',link:'외부 링크',custom:'자유 HTML·CSS'};
export const assets=[{src:'assets/web.svg',label:'가로형 테스트 이미지'},{src:'assets/graphic.svg',label:'세로형 테스트 이미지'},{src:'assets/interface.svg',label:'정사각형 테스트 이미지'}];
export function createBlock(type){
 if(!Object.hasOwn(labels,type))throw new Error('지원하지 않는 블록');
 const base={id:crypto.randomUUID(),type,width:'wide',spacing:'normal'};
 const content={custom:{html:'<section class="sample"><div><h2>자유롭게 구성하는 작업 기록</h2><p>실증용 콘텐츠입니다. 좁은 화면에서는 한 열로 바뀝니다.</p></div><img src="assets/graphic.svg" alt="세로형 테스트 이미지"></section>',css:'.sample { display:grid; grid-template-columns:1fr 1fr; gap:2rem; padding:2rem; border:1px solid var(--line); }\n.sample h2 { margin:0 0 1rem; }\n@media(max-width:767px) { .sample { grid-template-columns:1fr; padding:1rem; } .sample h2 { font-size:1.5rem; } }'},text:{heading:'새 섹션 제목',body:'이곳에 프로젝트의 맥락과 작업 내용을 입력하세요.'},image:{src:assets[0].src,alt:'가로형 검토 이미지',caption:'이미지 설명',fit:'contain'},pair:{src:assets[1].src,secondSrc:assets[2].src,alt:'세로형 검토 이미지',secondAlt:'정사각형 검토 이미지',caption:'원본 비율을 유지한 이미지 2열'},info:{body:'역할: 실제 자료 등록 후 입력\n기간: 실제 자료 등록 후 입력'},space:{line:true},link:{label:'참고 자료 보기',url:'https://example.com'}};
 return {...base,...content[type]};
}
export function initialProject(){return {schemaVersion:1,title:'블록으로 구성하는 프로젝트 상세',summary:'편집·복제·순서 변경·미리보기를 확인하는 테스트 프로젝트입니다.',blocks:[createBlock('text'),createBlock('image'),createBlock('pair')]};}
export function duplicateBlock(blocks,id){const index=blocks.findIndex(b=>b.id===id);if(index<0)return blocks;const copy={...structuredClone(blocks[index]),id:crypto.randomUUID()};return [...blocks.slice(0,index+1),copy,...blocks.slice(index+1)];}
export function moveBlock(blocks,id,target){const index=blocks.findIndex(b=>b.id===id);if(index<0||target<0||target>=blocks.length)return blocks;const next=[...blocks];const [block]=next.splice(index,1);next.splice(target,0,block);return next;}
export function validateProject(value){
 if(!value||value.schemaVersion!==1||typeof value.title!=='string'||typeof value.summary!=='string'||!Array.isArray(value.blocks)||value.blocks.length>100)throw new Error('저장 형식이 올바르지 않습니다.');
 const ids=new Set();
 for(const block of value.blocks){if(!block||typeof block.id!=='string'||ids.has(block.id)||!Object.hasOwn(labels,block.type)||!['reading','wide'].includes(block.width)||!['small','normal','large'].includes(block.spacing))throw new Error('블록 형식이 올바르지 않습니다.');ids.add(block.id);const expected=createBlock(block.type);for(const [key,val] of Object.entries(expected)){if(typeof block[key]!==typeof val)throw new Error('블록 내용 형식이 올바르지 않습니다.');}for(const key of ['src','secondSrc']){if(block[key]&&!assets.some(a=>a.src===block[key]))throw new Error('허용되지 않은 이미지입니다.');}if(block.type==='image'&&!['contain','cover'].includes(block.fit))throw new Error('이미지 표시 방식이 올바르지 않습니다.');}
 return structuredClone(value);
}
