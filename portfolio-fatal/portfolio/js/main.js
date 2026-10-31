// Année automatique dans le pied de page
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

// Filtre des projets (page projets)
const buttons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project[data-type], .shot[data-type]');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.setAttribute('aria-pressed', b === btn));
  const type = btn.dataset.filter;
  projects.forEach(p => { p.hidden = type !== 'tous' && p.dataset.type !== type; });
}));

// Barre de progression de lecture
const bar = document.querySelector('.progress');
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.setProperty('--p', h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1));
}, { passive: true });

// Apparition au défilement
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Mots qui s’écrivent tout seuls (page d’accueil)
const typed = document.querySelector('.typed');
if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = typed.dataset.words.split('|');
  let w = 0, i = 0, del = false;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, i);
    if (!del && i === word.length) { del = true; return setTimeout(tick, 1400); }
    if (del && i === 0) { del = false; w = (w + 1) % words.length; }
    i += del ? -1 : 1;
    setTimeout(tick, del ? 40 : 80);
  })();
}

// Galerie : photo en grand
const box = document.querySelector('.lightbox');
if (box) {
  document.querySelectorAll('.shot button').forEach(b => b.addEventListener('click', () => {
    const img = b.querySelector('img');
    box.querySelector('img').src = img.src;
    box.querySelector('img').alt = img.alt;
    box.querySelector('p').textContent = b.parentElement.querySelector('figcaption').textContent;
    box.showModal();
  }));
  box.querySelector('.close').addEventListener('click', () => box.close());
  box.addEventListener('click', e => { if (e.target === box) box.close(); });
}
