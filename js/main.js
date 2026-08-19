/* =========================================================
   UNIK'EAU - main.js
   Vanilla JS, aucune dependance
   ========================================================= */
(function () {
  "use strict";

  var doc = document;
  var body = doc.body;

  /* ---- Header : etat condense au scroll ---- */
  var header = doc.getElementById("header");
  function onScroll() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var burger = doc.getElementById("burger");
  var panel = doc.getElementById("navPanel");

  function closeMenu() {
    body.classList.remove("nav-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (panel) {
    // Fermer le menu quand on clique une ancre
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }
  // Fermer avec la touche Echap
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---- Selecteur Tarifs : Location / Achat ---- */
  var tabLoc = doc.getElementById("tab-loc");
  var tabBuy = doc.getElementById("tab-buy");
  var panelLoc = doc.getElementById("panel-loc");
  var panelBuy = doc.getElementById("panel-buy");

  function selectPlan(which) {
    var locActive = which === "loc";
    if (tabLoc) tabLoc.setAttribute("aria-selected", locActive ? "true" : "false");
    if (tabBuy) tabBuy.setAttribute("aria-selected", locActive ? "false" : "true");

    if (panelLoc) {
      panelLoc.classList.toggle("is-active", locActive);
      panelLoc.hidden = !locActive;
    }
    if (panelBuy) {
      panelBuy.classList.toggle("is-active", !locActive);
      panelBuy.hidden = locActive;
    }
  }
  if (tabLoc) tabLoc.addEventListener("click", function () { selectPlan("loc"); });
  if (tabBuy) tabBuy.addEventListener("click", function () { selectPlan("buy"); });

  /* ---- Apparition au defilement ---- */
  var revealEls = doc.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Annee du footer ---- */
  var year = doc.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

})();
