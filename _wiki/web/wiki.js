const dialog=document.querySelector('#search-dialog');
const input=document.querySelector('#search-input');
const results=document.querySelector('#search-results');
const status=document.querySelector('#search-status');
let index=null,queryVersion=0;
const normalize=s=>s.toLocaleLowerCase('en').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function openSearch(){dialog.showModal();input.focus();}
document.querySelector('#search-open').addEventListener('click',openSearch);
document.querySelector('#search-close').addEventListener('click',()=>dialog.close());
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!dialog.open)openSearch();}});
input.addEventListener('input',async()=>{
 const version=++queryVersion,query=normalize(input.value.trim());results.replaceChildren();
 if(!query){status.textContent='Enter a search term to search all articles.';return;}
 status.textContent='Searching …';
 try{if(!index){const response=await fetch('search.json',{cache:'no-store'});if(!response.ok)throw new Error();index=await response.json();}
 if(version!==queryVersion)return;
 const terms=query.split(/\s+/);
 const matches=index.map(p=>({...p,score:terms.every(t=>normalize(p.title+' '+p.text).includes(t))?terms.reduce((s,t)=>s+(normalize(p.title).includes(t)?10:1),0):0})).filter(p=>p.score).sort((a,b)=>b.score-a.score);
 status.textContent=`${matches.length} ${matches.length===1?'article found':'articles found'}${matches.length>20?' · showing the first 20':''}.`;
 if(!matches.length)status.textContent='No matches. Try another term, such as Health or Morale.';
 for(const page of matches.slice(0,20)){const a=document.createElement('a');a.href=page.url;const group=document.createElement('small');group.textContent=page.group;const title=document.createElement('strong');title.textContent=page.title;const text=document.createElement('p');text.textContent=page.summary;a.append(group,title,text);results.append(a);}
 }catch{status.textContent='Search could not be loaded. Reload the page or use the navigation menu.';}
});
const toggle=document.querySelector('#menu-toggle'),navigation=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){navigation.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
