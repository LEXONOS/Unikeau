/* UNIK'EAU — interactions */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---- Nav, progression, bouton flottant ---- */
  var nav = document.getElementById('nav');
  var fab = document.querySelector('.fab');
  var bar = document.getElementById('progressbar');
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
    '.hero__copy > *, .hero__visual, .perk, .shead, .mcard, .stage, .uv, .step, .plan, .plans__note, .law, .qa, .cta'
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
      if (burger.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      } else {
        menu.hidden = false;
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'Fermer le menu');
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1100) closeMenu();
    });
  }

  /* ---- FAQ : une seule réponse ouverte ---- */
  var qas = document.querySelectorAll('.qa');
  qas.forEach(function (qa) {
    qa.addEventListener('toggle', function () {
      if (!qa.open) return;
      qas.forEach(function (other) { if (other !== qa) other.open = false; });
    });
  });

  /* ---- Ancres ---- */
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
