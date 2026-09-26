import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=new URL('../../wiki/',import.meta.url);
test('all generated internal links resolve, including PDFs and heading anchors',async()=>{
 const names=await fs.readdir(root);let count=0;
 for(const name of names.filter(n=>n.endsWith('.html'))){const html=await fs.readFile(new URL(name,root),'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){const ref=match[1];if(/^(https?:|mailto:)/.test(ref))continue;const [file,anchor]=ref.split('#');const target=file?decodeURIComponent(file).replace(/^\//,''):name;assert.ok(!target.includes('..'));let data;try{data=await fs.readFile(new URL(target,root));}catch{assert.fail(`${name}: missing ${target}`);}if(anchor&&target.endsWith('.html'))assert.ok(data.toString().includes(`id="${anchor}"`),`${name}: missing #${anchor}`);count++;}}
 assert.ok(count>100);
});
test('search index contains all articles and key concepts',async()=>{const index=JSON.parse(await fs.readFile(new URL('search.json',root),'utf8'));assert.equal(index.length,33);for(const term of ['HealthComponent','Piercing','Middle High German','Gameplay Tags'])assert.ok(index.some(p=>(p.text+p.title).includes(term)),term);});
test('PDF originals are present and valid PDF files',async()=>{for(let i=1;i<=17;i++){const data=await fs.readFile(new URL(`originals/FF-OI-${String(i).padStart(2,'0')}.pdf`,root));assert.equal(data.subarray(0,5).toString(),'%PDF-');}});
