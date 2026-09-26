import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {marked} from './vendor/marked.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>fs.readFile(path.join(root,p),'utf8');
const config=JSON.parse(await read('site.json'));
const pages=JSON.parse(await read('content/pages.json'));
const instructionPages=JSON.parse(await read('public/images/operation-instructions/manifest.json'));
const pageImages=new Map(instructionPages.flatMap(doc=>doc.pages.map(page=>[page.image,page])));
const out=path.join(root,'..','wiki');
await fs.mkdir(out,{recursive:true});
await fs.cp(path.join(root,'public'),out,{recursive:true});
for(const name of ['wiki.css','wiki.js']) await fs.copyFile(path.join(root,'web',name),path.join(out,name));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups=['Overview','Game Design','Engineering','Operation Instructions'];
const nav=current=>groups.map(group=>`<section class="nav-group"><h2>${group}</h2>${pages.filter(p=>p.group===group).map(p=>`<a href="${p.slug}.html" ${p.slug===current?'aria-current="page"':''}>${esc(p.slug==='index'?'Home':p.title)}</a>`).join('')}</section>`).join('');
const searches=[];
for(const page of pages){
 const md=await read(`content/${page.slug}.md`);
 // Team-authored Markdown only; raw HTML is shown as text rather than executed.
 const renderer=new marked.Renderer();
 renderer.html=({text})=>esc(text);
 const defaultCode=renderer.code.bind(renderer);
 renderer.code=function(token) {
  if(token.lang==='pdf-transcript') return `<details class="pdf-transcript"><summary>Text for copying and search</summary><pre>${esc(token.text)}</pre></details>`;
  return defaultCode(token);
 };
 const defaultImage=renderer.image.bind(renderer);
 renderer.image=function(token) {
  const page=pageImages.get(token.href);
  if(!page) return defaultImage(token);
  return `<img class="original-page" src="${esc(token.href)}" alt="${esc(token.text)}" width="${page.width}" height="${page.height}" loading="lazy" decoding="async">`;
 };
 const headings=[];
 renderer.heading=function({tokens,depth}) {const label=this.parser.parseInline(tokens);const id=`abschnitt-${headings.length+1}`;headings.push({label,id,depth});return `<h${depth} id="${id}">${label}</h${depth}>`;};
 renderer.link=function({href,tokens}) {const text=this.parser.parseInline(tokens);if(!/^(https?:\/\/|mailto:|[a-zA-Z0-9_#./%-])/.test(href)||/^(javascript|data|vbscript):/i.test(href))return text;return `<a href="${esc(href)}">${text}</a>`;};
 const content=marked.parse(md,{renderer});
 const edit=config.repository?`<a class="edit" href="${esc(config.repository)}/edit/${encodeURIComponent(config.branch)}/_wiki/content/${page.slug}.md">Edit this page ↗</a>`:`<a class="edit" href="mitarbeiten.html">How to edit this wiki ↗</a>`;
 const cards=page.slug==='index'?`<div class="entry-grid"><a href="spielidee.html"><span>01 / GAME DESIGN</span><h2>Understand the game</h2><p>Systems, factions, languages and goals.</p><b>Explore game design →</b></a><a href="operation-instructions.html"><span>02 / ENGINEERING</span><h2>Put knowledge to work</h2><p>17 practical guides from our development work.</p><b>Operation Instructions →</b></a></div>`:'';
 const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="index,follow"><link rel="icon" href="feldfeste-games.svg" type="image/svg+xml"><link rel="canonical" href="https://feldfeste-games.com/wiki/${page.slug==='index'?'':page.slug+'.html'}"><meta name="description" content="${esc(page.summary)}"><title>${esc(page.title)} · Castellum Wiki</title><link rel="stylesheet" href="wiki.css"><script src="wiki.js" defer></script></head><body><a class="skip" href="#inhalt">Skip to content</a><aside class="sidebar" id="navigation"><a class="brand" href="index.html"><span class="crest" aria-hidden="true"><img src="feldfeste-games.svg" alt="" width="46" height="38"></span><span>FELDFESTE<small>GAMES STUDIO</small></span></a><div class="project-label">CASTELLUM <span>PUBLIC WIKI</span></div><nav aria-label="Main navigation">${nav(page.slug)}</nav><div class="sidebar-foot"><a href="https://feldfeste-games.com/">← Feldfeste Games</a></div></aside><div class="workspace"><header class="topbar"><button id="menu-toggle" aria-controls="navigation" aria-expanded="false">☰ <span>Menu</span></button><span class="breadcrumb">Castellum <span>/</span> ${esc(page.group)}</span><button id="search-open" aria-haspopup="dialog"><span aria-hidden="true">⌕</span> Search the wiki <kbd>Ctrl K</kbd></button><span class="team-mark"><i></i> Public wiki</span></header><main id="inhalt"><div class="page-head"><span class="eyebrow">${page.slug==='index'?'THE CASTELLUM KNOWLEDGE BASE':esc(page.group.toUpperCase())}</span><h1>${esc(page.title)}</h1><p class="lead">${esc(page.summary)}</p><div class="meta"><span class="badge ${page.status==='Source snapshot'?'':'attention'}">${esc(page.status)}</span><span>Snapshot ${config.snapshot}</span>${edit}</div></div>${cards}<div class="reading-layout"><article>${content}<footer class="source"><strong>Source reference</strong><p>${esc(page.source)}</p><p>Based on the supplied source snapshot. Changes in the current Unreal project have not been automatically verified.</p></footer></article><aside class="toc" aria-label="On this page"><h2>ON THIS PAGE</h2>${headings.filter(h=>h.depth===2).map(h=>`<a href="#${h.id}">${h.label}</a>`).join('')}<div class="toc-note">Feldfeste Games<br>Unreal Engine 5.2<br>Castellum / Castle Age</div></aside></div><footer class="page-footer">Feldfeste Games · Development &amp; modding documentation <a href="mitarbeiten.html">Contribute →</a></footer></main></div><dialog id="search-dialog" aria-labelledby="search-title"><div class="search-top"><label id="search-title" for="search-input">Search the wiki</label><button id="search-close" aria-label="Close search">✕</button></div><input id="search-input" type="search" placeholder="Health, factions, Gameplay Tags …" autocomplete="off"><p id="search-status" role="status">Enter a search term. Search covers all 33 articles.</p><div id="search-results"></div></dialog></body></html>`;
 await fs.writeFile(path.join(out,`${page.slug}.html`),html);
 searches.push({title:page.title,url:`${page.slug}.html`,group:page.group,summary:page.summary,text:md.replace(/[#*`|]/g,'')});
}
await fs.writeFile(path.join(out,'search.json'),JSON.stringify(searches));
await fs.writeFile(path.join(out,'robots.txt'),'User-agent: *\nAllow: /\n');
await fs.writeFile(path.join(out,'404.html'),'<!doctype html><html lang="en"><meta charset="utf-8"><title>Page not found</title><link rel="stylesheet" href="wiki.css"><main><h1>This page does not exist yet.</h1><a href="index.html">Back to the wiki</a></main></html>');
console.log(`Wiki built: ${pages.length} pages → ${out}`);
