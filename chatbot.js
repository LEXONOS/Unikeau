/* Assistant IA UNIK'EAU - widget autonome
   S'insere en bas a droite, au-dessus du bouton WhatsApp.
   Essaie l'IA via /api/chat (fonction Vercel) ; si indisponible,
   bascule sur un moteur local de reponses aux questions frequentes. */
(function () {
  'use strict';

  var WA = "https://wa.me/590690342476?text=Bonjour%20UNIK'EAU%2C%20j'aimerais%20un%20devis%20pour%20une%20fontaine%20%C3%A0%20eau.";

  /* ---------------- Styles ---------------- */
  var css = `
  .ukb-launcher{
    position:fixed;right:20px;bottom:92px;z-index:120;
    width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;
    display:grid;place-items:center;color:#fff;
    background:linear-gradient(135deg,#0C4C99,#1265C3 55%,#2EA7E6);
    box-shadow:0 14px 30px -8px rgba(18,101,195,.65);
    transition:transform .25s cubic-bezier(.22,.9,.24,1),box-shadow .25s;
  }
  .ukb-launcher:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 20px 40px -10px rgba(18,101,195,.7)}
  .ukb-launcher::before{
    content:"";position:absolute;inset:-5px;border-radius:50%;
    border:2px solid rgba(46,167,230,.45);opacity:0;
    animation:ukbPulse 2.6s ease-out infinite;
  }
  .ukb-launcher .ukb-ic-close{display:none}
  .ukb-launcher.is-open .ukb-ic-chat{display:none}
  .ukb-launcher.is-open .ukb-ic-close{display:block}
  .ukb-launcher.is-open::before{animation:none;opacity:0}
  .ukb-badge{
    position:absolute;top:-4px;right:-4px;padding:3px 7px;border-radius:999px;
    background:#0A1C30;color:#8FD4F5;font:600 9px/1 "IBM Plex Mono",ui-monospace,monospace;
    letter-spacing:.08em;border:1.5px solid rgba(143,212,245,.5);
  }
  @keyframes ukbPulse{0%{transform:scale(.9);opacity:.8}70%{transform:scale(1.28);opacity:0}100%{opacity:0}}

  .ukb-panel{
    position:fixed;right:20px;bottom:162px;z-index:130;
    width:378px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 190px);
    display:flex;flex-direction:column;overflow:hidden;border-radius:24px;
    background:#F6FAFD;border:1px solid #DCE7F0;
    box-shadow:0 6px 18px rgba(10,28,48,.12), 0 40px 90px -24px rgba(10,28,48,.4);
    opacity:0;transform:translateY(18px) scale(.96);transform-origin:100% 100%;
    pointer-events:none;transition:opacity .28s,transform .28s cubic-bezier(.22,.9,.24,1);
  }
  .ukb-panel.is-open{opacity:1;transform:none;pointer-events:auto}

  .ukb-head{
    position:relative;display:flex;align-items:center;gap:12px;padding:16px 16px 14px;color:#fff;
    background:
      radial-gradient(300px 140px at 90% -20%, rgba(46,167,230,.5), transparent 70%),
      linear-gradient(135deg,#0A1C30,#0C4C99 60%,#1265C3);
  }
  .ukb-ava{
    width:40px;height:40px;border-radius:14px;flex:none;display:grid;place-items:center;
    background:rgba(255,255,255,.14);border:1px solid rgba(143,212,245,.35);
  }
  .ukb-head-t{min-width:0}
  .ukb-head-t b{display:block;font:700 15.5px/1.2 "Sora",system-ui,sans-serif;letter-spacing:-.01em}
  .ukb-head-t small{display:flex;align-items:center;gap:6px;margin-top:3px;font:500 11px/1 "IBM Plex Mono",ui-monospace,monospace;color:#9CCBEE;letter-spacing:.05em}
  .ukb-dot{width:7px;height:7px;border-radius:50%;background:#3DDC84;box-shadow:0 0 0 3px rgba(61,220,132,.22)}
  .ukb-close{
    margin-left:auto;width:34px;height:34px;border-radius:10px;border:0;cursor:pointer;flex:none;
    display:grid;place-items:center;color:#CFE6F7;background:rgba(255,255,255,.1);transition:background .2s;
  }
  .ukb-close:hover{background:rgba(255,255,255,.2)}

  .ukb-body{flex:1;overflow-y:auto;padding:18px 14px 10px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin}
  .ukb-msg{
    max-width:84%;padding:11px 14px;border-radius:16px;
    font:400 14px/1.55 "Instrument Sans",system-ui,sans-serif;white-space:pre-line;overflow-wrap:break-word;
    animation:ukbIn .3s cubic-bezier(.22,.9,.24,1);
  }
  .ukb-msg a{color:inherit;text-decoration:underline;text-underline-offset:2px;font-weight:600}
  .ukb-msg--bot{align-self:flex-start;background:#fff;border:1px solid #DCE7F0;color:#42566E;border-bottom-left-radius:6px;box-shadow:0 2px 8px rgba(10,28,48,.05)}
  .ukb-msg--user{align-self:flex-end;background:linear-gradient(135deg,#0C4C99,#1265C3);color:#fff;border-bottom-right-radius:6px}
  @keyframes ukbIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

  .ukb-typing{align-self:flex-start;display:flex;gap:5px;padding:14px 16px;background:#fff;border:1px solid #DCE7F0;border-radius:16px;border-bottom-left-radius:6px}
  .ukb-typing i{width:7px;height:7px;border-radius:50%;background:#7FA6C4;animation:ukbTy 1.1s ease-in-out infinite}
  .ukb-typing i:nth-child(2){animation-delay:.15s}
  .ukb-typing i:nth-child(3){animation-delay:.3s}
  @keyframes ukbTy{0%,60%,100%{transform:none;opacity:.5}30%{transform:translateY(-5px);opacity:1}}

  .ukb-chips{display:flex;flex-wrap:wrap;gap:7px;padding:2px 2px 6px;animation:ukbIn .35s .1s both}
  .ukb-chip{
    border:1px solid #C9DEF2;background:#EAF3FC;color:#0C4C99;cursor:pointer;border-radius:999px;
    padding:8px 13px;font:600 12.5px/1 "Instrument Sans",system-ui,sans-serif;transition:background .2s,transform .2s;
  }
  .ukb-chip:hover{background:#DFEEFA;transform:translateY(-1px)}

  .ukb-foot{padding:10px 12px 12px;background:#fff;border-top:1px solid #E4EDF5}
  .ukb-form{display:flex;gap:8px}
  .ukb-input{
    flex:1;min-width:0;border:1.5px solid #DCE7F0;border-radius:14px;padding:11px 14px;
    font:400 14px/1.4 "Instrument Sans",system-ui,sans-serif;color:#0A1C30;background:#F6FAFD;outline:0;
    transition:border-color .2s,background .2s;
  }
  .ukb-input:focus{border-color:#2EA7E6;background:#fff}
  .ukb-send{
    width:44px;height:44px;flex:none;border:0;border-radius:14px;cursor:pointer;display:grid;place-items:center;color:#fff;
    background:linear-gradient(135deg,#0C4C99,#1265C3);transition:transform .2s,opacity .2s;
  }
  .ukb-send:hover{transform:translateY(-2px)}
  .ukb-send:disabled{opacity:.45;transform:none;cursor:default}
  .ukb-note{margin:8px 2px 0;font:400 10.5px/1.4 "IBM Plex Mono",ui-monospace,monospace;color:#7488A0;text-align:center}

  /* Desktop : pile alignee au pixel (bot au-dessus du WhatsApp) */
  .fab{right:22px !important;bottom:22px !important;width:56px !important;height:56px !important}
  .ukb-launcher{right:22px;bottom:90px;width:56px;height:56px}

  /* Mobile : plus de pastilles empilees, une barre d'action propre en bas */
  .ukb-bar{
    position:fixed;left:0;right:0;bottom:0;z-index:110;display:none;gap:10px;
    padding:10px 12px calc(10px + env(safe-area-inset-bottom));
    background:rgba(246,250,253,.92);
    -webkit-backdrop-filter:blur(16px) saturate(1.4);backdrop-filter:blur(16px) saturate(1.4);
    border-top:1px solid #DCE7F0;box-shadow:0 -10px 30px -12px rgba(10,28,48,.18);
    transition:transform .3s cubic-bezier(.22,.9,.24,1);
  }
  body.ukb-open .ukb-bar{transform:translateY(110%)}
  .ukb-bar a,.ukb-bar button{
    flex:1;display:flex;align-items:center;justify-content:center;gap:8px;
    min-height:48px;padding:10px 8px;border:0;border-radius:14px;cursor:pointer;
    font:700 14px/1.1 "Sora",system-ui,sans-serif;letter-spacing:-.01em;color:#fff;text-decoration:none;
  }
  .ukb-bar .ukb-bar-wa{background:linear-gradient(135deg,#27B45E,#128C46);box-shadow:0 8px 20px -8px rgba(24,150,74,.55)}
  .ukb-bar .ukb-bar-ai{background:linear-gradient(135deg,#0C4C99,#1265C3 60%,#2EA7E6);box-shadow:0 8px 20px -8px rgba(18,101,195,.55);position:relative}
  .ukb-bar .ukb-bar-ai .ukb-badge{position:static;margin-left:2px;background:rgba(10,28,48,.4);border-color:rgba(143,212,245,.4)}
  .ukb-bar svg{flex:none}

  @media (max-width:640px){
    body{padding-bottom:calc(70px + env(safe-area-inset-bottom))}
    .fab{display:none !important}
    .ukb-launcher{display:none}
    .ukb-bar{display:flex}
    .ukb-panel{
      right:10px;left:10px;width:auto;border-radius:20px;max-height:none;
      top:max(10px, env(safe-area-inset-top));bottom:calc(10px + env(safe-area-inset-bottom));height:auto;
    }
  }
  @media (prefers-reduced-motion:reduce){
    .ukb-launcher::before{animation:none}
    .ukb-msg,.ukb-chips{animation:none}
    .ukb-panel{transition:opacity .2s}
  }`;

  /* ---------------- Moteur local (secours sans cle API) ---------------- */
  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
  var WA_LINE = "\nDevis rapide sur WhatsApp : +590 690 34 24 76.";
  var LOCAL = [
    { k: ['prix', 'tarif', 'combien', 'cout', 'coute', 'location', 'louer', 'mensualite', 'abonnement'],
      r: "Deux formules :\n- Location tout compris : 50 \u20AC HT/mois (54,25 \u20AC TTC) jusqu'a 4 personnes, ou 70 \u20AC HT/mois (75,95 \u20AC TTC) a partir de 5 personnes. Installation, entretien, cartouches et garantie compris. Engagement 24 mois, caution 100 \u20AC.\n- Achat : 699 \u20AC TTC (comptoir) ou 799 \u20AC TTC (colonne), + 200 \u20AC d'installation obligatoire." + WA_LINE },
    { k: ['achat', 'acheter', '699', '799'],
      r: "A l'achat : 699 \u20AC TTC pour la fontaine de comptoir, 799 \u20AC TTC pour la colonne, + 200 \u20AC TTC d'installation obligatoire (deplacement, main-d'\u0153uvre et accessoires compris). Garantie 2 ans sur les pieces." + WA_LINE },
    { k: ['caution', 'engagement', 'contrat', 'duree', 'resilier', 'resiliation'],
      r: "La location s'accompagne d'un engagement de 24 mois, avec une caution de 100 \u20AC a la mise en service. En echange, tout est compris pendant le contrat : installation, entretien, cartouches et garantie." + WA_LINE },
    { k: ['entretien', 'filtre', 'cartouche', 'maintenance', 'changer', 'remplace'],
      r: "L'eau passe par 4 cartouches (sediments, charbon actif, ultrafiltration, post-charbon) plus une lampe UV. Elles sont remplacees par notre technicien : 2 passages/an jusqu'a 4 personnes, 4 passages/an a partir de 5. En location c'est compris ; a l'achat, le contrat d'entretien coute 244 ou 488 \u20AC TTC/an selon l'equipe." },
    { k: ['garantie', 'panne', 'casse', 'sav', 'repare'],
      r: "En location, la fontaine est garantie pendant toute la duree du contrat : on intervient, on repare ou on remplace. A l'achat, vous etes couvert 2 ans sur les pieces, dans le cadre d'un entretien respecte." + WA_LINE },
    { k: ['installation', 'installer', 'brancher', 'branchement', 'prevoir', 'travaux', 'raccord'],
      r: "Il vous faut juste une arrivee d'eau potable et une prise electrique a proximite. Notre technicien apporte tout le reste, accessoires de raccordement compris, et met la fontaine en service." + WA_LINE },
    { k: ['eau', 'chaude', 'froide', 'temperee', 'potable', 'gout', 'qualite', 'uv'],
      r: "La fontaine sert une eau froide, temperee ou chaude, a volonte. L'eau du reseau est deja potable : la filtration en 4 etapes retire particules, chlore, gouts et micro-impuretes, et la lampe UV desinfecte le reservoir en continu." },
    { k: ['modele', 'colonne', 'comptoir', 'format', 'couleur', 'coloris', 'taille', 'difference'],
      r: "Deux formats, meme eau et memes filtres : la colonne (au sol, ideale pour l'accueil) en gris et noir ou blanc et noir, et le comptoir (compact, a poser) en gris et noir ou noir complet. Le tarif de location est le meme, il depend juste du nombre de personnes." },
    { k: ['zone', 'secteur', 'deplace', 'ou', 'commune', 'ville', 'abymes', 'pointe', 'jarry', 'baie-mahault', 'basse-terre', 'grande-terre', 'gosier', 'moule'],
      r: "Nous intervenons dans toute la Guadeloupe : Baie-Mahault, Jarry, Pointe-a-Pitre, Les Abymes, et au-dela. Indiquez votre commune sur WhatsApp et on vous confirme tout de suite : +590 690 34 24 76." },
    { k: ['bonbonne', 'bidon', 'bouteille'],
      r: "C'est justement l'idee : la fontaine se branche sur votre arrivee d'eau. Plus de bonbonnes a commander, porter ou stocker, et plus jamais de rupture. Eau illimitee, froide, temperee ou chaude." },
    { k: ['devis', 'contact', 'whatsapp', 'telephone', 'appeler', 'mail', 'email', 'rendez-vous', 'rdv'],
      r: "Le plus simple : un message WhatsApp au +590 690 34 24 76 avec votre commune et la taille de votre equipe. Reponse rapide avec le bon modele et un devis clair. Par mail : oelec.guadeloupe@gmail.com." },
    { k: ['bonjour', 'bonsoir', 'salut', 'hello', 'coucou', 'merci'],
      r: "Bonjour ! Je suis l'assistant UNIK'EAU. Posez-moi vos questions sur les fontaines, les tarifs, l'entretien ou l'installation." }
  ];
  function localReply(text) {
    var t = norm(text), best = null, score = 0;
    LOCAL.forEach(function (item) {
      var s = 0;
      item.k.forEach(function (kw) { if (t.indexOf(kw) !== -1) s++; });
      if (s > score) { score = s; best = item; }
    });
    if (best) return best.r;
    return "Bonne question ! Pour une reponse precise, le plus simple est de nous ecrire sur WhatsApp au +590 690 34 24 76 : on vous repond rapidement. En attendant, je peux vous renseigner sur les tarifs, l'entretien, l'installation ou les modeles.";
  }

  /* ---------------- Construction du widget ---------------- */
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var ICONS = {
    chat: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9.5 9.5c.3-1.2 1.4-2 2.7-2 1.5 0 2.8 1.1 2.8 2.5 0 1.7-2.2 1.9-2.8 3.2"/><circle cx="12.1" cy="16.5" r=".5" fill="currentColor"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    drop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8FD4F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.7 6.6 9.8a6.6 6.6 0 1 0 10.8 0Z"/><path d="M9.4 13.2a3 3 0 0 0 1.4 2.6" opacity=".7"/></svg>',
    send: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>'
  };

  var launcher = document.createElement('button');
  launcher.className = 'ukb-launcher';
  launcher.setAttribute('aria-label', "Ouvrir l'assistant UNIK'EAU");
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<span class="ukb-ic-chat">' + ICONS.chat + '</span><span class="ukb-ic-close">' + ICONS.close + '</span><span class="ukb-badge">IA</span>';

  var panel = document.createElement('section');
  panel.className = 'ukb-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', "Assistant UNIK'EAU");
  panel.innerHTML =
    '<div class="ukb-head">' +
      '<span class="ukb-ava">' + ICONS.drop + '</span>' +
      '<div class="ukb-head-t"><b>Assistant UNIK\u2019EAU</b><small><span class="ukb-dot"></span>En ligne \u00B7 r\u00E9pond en direct</small></div>' +
      '<button class="ukb-close" type="button" aria-label="Fermer">' + ICONS.close + '</button>' +
    '</div>' +
    '<div class="ukb-body"></div>' +
    '<div class="ukb-foot">' +
      '<form class="ukb-form">' +
        '<input class="ukb-input" type="text" placeholder="Votre question\u2026" autocomplete="off" maxlength="500" aria-label="Votre question">' +
        '<button class="ukb-send" type="submit" aria-label="Envoyer">' + ICONS.send + '</button>' +
      '</form>' +
      '<p class="ukb-note">Assistant automatique \u00B7 devis exact sur WhatsApp</p>' +
    '</div>';

  var bar = document.createElement('div');
  bar.className = 'ukb-bar';
  bar.innerHTML =
    '<a class="ukb-bar-wa" href="' + WA + '" target="_blank" rel="noopener">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.4.9-.9 1-.7 1.4.8 1.3 1.7 2.1 3 2.8.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.3 1.4Z"/></svg>' +
      'Devis WhatsApp</a>' +
    '<button class="ukb-bar-ai" type="button">' + ICONS.chat.replace('width="26" height="26"', 'width="18" height="18"') +
      'Une question ?<span class="ukb-badge">IA</span></button>';

  document.body.appendChild(launcher);
  document.body.appendChild(panel);
  document.body.appendChild(bar);

  var body = panel.querySelector('.ukb-body');
  var form = panel.querySelector('.ukb-form');
  var input = panel.querySelector('.ukb-input');
  var send = panel.querySelector('.ukb-send');

  var history = [];   // {role, content}
  var busy = false;
  var apiDown = false;
  var started = false;

  function scroll() { body.scrollTop = body.scrollHeight; }

  function addMsg(role, text) {
    var el = document.createElement('div');
    el.className = 'ukb-msg ' + (role === 'user' ? 'ukb-msg--user' : 'ukb-msg--bot');
    // Liens cliquables sur le numero WhatsApp
    if (role !== 'user' && text.indexOf('+590 690 34 24 76') !== -1) {
      el.innerHTML = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\+590 690 34 24 76/g, '<a href="' + WA + '" target="_blank" rel="noopener">+590 690 34 24 76</a>');
    } else {
      el.textContent = text;
    }
    body.appendChild(el);
    scroll();
  }

  function showTyping() {
    var t = document.createElement('div');
    t.className = 'ukb-typing';
    t.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(t);
    scroll();
    return t;
  }

  function showChips() {
    var wrap = document.createElement('div');
    wrap.className = 'ukb-chips';
    ['Les tarifs ?', "L'entretien, comment \u00E7a marche ?", 'Que faut-il pr\u00E9voir chez moi ?', 'Location ou achat ?'].forEach(function (q) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'ukb-chip';
      b.textContent = q;
      b.addEventListener('click', function () {
        wrap.remove();
        submit(q);
      });
      wrap.appendChild(b);
    });
    body.appendChild(wrap);
    scroll();
  }

  function welcome() {
    if (started) return;
    started = true;
    addMsg('bot', "Bonjour ! Je suis l'assistant UNIK\u2019EAU. Tarifs, entretien, installation, mod\u00E8les\u2026 posez-moi vos questions.");
    showChips();
  }

  function reply(text) {
    var q = history.slice(); // copie avec le dernier message user inclus
    var typing = showTyping();
    var min = new Promise(function (r) { setTimeout(r, 500); }); // petite latence naturelle

    var answer;
    if (apiDown) {
      answer = Promise.resolve(localReply(text));
    } else {
      answer = fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: q })
      }).then(function (r) {
        if (!r.ok) throw new Error('api');
        return r.json();
      }).then(function (d) {
        if (!d || !d.reply) throw new Error('api');
        return d.reply;
      }).catch(function () {
        apiDown = true;
        return localReply(text);
      });
    }

    Promise.all([answer, min]).then(function (res) {
      typing.remove();
      var out = res[0];
      addMsg('bot', out);
      history.push({ role: 'assistant', content: out });
      if (history.length > 16) history = history.slice(-16);
      busy = false;
      send.disabled = false;
      input.focus();
    });
  }

  function submit(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    send.disabled = true;
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    reply(text);
  }

  function openPanel() {
    document.body.classList.add('ukb-open');
    panel.classList.add('is-open');
    launcher.classList.add('is-open');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', "Fermer l'assistant UNIK'EAU");
    welcome();
    setTimeout(function () { input.focus(); }, 250);
  }
  function closePanel() {
    document.body.classList.remove('ukb-open');
    panel.classList.remove('is-open');
    launcher.classList.remove('is-open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', "Ouvrir l'assistant UNIK'EAU");
  }

  launcher.addEventListener('click', function () {
    if (panel.classList.contains('is-open')) closePanel(); else openPanel();
  });
  panel.querySelector('.ukb-close').addEventListener('click', closePanel);
  bar.querySelector('.ukb-bar-ai').addEventListener('click', openPanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) closePanel();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value;
    input.value = '';
    submit(v);
  });
})();
