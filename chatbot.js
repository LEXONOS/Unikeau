/* =====================================================================
   UNIK'EAU — Assistant « questions fréquentes »
   Réponses préenregistrées (pas d'IA en direct). Honnête et simple :
   on montre les questions qu'on nous pose le plus, on y répond, et pour
   tout le reste on renvoie vers WhatsApp.
   ===================================================================== */
(function () {
  'use strict';

  var WA_NUM = '590690342476';
  var WA_TXT = "Bonjour UNIK'EAU, j'aimerais un devis pour une fontaine \u00e0 eau.";
  var WA_LINK = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(WA_TXT);
  var WA_HUMAN = '+590 690 34 24 76';

  /* ---------------------------------------------------------------
     Base de questions / réponses (regroupées par thème)
     --------------------------------------------------------------- */
  var CATS = ['Tarifs', "L'eau", 'Entretien', 'Installation', 'Le produit', 'Zone & d\u00e9lais', 'Garantie', 'Paiement', 'Contact'];

  var QA = [
    /* ---- Tarifs ---- */
    { id: 'loc-achat', cat: 'Tarifs', q: 'Location ou achat, comment choisir ?',
      a: "La location est la formule sans souci : une mensualit\u00e9 fixe qui couvre la fontaine, l'installation, l'entretien, les cartouches et la garantie pendant tout le contrat.\nL'achat, c'est la machine qui vous appartient : vous payez la fontaine et l'installation une fois, puis l'entretien au contrat.\nDites-nous votre situation sur WhatsApp (" + WA_HUMAN + "), on vous indique ce qui revient le moins cher.",
      k: ['location', 'achat', 'acheter', 'louer', 'choisir', 'difference', 'formule', 'plutot'] },
    { id: 'prix-loc', cat: 'Tarifs', q: 'Combien co\u00fbte la location ?',
      a: "Location tout compris :\n\u2022 50 \u20ac HT/mois (54,25 \u20ac TTC) jusqu'\u00e0 4 personnes\n\u2022 70 \u20ac HT/mois (75,95 \u20ac TTC) \u00e0 partir de 5 personnes\nLe tarif suit le nombre de personnes qui boivent l'eau, pas le mod\u00e8le. Installation, entretien, cartouches et garantie compris. Engagement 24 mois, caution 100 \u20ac.",
      k: ['prix', 'tarif', 'combien', 'cout', 'coute', 'mensualite', 'mois', 'location', 'louer'] },
    { id: 'prix-achat', cat: 'Tarifs', q: "Combien co\u00fbte l'achat ?",
      a: "\u00c0 l'achat :\n\u2022 Comptoir : 699 \u20ac TTC\n\u2022 Colonne : 799 \u20ac TTC\n\u2022 Installation : 200 \u20ac TTC (d\u00e9placement, main-d'\u0153uvre et accessoires compris)\nGarantie 2 ans sur les pi\u00e8ces. L'entretien se fait ensuite via un contrat d\u00e9di\u00e9.",
      k: ['prix', 'achat', 'acheter', 'combien', 'cout', 'coute', 'comptoir', 'colonne'] },
    { id: 'inclus-loc', cat: 'Tarifs', q: 'Que comprend la location ?',
      a: "Tout est compris : la fontaine, l'installation, l'entretien r\u00e9gulier, les 4 cartouches remplac\u00e9es \u00e0 chaque passage, et la garantie pendant toute la dur\u00e9e du contrat. Vous n'avez qu'une mensualit\u00e9 fixe, sans surprise.",
      k: ['inclus', 'compris', 'comprend', 'contient', 'entretien'] },
    { id: 'engagement', cat: 'Tarifs', q: 'Engagement et caution ?',
      a: "En location : engagement de 24 mois et caution de 100 \u20ac \u00e0 la mise en service. En \u00e9change, tout est compris pendant le contrat.",
      k: ['engagement', 'caution', 'duree', 'contrat', '24'] },
    { id: 'resiliation', cat: 'Tarifs', q: 'Peut-on r\u00e9silier avant 24 mois ?',
      a: "La location est pr\u00e9vue pour 24 mois. Une r\u00e9siliation anticip\u00e9e reste possible dans des situations particuli\u00e8res, \u00e9tudi\u00e9es au cas par cas. Expliquez-nous votre situation sur WhatsApp (" + WA_HUMAN + ") et on regarde ensemble.",
      k: ['resilier', 'resiliation', 'arreter', 'annuler', 'rompre', 'avant', 'stopper'] },

    /* ---- L'eau ---- */
    { id: 'eau-bonne', cat: "L'eau", q: "L'eau est-elle vraiment bonne \u00e0 boire ?",
      a: "L'eau de votre r\u00e9seau passe par 4 cartouches (s\u00e9diments, charbon actif, ultrafiltration, post-charbon) qui retirent particules, chlore, go\u00fbts et micro-impuret\u00e9s, puis par une lampe UV qui d\u00e9sinfecte le r\u00e9servoir en continu. R\u00e9sultat : une eau claire et fra\u00eeche, que vous buvez sans y penser.",
      k: ['bonne', 'boire', 'buvable', 'qualite', 'sante', 'propre', 'saine'] },
    { id: 'peur-robinet', cat: "L'eau", q: "En Guadeloupe on h\u00e9site \u00e0 boire l'eau du robinet, \u00e7a change quoi ?",
      a: "C'est justement l'int\u00e9r\u00eat. Beaucoup pr\u00e9f\u00e8rent acheter des bouteilles par pr\u00e9caution. Avec UNIK'EAU, l'eau est filtr\u00e9e en 4 \u00e9tapes puis pass\u00e9e aux UV : vous retrouvez une eau du robinet en laquelle vous avez confiance, \u00e0 volont\u00e9, sans bouteilles ni bonbonnes.",
      k: ['peur', 'robinet', 'guadeloupe', 'confiance', 'hesite', 'bouteille', 'potable', 'ile'] },
    { id: 'filtration', cat: "L'eau", q: 'Que retire la filtration ?',
      a: "Quatre \u00e9tapes :\n\u2022 PP : particules et sable\n\u2022 Charbon actif : chlore et mauvais go\u00fbts\n\u2022 Ultrafiltration : bact\u00e9ries et micro-impuret\u00e9s\n\u2022 Post-charbon : dernier affinage du go\u00fbt\nPuis une lampe UV neutralise les micro-organismes en continu, sans aucun produit ajout\u00e9.",
      k: ['filtration', 'filtre', 'cartouche', 'retire', 'enleve', 'uv', 'charbon', 'osmose', 'etapes'] },
    { id: 'chaud-froid', cat: "L'eau", q: 'Eau chaude et froide ?',
      a: "Oui : froide (\u2264 10 \u00b0C), temp\u00e9r\u00e9e et chaude (\u2265 90 \u00b0C), \u00e0 volont\u00e9, sur les deux mod\u00e8les.",
      k: ['chaude', 'froide', 'temperature', 'chaud', 'froid', 'tiede', 'temperee'] },

    /* ---- Entretien ---- */
    { id: 'freq-filtres', cat: 'Entretien', q: '\u00c0 quel rythme change-t-on les filtres ?',
      a: "Selon le nombre de personnes : 2 passages par an jusqu'\u00e0 4 personnes, 4 passages par an \u00e0 partir de 5. En location, c'est compris. \u00c0 l'achat, c'est un contrat d'entretien d\u00e9di\u00e9.",
      k: ['rythme', 'frequence', 'changer', 'remplacer', 'filtres', 'cartouches', 'souvent', 'quand'] },
    { id: 'prix-entretien', cat: 'Entretien', q: "Combien co\u00fbte l'entretien \u00e0 l'achat ?",
      a: "\u00c0 l'achat, l'entretien annuel :\n\u2022 244 \u20ac TTC/an de 1 \u00e0 4 personnes (un passage tous les 6 mois)\n\u2022 488 \u20ac TTC/an \u00e0 partir de 5 personnes (un passage par trimestre)\nFiltres neufs et d\u00e9placement compris.",
      k: ['entretien', 'maintenance', 'cout', 'prix', 'annuel', 'contrat'] },
    { id: 'qui-entretien', cat: 'Entretien', q: "Qui s'occupe de l'entretien ?",
      a: "Notre technicien se d\u00e9place, remplace les 4 cartouches par des neuves et v\u00e9rifie la fontaine. Vous n'avez rien \u00e0 faire.",
      k: ['qui', 'technicien', 'entretien', 'occupe', 'deplace'] },

    /* ---- Installation ---- */
    { id: 'prevoir', cat: 'Installation', q: 'Que faut-il pr\u00e9voir chez moi ?',
      a: "Juste une arriv\u00e9e d'eau potable et une prise \u00e9lectrique \u00e0 proximit\u00e9 de l'emplacement. Le technicien apporte tout le reste, accessoires de raccordement compris.",
      k: ['prevoir', 'besoin', 'faut', 'arrivee', 'prise', 'raccordement', 'branchement', 'plomberie'] },
    { id: 'delai', cat: 'Installation', q: 'Combien de temps pour \u00eatre install\u00e9 ?',
      a: "En g\u00e9n\u00e9ral, installation dans la semaine, au plus tard sous deux semaines apr\u00e8s validation du devis. Un seul passage suffit.",
      k: ['delai', 'temps', 'quand', 'rapidite', 'attente', 'semaine', 'installe', 'rendez'] },
    { id: 'installation', cat: 'Installation', q: "Comment se passe l'installation ?",
      a: "On raccorde la fontaine \u00e0 votre arriv\u00e9e d'eau, on la met en service et on v\u00e9rifie chaque sortie. Rapide et propre, en un seul rendez-vous.",
      k: ['installation', 'installer', 'pose', 'passe', 'deroule', 'mise', 'service'] },

    /* ---- Le produit ---- */
    { id: 'colonne-comptoir', cat: 'Le produit', q: 'Colonne ou comptoir, quelle diff\u00e9rence ?',
      a: "M\u00eame eau et m\u00eames 4 cartouches dans les deux. La colonne se pose au sol (id\u00e9ale pour accueil, bureaux, salles d'attente), le comptoir se pose sur un plan de travail (quand la place est compt\u00e9e). Le choix se joue sur l'espace, pas sur le prix.",
      k: ['colonne', 'comptoir', 'difference', 'modele', 'lequel', 'sol', 'poser'] },
    { id: 'coloris', cat: 'Le produit', q: 'Quels coloris ?',
      a: "Colonne : gris et noir, ou blanc et noir.\nComptoir : gris et noir, blanc et noir, ou noir complet.",
      k: ['coloris', 'couleur', 'couleurs', 'noir', 'blanc', 'gris'] },
    { id: 'dimensions', cat: 'Le produit', q: 'Quelles dimensions ?',
      a: "La colonne fait 33 x 36 x 116 cm. Pour les dimensions exactes du comptoir, demandez-nous sur WhatsApp (" + WA_HUMAN + "), on vous envoie la fiche.",
      k: ['dimensions', 'taille', 'hauteur', 'largeur', 'encombrement', 'mesure', 'cm'] },
    { id: 'bonbonne', cat: 'Le produit', q: 'Faut-il encore des bonbonnes ?',
      a: "Non, plus jamais. La fontaine se branche sur votre arriv\u00e9e d'eau : plus rien \u00e0 commander, porter ou stocker, et jamais de rupture.",
      k: ['bonbonne', 'bonbonnes', 'bouteille', 'recharge', 'stock', 'livraison'] },

    /* ---- Zone & délais ---- */
    { id: 'zone', cat: 'Zone & d\u00e9lais', q: 'Vous intervenez o\u00f9 ?',
      a: "Dans toute la Guadeloupe : Baie-Mahault, Jarry, Pointe-\u00e0-Pitre, Les Abymes, et au-del\u00e0. Dites-nous votre commune sur WhatsApp (" + WA_HUMAN + "), on confirme tout de suite.",
      k: ['zone', 'ou', 'secteur', 'commune', 'livrez', 'intervenez', 'deplacez', 'guadeloupe'] },
    { id: 'pro-particulier', cat: 'Zone & d\u00e9lais', q: 'C\'est pour les pros ou les particuliers ?',
      a: "Les deux. Bureaux, commerces, salles d'attente, salles de sport, restaurants, et \u00e0 la maison.",
      k: ['pro', 'professionnel', 'entreprise', 'particulier', 'maison', 'bureau', 'commerce'] },

    /* ---- Garantie ---- */
    { id: 'panne', cat: 'Garantie', q: 'Que se passe-t-il en cas de panne ?',
      a: "En location, la fontaine est garantie pendant tout le contrat : on intervient, on r\u00e9pare ou on remplace. \u00c0 l'achat, vous \u00eates couvert 2 ans sur les pi\u00e8ces, dans le cadre d'un entretien respect\u00e9.",
      k: ['panne', 'garantie', 'casse', 'probleme', 'sav', 'repare', 'reparation', 'dysfonctionnement'] },

    /* ---- Paiement ---- */
    { id: 'paiement', cat: 'Paiement', q: 'Quels moyens de paiement ?',
      a: "Carte, virement, esp\u00e8ces et facture. Le devis et la facture sont \u00e9tablis au nom d'O'ELEC, la soci\u00e9t\u00e9 derri\u00e8re la marque UNIK'EAU.",
      k: ['paiement', 'payer', 'carte', 'virement', 'especes', 'cash', 'cheque', 'facture', 'reglement'] },
    { id: 'oelec', cat: 'Paiement', q: 'Pourquoi la facture est au nom d\'O\'ELEC ?',
      a: "UNIK'EAU est la marque fontaines \u00e0 eau de la soci\u00e9t\u00e9 O'ELEC, bas\u00e9e \u00e0 Baie-Mahault. Vos devis, contrats et factures sont donc au nom d'O'ELEC : c'est la m\u00eame maison.",
      k: ['oelec', 'facture', 'societe', 'entreprise', 'siret', 'nom', 'marque'] },

    /* ---- Contact ---- */
    { id: 'devis', cat: 'Contact', q: 'Comment obtenir un devis ?',
      a: "Le plus simple : un message WhatsApp au " + WA_HUMAN + " avec votre commune et la taille de votre \u00e9quipe. R\u00e9ponse rapide avec le bon mod\u00e8le et un devis clair. Par mail : oelec.guadeloupe@gmail.com.",
      k: ['devis', 'contact', 'joindre', 'appeler', 'commander', 'demander', 'estimation', 'mail'] }
  ];

  /* Questions mises en avant à l'ouverture */
  var STARTERS = ['prix-loc', 'peur-robinet', 'delai', 'colonne-comptoir', 'paiement', 'devis'];

  function byId(id) { for (var i = 0; i < QA.length; i++) { if (QA[i].id === id) return QA[i]; } return null; }

  /* Recherche par mots-clés pour la saisie libre */
  function norm(s) {
    return (s || '').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function bestMatch(text) {
    var q = norm(text);
    if (!q) return null;
    var words = q.split(' ');
    var best = null, bestScore = 0;
    for (var i = 0; i < QA.length; i++) {
      var score = 0;
      for (var j = 0; j < QA[i].k.length; j++) {
        var kw = QA[i].k[j];
        if (q.indexOf(kw) !== -1) score += 2;
        else if (words.indexOf(kw) !== -1) score += 2;
      }
      if (score > bestScore) { bestScore = score; best = QA[i]; }
    }
    return bestScore >= 2 ? best : null;
  }

  /* ---------------------------------------------------------------
     Styles
     --------------------------------------------------------------- */
  var css = `
  .ukb-launcher{position:fixed;right:22px;bottom:22px;z-index:1200;width:62px;height:62px;border:none;border-radius:50%;cursor:pointer;
    background:linear-gradient(140deg,#2EA7E6,#1265C3);box-shadow:0 16px 34px -10px rgba(18,101,195,.6),0 2px 8px rgba(10,28,48,.25);
    display:grid;place-items:center;transition:transform .25s ease,box-shadow .25s ease}
  .ukb-launcher:hover{transform:translateY(-3px) scale(1.03)}
  .ukb-launcher:active{transform:translateY(-1px) scale(.99)}
  .ukb-launcher svg{width:28px;height:28px;color:#fff;position:relative;z-index:2}
  .ukb-launcher::before{content:"";position:absolute;inset:0;border-radius:50%;background:inherit;opacity:.55;animation:ukbPulse 2.6s ease-out infinite}
  @keyframes ukbPulse{0%{transform:scale(1);opacity:.5}70%{transform:scale(1.5);opacity:0}100%{opacity:0}}
  .ukb-launcher.is-open{background:#0A1C30}
  .ukb-launcher.is-open::before{display:none}

  .ukb-panel{position:fixed;right:22px;bottom:96px;z-index:1200;width:380px;max-width:calc(100vw - 28px);height:560px;max-height:calc(100vh - 130px);
    background:#fff;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;
    box-shadow:0 40px 90px -30px rgba(10,28,48,.5),0 8px 24px rgba(10,28,48,.16);border:1px solid rgba(10,28,48,.08);
    opacity:0;transform:translateY(14px) scale(.98);pointer-events:none;transition:opacity .28s ease,transform .28s ease;transform-origin:bottom right}
  .ukb-panel.is-open{opacity:1;transform:none;pointer-events:auto}

  .ukb-head{display:flex;align-items:center;gap:12px;padding:15px 16px;color:#fff;
    background:radial-gradient(120% 160% at 0% 0%,#1E86D6,#0A1C30);}
  .ukb-ava{width:40px;height:40px;border-radius:12px;flex:none;display:grid;place-items:center;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22)}
  .ukb-ava svg{width:22px;height:22px;color:#EAF4FB}
  .ukb-ht{flex:1;min-width:0;line-height:1.2}
  .ukb-ht b{font-family:'Sora',sans-serif;font-weight:600;font-size:15px;letter-spacing:-.01em;display:block}
  .ukb-sub{display:flex;align-items:center;gap:6px;font-size:12px;color:#BFE0F5;margin-top:2px}
  .ukb-dot{width:7px;height:7px;border-radius:50%;background:#46CDEF;box-shadow:0 0 0 3px rgba(70,205,239,.25)}
  .ukb-x{margin-left:auto;background:rgba(255,255,255,.12);border:none;color:#fff;width:32px;height:32px;border-radius:9px;cursor:pointer;font-size:19px;line-height:1;transition:background .2s}
  .ukb-x:hover{background:rgba(255,255,255,.22)}

  .ukb-body{flex:1;overflow-y:auto;padding:16px 15px 8px;background:#F5F9FC;scroll-behavior:smooth}
  .ukb-body::-webkit-scrollbar{width:7px}.ukb-body::-webkit-scrollbar-thumb{background:#cfe0ee;border-radius:8px}

  .ukb-row{display:flex;margin:0 0 10px;animation:ukbIn .3s ease both}
  @keyframes ukbIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .ukb-row.bot{justify-content:flex-start}
  .ukb-row.user{justify-content:flex-end}
  .ukb-msg{max-width:82%;padding:11px 14px;border-radius:16px;font-size:14px;line-height:1.5;white-space:pre-line;word-wrap:break-word}
  .ukb-row.bot .ukb-msg{background:#fff;color:#16324B;border:1px solid #E4EEF6;border-bottom-left-radius:5px;box-shadow:0 2px 8px rgba(10,28,48,.05)}
  .ukb-row.user .ukb-msg{background:linear-gradient(135deg,#2EA7E6,#1671CE);color:#fff;border-bottom-right-radius:5px}
  .ukb-msg a{color:inherit;text-decoration:underline;text-underline-offset:2px;font-weight:600}
  .ukb-row.bot .ukb-msg a{color:#1265C3}

  .ukb-chips{display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 14px}
  .ukb-chip{font-size:13px;color:#0E4C8A;background:#fff;border:1px solid #CFE1F1;border-radius:999px;padding:8px 13px;cursor:pointer;text-align:left;
    transition:border-color .2s,background .2s,transform .15s;line-height:1.35}
  .ukb-chip:hover{border-color:#2EA7E6;background:#EAF3FC;transform:translateY(-1px)}
  .ukb-chip.wa{color:#0B7A45;border-color:#Bfe6cf;background:#F0FBF4;display:inline-flex;align-items:center;gap:7px}
  .ukb-chip.wa svg{width:15px;height:15px}
  .ukb-chip.all{color:#3B5568;border-style:dashed}

  .ukb-cat{width:100%;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:#7C96AC;margin:8px 2px 2px}

  .ukb-foot{border-top:1px solid #E7EFF6;background:#fff;padding:10px 12px}
  .ukb-inrow{display:flex;gap:8px;align-items:center}
  .ukb-inrow input{flex:1;border:1px solid #D6E3EF;border-radius:11px;padding:11px 13px;font-size:14px;font-family:inherit;color:#12324B;outline:none;transition:border-color .2s}
  .ukb-inrow input:focus{border-color:#2EA7E6;box-shadow:0 0 0 3px rgba(46,167,230,.14)}
  .ukb-send{flex:none;width:40px;height:40px;border-radius:11px;border:none;cursor:pointer;background:linear-gradient(135deg,#2EA7E6,#1265C3);display:grid;place-items:center;transition:transform .15s,opacity .2s}
  .ukb-send:hover{transform:translateY(-1px)}.ukb-send:disabled{opacity:.5;cursor:default;transform:none}
  .ukb-send svg{width:18px;height:18px;color:#fff}
  .ukb-note{text-align:center;font-size:10.5px;color:#93A6B8;margin-top:7px;letter-spacing:.01em}

  .ukb-bar{position:fixed;left:0;right:0;bottom:0;z-index:1150;display:none;align-items:center;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom,0));
    background:rgba(255,255,255,.94);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid rgba(10,28,48,.1)}
  .ukb-bar b{font-family:'Sora',sans-serif;font-size:13.5px;color:#0A1C30;font-weight:600}
  .ukb-bar small{display:block;font-size:11.5px;color:#5B7086;font-weight:400;margin-top:1px}
  .ukb-bar .ukb-open{margin-left:auto;border:none;border-radius:11px;padding:10px 16px;font-weight:600;font-size:13.5px;color:#fff;cursor:pointer;background:linear-gradient(135deg,#2EA7E6,#1265C3);font-family:inherit}
  .ukb-bardrop{width:38px;height:38px;border-radius:11px;flex:none;display:grid;place-items:center;background:linear-gradient(140deg,#2EA7E6,#1265C3)}
  .ukb-bardrop svg{width:20px;height:20px;color:#fff}

  @media (max-width:600px){
    .ukb-launcher{display:none}
    .ukb-bar{display:flex}
    .ukb-panel{right:0;left:0;bottom:0;width:100%;max-width:100%;height:88vh;max-height:88vh;border-radius:20px 20px 0 0}
  }
  @media (prefers-reduced-motion:reduce){
    .ukb-launcher::before{animation:none}
    .ukb-row,.ukb-panel{animation:none;transition:none}
  }`;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------------------------------------------------------------
     Icônes
     --------------------------------------------------------------- */
  var DROP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z"/><path d="M9.5 14a2.5 2.5 0 0 0 2.5 2.2" opacity=".7"/></svg>';
  var WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.7-1.3 1.3-1.9 1.3-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-2.9-1.3-4.8-4.2-5-4.4-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.4.9-.9 1-.7 1.4.8 1.3 1.7 2.1 3 2.8.3.2.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.3 1.4Z"/></svg>';

  /* ---------------------------------------------------------------
     Construction du widget
     --------------------------------------------------------------- */
  var launcher = document.createElement('button');
  launcher.className = 'ukb-launcher';
  launcher.setAttribute('aria-label', "Ouvrir l'assistant UNIK'EAU");
  launcher.innerHTML = DROP;

  var bar = document.createElement('div');
  bar.className = 'ukb-bar';
  bar.innerHTML =
    '<span class="ukb-bardrop">' + DROP + '</span>' +
    '<div><b>Une question&nbsp;?</b><small>R\u00e9ponses aux questions fr\u00e9quentes</small></div>' +
    '<button class="ukb-open" type="button">Ouvrir</button>';

  var panel = document.createElement('div');
  panel.className = 'ukb-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', "Assistant UNIK'EAU");
  panel.innerHTML =
    '<div class="ukb-head">' +
      '<span class="ukb-ava">' + DROP + '</span>' +
      '<div class="ukb-ht"><b>Assistant UNIK\'EAU</b>' +
        '<span class="ukb-sub"><span class="ukb-dot"></span>Questions fr\u00e9quentes</span></div>' +
      '<button class="ukb-x" type="button" aria-label="Fermer">\u00d7</button>' +
    '</div>' +
    '<div class="ukb-body" id="ukbBody"></div>' +
    '<div class="ukb-foot">' +
      '<div class="ukb-inrow">' +
        '<input id="ukbInput" type="text" autocomplete="off" placeholder="\u00c9crivez votre question\u2026" aria-label="\u00c9crivez votre question">' +
        '<button class="ukb-send" id="ukbSend" type="button" aria-label="Envoyer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg></button>' +
      '</div>' +
      '<div class="ukb-note">R\u00e9ponses pr\u00e9enregistr\u00e9es \u00b7 pour un devis, WhatsApp</div>' +
    '</div>';

  document.body.appendChild(launcher);
  document.body.appendChild(bar);
  document.body.appendChild(panel);

  var body = panel.querySelector('#ukbBody');
  var input = panel.querySelector('#ukbInput');
  var sendBtn = panel.querySelector('#ukbSend');
  var greeted = false;

  /* ---------------------------------------------------------------
     Rendu des messages et des chips
     --------------------------------------------------------------- */
  function linkify(text) {
    var esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    // numéro WhatsApp cliquable
    esc = esc.replace(/\+590 690 34 24 76/g, '<a href="' + WA_LINK + '" target="_blank" rel="noopener">+590 690 34 24 76</a>');
    // e-mail cliquable
    esc = esc.replace(/oelec\.guadeloupe@gmail\.com/g, '<a href="mailto:oelec.guadeloupe@gmail.com">oelec.guadeloupe@gmail.com</a>');
    return esc;
  }
  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function addMsg(who, text) {
    var row = document.createElement('div');
    row.className = 'ukb-row ' + who;
    row.innerHTML = '<div class="ukb-msg">' + linkify(text) + '</div>';
    body.appendChild(row);
    scrollDown();
  }

  function clearChips() {
    var old = body.querySelectorAll('.ukb-chips');
    for (var i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
  }

  function waChip(wrap) {
    var a = document.createElement('a');
    a.className = 'ukb-chip wa';
    a.href = WA_LINK; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = WA_ICON + 'Demander un devis';
    wrap.appendChild(a);
  }

  function questionChip(wrap, item) {
    var b = document.createElement('button');
    b.className = 'ukb-chip'; b.type = 'button';
    b.textContent = item.q;
    b.addEventListener('click', function () { answer(item); });
    wrap.appendChild(b);
  }

  function allChip(wrap) {
    var b = document.createElement('button');
    b.className = 'ukb-chip all'; b.type = 'button';
    b.textContent = 'Toutes les questions';
    b.addEventListener('click', showAll);
    wrap.appendChild(b);
  }

  /* Chips de départ (questions les plus fréquentes) */
  function showStarters() {
    clearChips();
    var wrap = document.createElement('div');
    wrap.className = 'ukb-chips';
    for (var i = 0; i < STARTERS.length; i++) {
      var it = byId(STARTERS[i]);
      if (it) questionChip(wrap, it);
    }
    allChip(wrap);
    body.appendChild(wrap);
    scrollDown();
  }

  /* Liste complète, regroupée par thème */
  function showAll() {
    clearChips();
    addMsg('bot', 'Voici toutes les questions, par th\u00e8me :');
    var wrap = document.createElement('div');
    wrap.className = 'ukb-chips';
    for (var c = 0; c < CATS.length; c++) {
      var cat = CATS[c];
      var items = QA.filter(function (x) { return x.cat === cat; });
      if (!items.length) continue;
      var lab = document.createElement('div');
      lab.className = 'ukb-cat'; lab.textContent = cat;
      wrap.appendChild(lab);
      for (var i = 0; i < items.length; i++) questionChip(wrap, items[i]);
    }
    body.appendChild(wrap);
    scrollDown();
  }

  /* Réponse à une question connue + chips liées */
  function answer(item) {
    clearChips();
    addMsg('user', item.q);
    setTimeout(function () {
      addMsg('bot', item.a);
      var wrap = document.createElement('div');
      wrap.className = 'ukb-chips';
      var related = QA.filter(function (x) { return x.cat === item.cat && x.id !== item.id; }).slice(0, 3);
      for (var i = 0; i < related.length; i++) questionChip(wrap, related[i]);
      waChip(wrap);
      allChip(wrap);
      body.appendChild(wrap);
      scrollDown();
    }, 180);
  }

  /* Saisie libre */
  function handleFree(text) {
    clearChips();
    addMsg('user', text);
    var hit = bestMatch(text);
    setTimeout(function () {
      if (hit) {
        addMsg('bot', hit.a);
        var wrap = document.createElement('div');
        wrap.className = 'ukb-chips';
        var related = QA.filter(function (x) { return x.cat === hit.cat && x.id !== hit.id; }).slice(0, 2);
        for (var i = 0; i < related.length; i++) questionChip(wrap, related[i]);
        waChip(wrap); allChip(wrap);
        body.appendChild(wrap);
        scrollDown();
      } else {
        addMsg('bot', "Je n'ai pas de r\u00e9ponse pr\u00e9enregistr\u00e9e \u00e0 cette question pr\u00e9cise. Le mieux, c'est d'\u00e9crire directement sur WhatsApp au " + WA_HUMAN + " : on vous r\u00e9pond rapidement.\nVous pouvez aussi choisir une question ci-dessous.");
        var wrap2 = document.createElement('div');
        wrap2.className = 'ukb-chips';
        waChip(wrap2); allChip(wrap2);
        body.appendChild(wrap2);
        scrollDown();
      }
    }, 180);
  }

  function greet() {
    if (greeted) return;
    greeted = true;
    addMsg('bot', "Bonjour \ud83d\udc4b Voici les questions qu'on nous pose le plus souvent. Choisissez, ou \u00e9crivez la v\u00f4tre.");
    showStarters();
  }

  /* ---------------------------------------------------------------
     Ouverture / fermeture
     --------------------------------------------------------------- */
  var isOpen = false;
  function openPanel() {
    isOpen = true;
    panel.classList.add('is-open');
    launcher.classList.add('is-open');
    launcher.setAttribute('aria-label', "Fermer l'assistant");
    greet();
    setTimeout(function () { if (window.innerWidth > 600) input.focus(); }, 260);
  }
  function closePanel() {
    isOpen = false;
    panel.classList.remove('is-open');
    launcher.classList.remove('is-open');
    launcher.setAttribute('aria-label', "Ouvrir l'assistant UNIK'EAU");
  }
  function toggle() { isOpen ? closePanel() : openPanel(); }

  launcher.addEventListener('click', toggle);
  bar.querySelector('.ukb-open').addEventListener('click', openPanel);
  panel.querySelector('.ukb-x').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen) closePanel(); });

  function submit() {
    var v = input.value.trim();
    if (!v) return;
    input.value = '';
    handleFree(v);
  }
  sendBtn.addEventListener('click', submit);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
})();
