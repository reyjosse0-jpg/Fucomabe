const pic='<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="m21 16-5-5-8 8"/></svg>';
const GALG=[{"t": "Día del niño", "a": ["img/foto-032.jpg", "img/foto-033.jpg", "img/foto-034.jpg", "img/foto-035.jpg", "img/foto-036.jpg", "img/foto-037.jpg", "img/foto-038.jpg", "img/foto-039.jpg", "img/foto-040.jpg", "img/foto-041.jpg", "img/foto-042.jpg", "img/foto-043.jpg", "img/foto-044.jpg", "img/foto-045.jpg", "img/foto-046.jpg"]}, {"t": "Día del profesor", "a": ["img/foto-047.jpg", "img/foto-048.jpg", "img/foto-049.jpg", "img/foto-050.jpg", "img/foto-051.jpg", "img/foto-052.jpg", "img/foto-053.jpg", "img/foto-054.jpg", "img/foto-055.jpg", "img/foto-056.jpg", "img/foto-057.jpg", "img/foto-058.jpg", "img/foto-059.jpg", "img/foto-060.jpg", "img/foto-061.jpg"]}, {"t": "Afrocolombianidad", "a": ["img/foto-062.jpg", "img/foto-063.jpg", "img/foto-064.jpg", "img/foto-065.jpg", "img/foto-066.jpg", "img/foto-067.jpg", "img/foto-068.jpg", "img/foto-069.jpg", "img/foto-070.jpg", "img/foto-071.jpg", "img/foto-072.jpg", "img/foto-073.jpg", "img/foto-074.jpg", "img/foto-075.jpg", "img/foto-076.jpg", "img/foto-077.jpg"]}, {"t": "Campeonatos de fútbol", "a": ["img/foto-078.jpg", "img/foto-079.jpg", "img/foto-080.jpg", "img/foto-081.jpg", "img/foto-082.jpg"]}, {"t": "Banda marcial", "a": ["img/foto-083.jpg", "img/foto-084.jpg", "img/foto-085.jpg"]}, {"t": "SENA", "a": ["img/foto-086.jpg", "img/foto-087.jpg", "img/foto-088.jpg", "img/foto-089.jpg", "img/foto-090.jpg", "img/foto-091.jpg"]}];
gal.className='';
gal.innerHTML=GALG.map(g=>`<h3 class="gal-t">${g.t}</h3><div class="grid g3">`+g.a.map((src,k)=>`<label class="ph has" style="background-image:url(${src})"><span>${g.t} ${k+1}</span><input type="file" accept="image/*" aria-label="Cambiar foto ${g.t} ${k+1}"></label>`).join('')+`</div>`).join('');

/* Tipos de actividades con fotos */
const JUEGOS=["img/foto-092.jpg","img/foto-093.jpg","img/foto-094.jpg","img/foto-095.jpg","img/foto-096.jpg"];
const gi=t=>(GALG.find(g=>g.t===t)||{a:[]}).a;
const ACT=[
 {t:'Afrocolombianidad',d:'Celebramos la herencia afro con danza, música y tradición.',a:gi('Afrocolombianidad')},
 {t:'Día del niño',d:'Una jornada de juego y alegría para nuestros estudiantes.',a:gi('Día del niño')},
 {t:'Día del maestro',d:'Reconocemos y agradecemos la labor de nuestros docentes.',a:gi('Día del profesor')},
 {t:'Juegos Supérate',d:'Deporte y competencia sana con los Juegos Supérate.',a:JUEGOS}];
actGrid.innerHTML=ACT.map(c=>`<article class="card"><label class="ph sm has" style="background-image:url(${c.a[0]||''})"><span>${c.t}</span><input type="file" accept="image/*" aria-label="Cambiar foto: ${c.t}"></label><div class="act-th">${c.a.slice(1,4).map(x=>`<i style="background-image:url(${x})"></i>`).join('')}</div><div class="body"><h3>${c.t}</h3><p>${c.d}</p></div></article>`).join('');
/* Vista previa de fotos (solo en este navegador) */
document.addEventListener('change',e=>{const i=e.target;if(i.type!=='file'||!i.files[0])return;const u=`url(${URL.createObjectURL(i.files[0])})`;
  if(i.closest('.bgph')){i.closest('.bgph').style.setProperty('--img',u);return}
  const l=i.closest('.ph');l.style.backgroundImage=u;l.classList.add('has')});
/* Degradado de la foto al bajar */
const root=document.documentElement.style;
function sc(){const h=inicio.offsetHeight||innerHeight;root.setProperty('--p',Math.min(1,Math.max(0,scrollY/(h*.8))).toFixed(3))}
addEventListener('scroll',sc,{passive:true});addEventListener('resize',sc);sc();
/* Menú lateral */
const drawer=document.getElementById('drawer'),overlay=document.getElementById('overlay'),menuBtn=document.getElementById('menuBtn');
function toggleDrawer(){drawer.classList.contains('open')?closeDrawer():openDrawer()}
function openDrawer(){drawer.removeAttribute('inert');drawer.classList.add('open');overlay.classList.add('show');menuBtn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'}
function closeDrawer(){drawer.classList.remove('open');overlay.classList.remove('show');menuBtn.setAttribute('aria-expanded','false');document.body.style.overflow='';drawer.setAttribute('inert','')}
function setActive(el){document.querySelectorAll('.nav-item').forEach(i=>i.classList.remove('active'));el.classList.add('active')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});
/* Páginas: inicio y #logros */
const PG={metas:'Metas',galeria:'Galería',logros:'Logros',pasado:'Nuestro pasado',fuimos:'Lo que fuimos',convenios:'Convenios',aliados:'Colegios aliados',actividades:'Tipos de actividades',sala:'Sala de sistemas'};
const HOME={pasado:'pasado',fuimos:'fuimos',convenios:'convenios',aliados:'aliados',actividades:'actividades',sala:'sala',logros:'logrosTeaser',metas:'metas',galeria:'galeriaW'};
let prevPage=null,lastHash=null;
function show(id){
  if(PG[id]){document.body.dataset.page=id;prevPage=id;document.title=PG[id]+' — FUCOMABE';scrollTo(0,0)}
  else{delete document.body.dataset.page;document.title='FUCOMABE — Fundación Comunitaria Manuela Beltrán';
    const back=prevPage&&HOME[prevPage]&&document.getElementById(HOME[prevPage]);
    const el=id&&id!=='volver'&&document.getElementById(id);
    if(el)el.scrollIntoView();else if(back)back.scrollIntoView();else scrollTo(0,0);
    prevPage=null}
  sc()}
/* Navegación propia: no depende de la dirección (#) y funciona también en vistas previas */
function go(id){show(id);lastHash='#'+id;try{history.pushState(null,'','#'+id)}catch(e){}}
function sync(){if(location.hash===lastHash)return;lastHash=location.hash;show(location.hash.slice(1))}
document.addEventListener('click',e=>{
  if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;
  const a=e.target.closest('a[href^="#"]');if(!a)return;
  e.preventDefault();go(a.getAttribute('href').slice(1))});
addEventListener('popstate',sync);addEventListener('hashchange',sync);
try{history.scrollRestoration='manual'}catch(e){}
lastHash=location.hash;show(location.hash.slice(1));
