/* Cursor */
const cursor = document.getElementById('cursor');
const borde  = document.getElementById('cursorBorde');

let mouseX = 0, mouseY = 0;
let bordeX = 0, bordeY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animarCursor() {
  // punto principal
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';

  // borde con efecto suave
  bordeX += (mouseX - bordeX) * 0.13;
  bordeY += (mouseY - bordeY) * 0.13;

  borde.style.left = bordeX + 'px';
  borde.style.top  = bordeY + 'px';

  requestAnimationFrame(animarCursor);
}

animarCursor();

/* Hover en botones */
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hovered');
    borde.classList.add('cursor_borde--hovered');
  });

  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hovered');
    borde.classList.remove('cursor_borde--hovered');
  });
});


/* Scroll en General */
const barra = document.getElementById('barra-progreso');
const menu  = document.getElementById('menu');
const volverArriba = document.getElementById('Volver-Arriba');

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const progreso = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;

  barra.style.width = progreso + '%';

  menu.classList.toggle('menu--scrolled', window.scrollY > 40);
  volverArriba.classList.toggle('Volver-Arriba--visible', window.scrollY > 300);
});

volverArriba.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* Mostrar elementos cuando aparecen en pantalla */
const observer = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .section-title')
  .forEach(el => observer.observe(el));


/* Notificacion Agregado al Carrito*/
let tiempoNoti;

function mostrarNoti(nombre) {
  const noti = document.getElementById('noti');
  const barra = document.getElementById('t-bar');

  document.getElementById('noti-msg').textContent =
    '«' + nombre + '» agregado al carrito';

  noti.classList.remove('noti--show');
  barra.style.animation = 'none';
  void noti.offsetWidth;

  noti.classList.add('noti--show');

  clearTimeout(tiempoNoti);
  tiempoNoti = setTimeout(() => {
    noti.classList.remove('noti--show');
  }, 3200);
}


/* Botones comprar */
document.querySelectorAll('.product-card__btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    mostrarNoti(btn.dataset.name || 'Producto');
  });
});


/* Efecto Ripple */
document.querySelectorAll('.product-card__btn, .principal__btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const tamaño = Math.max(rect.width, rect.height) * 2;

    const efecto = document.createElement('span');

    efecto.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      width: ${tamaño}px;
      height: ${tamaño}px;
      left: ${e.clientX - rect.left - tamaño / 2}px;
      top: ${e.clientY - rect.top - tamaño / 2}px;
      transform: scale(0);
      animation: ripple 0.55s ease-out forwards;
    `;

    this.appendChild(efecto);
    setTimeout(() => efecto.remove(), 600);
  });
});


/* Efecto Burbujas */
const contenedorBurbujas = document.getElementById('principalBubbles');

for (let i = 0; i < 16; i++) {
  const burbuja = document.createElement('div');
  burbuja.className = 'principal__bubble';

  const tamaño = 18 + Math.random() * 65;

  burbuja.style.cssText = `
    width: ${tamaño}px;
    height: ${tamaño}px;
    left: ${Math.random() * 100}%;
    bottom: -80px;
    animation-duration: ${5 + Math.random() * 9}s;
    animation-delay: ${Math.random() * 7}s;
  `;

  contenedorBurbujas.appendChild(burbuja);
}


/* Menu Movil */
const hamburguesa = document.getElementById('hamburger');
const menuMovil   = document.getElementById('mobileMenu');

hamburguesa.addEventListener('click', () => {
  hamburguesa.classList.toggle('menu_hamburguesa--open');
  menuMovil.classList.toggle('menu-movil--open');
});

function closeMob() {
  hamburguesa.classList.remove('menu_hamburguesa--open');
  menuMovil.classList.remove('menu-movil--open');
}