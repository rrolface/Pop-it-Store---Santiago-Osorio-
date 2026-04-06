/* ═══════════════════════════════════════
   Pop it Store — JavaScript (BEM)
   ═══════════════════════════════════════ */

/* Cursor Personalizado */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

// Bucle de animación del cursor
(function cursorLoop() {
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(cursorLoop);
})();

// Interacción del cursor con elementos
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.classList.add('cursor--hovered');
    ring.classList.add('cursor__ring--hovered');
  });
  el.addEventListener('mouseleave', () => {
    cur.classList.remove('cursor--hovered');
    ring.classList.remove('cursor__ring--hovered');
  });
});

/* Barra de progreso + Navbar sticky + Botón volver arriba */
const progressBar = document.getElementById('progress-bar');
const navbar      = document.getElementById('navbar');
const backTop     = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  const h   = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;

  progressBar.style.width = pct + '%';
  navbar.classList.toggle('navbar--scrolled', window.scrollY > 40);
  backTop.classList.toggle('back-top--visible', window.scrollY > 300);
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Animaciones de revelación al hacer scroll */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right, .section-title'
).forEach(el => revealObserver.observe(el));

/* Toast — Notificación de agregar al carrito */
let toastTimer;

function showToast(name) {
  const toast = document.getElementById('toast');
  const tBar  = document.getElementById('t-bar');

  document.getElementById('toast-msg').textContent =
    '«' + name + '» Agregado al carrito!';

  toast.classList.remove('toast--show');
  tBar.style.animation = 'none';
  void toast.offsetWidth;

  toast.classList.add('toast--show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast--show'), 3200);
}

// Conectar toast a los botones COMPRAR
document.querySelectorAll('.product-card__btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    showToast(btn.dataset.name || 'Producto');
  });
});

/* Efecto ripple al hacer clic en botones */
document.querySelectorAll('.product-card__btn, .hero__btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: rgba(255,255,255,0.35);
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      transform: scale(0);
      animation: ripple 0.55s ease-out forwards;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* Burbujas flotantes en el Hero */
const bubbleContainer = document.getElementById('heroBubbles');

for (let i = 0; i < 16; i++) {
  const bubble = document.createElement('div');
  bubble.className = 'hero__bubble';
  const size = 18 + Math.random() * 65;

  bubble.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${Math.random() * 100}%;
    bottom: -80px;
    animation-duration: ${5 + Math.random() * 9}s;
    animation-delay: ${Math.random() * 7}s;
  `;
  bubbleContainer.appendChild(bubble);
}

/* Menú hamburguesa móvil */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('navbar__hamburger--open');
  mobileMenu.classList.toggle('mobile-menu--open');
});

function closeMob() {
  hamburger.classList.remove('navbar__hamburger--open');
  mobileMenu.classList.remove('mobile-menu--open');
}