/* UNIK'EAU — interactions */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var nav = document.getElementById('nav');
  var fab = document.querySelector('.fab');
  var bar = document.getElementById('progressbar');

  /* ---- Hauteur du héros : la landing remplit l'écran, bandeau compris ---- */
  var marquee = document.querySelector('.marquee');
  function sizeHero() {
    var h = window.innerHeight - (nav ? nav.offsetHeight : 0) - (marquee ? marquee.offsetHeight : 0);
    document.documentElement.style.setProperty('--heroh', Math.max(h, 500) + 'px');
  }
  sizeHero();
  window.addEventListener('load', sizeHero);
  window.addEventListener('resize', sizeHero, { passive: true });

  /* ---- Nav collée, progression, bouton flottant ---- */
  var ticking = false;

  function frame() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('is-stuck', y > 10);
    if (fab) fab.classList.toggle('is-on', y > 600);
    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(frame);
  }
  frame();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ---- Filtration : séquence pilotée par le scroll ---- */
  (function () {
    var lab = document.getElementById('lab');
    var scroller = document.getElementById('labScroll');
    if (!lab || !scroller) return;
    var segs = Array.prototype.slice.call(document.querySelectorAll('#pipe .pnode'));
    var tapOut = document.querySelector('.pipe__dot--out');
    var navEl = document.getElementById('nav');
    var dtls = Array.prototype.slice.call(lab.querySelectorAll('.dtl'));
    var mvs = Array.prototype.slice.call(lab.querySelectorAll('.mv'));
    var uv = lab.querySelector('.uvstage');
    var bar = document.getElementById('labBar');
    var tag = document.getElementById('labTag');
    var idxEl = document.getElementById('labIdx');
    var accents = ['#1E86D6', '#E8792B', '#2FA84F', '#D6236B', '#46CDEF'];
    var codes = ['PP', 'GAC', 'UF', 'T33', 'UV'];
    var N = segs.length || 5;
    var idx = -1, scanT = null, ticking = false;

    function scan() {
      lab.classList.remove('scanning');
      void lab.offsetWidth;
      lab.classList.add('scanning');
      clearTimeout(scanT);
      scanT = setTimeout(function () { lab.classList.remove('scanning'); }, 650);
    }
    function paint(i, doScan) {
      if (i === idx) return;
      idx = i;
      lab.style.setProperty('--acc', accents[i] || accents[0]);
      segs.forEach(function (s) {
        var si = parseInt(s.getAttribute('data-i'), 10);
        s.classList.toggle('is-active', si === i);
        s.classList.toggle('is-done', si < i);
      });
      dtls.forEach(function (d) { d.classList.toggle('is-active', parseInt(d.getAttribute('data-i'), 10) === i); });
      mvs.forEach(function (m) { m.classList.toggle('is-active', parseInt(m.getAttribute('data-i'), 10) === i); });
      if (uv) uv.classList.toggle('is-active', i === 4);
      lab.classList.toggle('is-uv', i === 4);
      if (tag) tag.textContent = 'SCAN · ' + codes[i];
      if (idxEl) idxEl.textContent = ('0' + (i + 1)).slice(-2);
      if (doScan) scan();
    }

    // Étapes cliquables : sauter à la position de scroll correspondante
    segs.forEach(function (s) {
      var btn = s.querySelector('button');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var i = parseInt(s.getAttribute('data-i'), 10);
        if (scroller.classList.contains('is-scrolly')) {
          var total = scroller.offsetHeight - window.innerHeight;
          var target = scroller.offsetTop + total * ((i + 0.5) / N);
          window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
        } else {
          paint(i, true);
          if (bar) bar.style.width = ((i + 1) / N) * 100 + '%';
        }
      });
    });

    // Mode replié (mouvement réduit / pas de scrollytelling) : première étape figée
    if (reduced) { paint(0, false); if (bar) bar.style.width = (100 / N) + '%'; return; }

    scroller.classList.add('is-scrolly');

    function frame() {
      var rect = scroller.getBoundingClientRect();
      var total = scroller.offsetHeight - window.innerHeight;
      var p = total > 0 ? (-rect.top) / total : 0;
      p = p < 0 ? 0 : (p > 1 ? 1 : p);
      if (navEl) navEl.classList.toggle('is-hidden', rect.top < 90 && rect.bottom > window.innerHeight * 0.6);
      if (bar) bar.style.width = (p * 100) + '%';
      if (tapOut) tapOut.classList.toggle('is-live', p > 0.98);
      var i = Math.floor(p * N);
      if (i > N - 1) i = N - 1;
      if (i < 0) i = 0;
      paint(i, true);
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    paint(0, false);
    frame();
  })();

  /* ---- Tarifs : bascule Location / Achat ---- */
  (function () {
    var seg = document.getElementById('priceSeg');
    if (!seg) return;
    var btns = { location: document.getElementById('segLocation'), achat: document.getElementById('segAchat') };
    var panes = { location: document.getElementById('modeLocation'), achat: document.getElementById('modeAchat') };
    function setMode(mode) {
      seg.setAttribute('data-mode', mode);
      Object.keys(btns).forEach(function (k) {
        var on = k === mode;
        if (btns[k]) { btns[k].classList.toggle('is-on', on); btns[k].setAttribute('aria-selected', on ? 'true' : 'false'); }
        if (panes[k]) { panes[k].classList.toggle('is-on', on); panes[k].hidden = !on; }
      });
    }
    if (btns.location) btns.location.addEventListener('click', function () { setMode('location'); });
    if (btns.achat) btns.achat.addEventListener('click', function () { setMode('achat'); });
  })();

  /* ---- Fiches modèles ---- */
  document.querySelectorAll('[data-card]').forEach(function (card) {
    var toggle = card.querySelector('.mcard__toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('span').textContent = open ? 'Masquer' : 'Caractéristiques';
    });
  });

  /* ---- Apparition au scroll ---- */
  var targets = document.querySelectorAll(
    '.hero__copy > *, .hero__visual, .shead, .cpanel, .compare__arrow, .mcard, .realstrip, .step, .seg, .plan, .buynote, .plans__note, .law__card, .qa, .cta'
  );
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---- Compteur sur les prix ---- */
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && !reduced && 'IntersectionObserver' in window) {
    var counter = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var end = parseInt(el.getAttribute('data-count'), 10) || 0;
        var start = performance.now();
        (function tick(now) {
          var p = Math.min((now - start) / 900, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        counter.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { counter.observe(el); });
  }

  /* ---- Menu mobile ---- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobilemenu');
  function closeMenu() {
    if (!menu || !burger) return;
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      if (burger.getAttribute('aria-expanded') === 'true') closeMenu();
      else {
        menu.hidden = false;
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Fermer le menu');
      }
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1100) closeMenu(); });
  }

  /* ---- FAQ : une seule réponse ouverte ---- */
  var qas = document.querySelectorAll('.qa');
  qas.forEach(function (qa) {
    qa.addEventListener('toggle', function () {
      if (!qa.open) return;
      qas.forEach(function (other) { if (other !== qa) other.open = false; });
    });
  });

  /* ---- Ancres avec décalage du header ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - ((nav ? nav.offsetHeight : 0) + 14);
      window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();
