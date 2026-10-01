// Source is stored unchanged. Only the separate render document is validated.
const tags=new Set('div section article header footer h1 h2 h3 h4 p span strong em br hr figure figcaption img ul ol li dl dt dd a table thead tbody tr th td details summary'.split(' '));
export function validateCustom(html,css){
 const doc=new DOMParser().parseFromString(html,'text/html');
 for(const el of doc.querySelectorAll('*')){
  if(['HTML','HEAD','BODY'].includes(el.tagName))continue;
  if(!tags.has(el.localName))throw new Error(`지원하지 않는 HTML: ${el.localName}`);
  for(const attr of el.attributes){
   if(!['class','id','alt','title','src','href','colspan','rowspan','open','role'].includes(attr.name)&&!attr.name.startsWith('aria-'))throw new Error(`지원하지 않는 속성: ${attr.name}`);
   if(attr.name==='src'&&!['assets/web.svg','assets/graphic.svg','assets/interface.svg'].includes(attr.value))throw new Error('이미지는 제공된 테스트 이미지 경로만 지원합니다.');
   if(attr.name==='href'&&!/^https?:\/\//i.test(attr.value))throw new Error('링크는 http/https 주소만 지원합니다.');
  }
 }
 if(doc.head.children.length||/<\/?(?:html|head|body)\b/i.test(html))throw new Error('문서 전체 대신 본문 HTML을 입력하세요.');
 if(/<\/style|@import|@font-face|url\s*\(|\\/i.test(css))throw new Error('CSS의 외부 리소스·이스케이프·style 종료 태그는 지원하지 않습니다.');
 const sheet=new CSSStyleSheet();sheet.replaceSync(css);
 for(const img of doc.querySelectorAll('img'))img.src=new URL(img.getAttribute('src'),location.href).href;
 return doc.body.innerHTML;
}
export function mountCustom(section,block){
 let html;try{html=validateCustom(block.html,block.css);}catch(error){section.textContent=`자유 블록 미리보기 중지: ${error.message} 원본 코드는 저장할 수 있습니다.`;return;}
 const frame=document.createElement('iframe');frame.title='자유 HTML·CSS 블록';frame.setAttribute('sandbox','allow-scripts');frame.style.cssText='width:100%;height:1rem;border:0;display:block';
 const token=crypto.randomUUID();const nonce=crypto.randomUUID().replaceAll('-','');const origin=location.origin;
 // Opaque sandbox + nonce CSP permits only our height bridge, never authored JS.
 const tokens=getComputedStyle(document.documentElement);const values=['--bg','--ink','--muted','--line','--wash','--font-ko','--font-ko-bold','--font-ko-extra','--font-en','--space'].map(k=>`${k}:${tokens.getPropertyValue(k)};`).join('');
 const fonts=[['KoddiRegular','Regular',400],['KoddiBold','Bold',500],['KoddiExtraBold','ExtraBold',700]].map(([family,file,weight])=>`@font-face{font-family:${family};src:url('${origin}/assets/fonts/KoddiUDOnGothic-${file}.woff2') format('woff2');font-weight:${weight};font-display:swap}`).join('')+[400,700].map(weight=>`@font-face{font-family:Montserrat;src:url('${origin}/assets/fonts/Montserrat-${weight===400?'Regular':'Bold'}.ttf');font-weight:${weight};font-display:swap}`).join('');
 const bridge=`const root=document.getElementById('custom-root');let last=0;function measure(){const h=Math.ceil(root.getBoundingClientRect().height);if(h!==last){last=h;parent.postMessage({type:'custom-height',token:'${token}',height:h},'*')}}new ResizeObserver(measure).observe(root);document.fonts.ready.then(measure);document.addEventListener('load',measure,true);document.addEventListener('click',e=>{if(e.target.closest('a'))e.preventDefault()});measure();`;
 frame.srcdoc=`<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}'; style-src 'unsafe-inline'; img-src ${origin}; font-src ${origin}; connect-src 'none'; base-uri 'none'; form-action 'none'"><style>${fonts}:root{${values}font-size:16px}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:400 1rem/1.7 var(--font-ko);font-synthesis:none}#custom-root{display:flow-root;overflow-wrap:anywhere}h1,h2,h3,h4{font-family:var(--font-ko-bold);font-weight:500;font-size:1.875rem}img{max-width:100%;height:auto}a{color:inherit}${block.css}</style></head><body><div id="custom-root">${html}</div><script nonce="${nonce}">${bridge}</script></body></html>`;
 const handler=event=>{if(event.source!==frame.contentWindow||event.origin!=='null'||event.data?.token!==token||event.data?.type!=='custom-height')return;const h=event.data.height;if(typeof h!=='number'||!Number.isFinite(h))return;frame.style.height=`${Math.max(16,Math.min(h,20000))/16}rem`;frame.dataset.measuredHeight=String(h);};
 window.addEventListener('message',handler);section.append(frame);
 return ()=>window.removeEventListener('message',handler);
}
