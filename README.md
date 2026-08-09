# Site UNIK'EAU — fontaine-guadeloupe.fr

> **Charte graphique** : ouvre `charte.html` dans un navigateur (ou `fontaine-guadeloupe.fr/charte.html` une fois en ligne).
> Elle documente la palette « Sable & Lagon », les polices, les composants et les règles d'usage.
> Toutes les couleurs sont définies en haut de `styles.css`, dans le bloc `:root` — change une valeur là, elle change partout.

Site vitrine one-page. Que du HTML / CSS / JS, aucun outil à installer, aucune commande à taper.

---

## 1. Avant de mettre en ligne : 3 choses à changer

Ouvre `index.html` avec un éditeur de texte (Bloc-notes, TextEdit, ou directement sur GitHub).
Fais **Ctrl+F** et cherche `A-MODIFIER`. Tu tomberas sur 2 endroits :

**Endroit 1 — les deux adresses e-mail** (vers la fin, section contact)

```html
<li><span>E-mail</span><a href="mailto:contact@fontaine-guadeloupe.fr">contact@fontaine-guadeloupe.fr</a></li>
<li><span>E-mail</span><a href="mailto:oelec@fontaine-guadeloupe.fr">oelec@fontaine-guadeloupe.fr</a></li>
```

Remplace les adresses **aux deux endroits de chaque ligne** : dans le `mailto:` et dans le texte affiché.

**Endroit 2 — les mentions légales** (footer)

```html
<p>Siège : 97122 Baie-Mahault, Guadeloupe · SIREN 000 000 000</p>
```

Mets le SIREN d'O'ELEC et l'adresse exacte du siège.

**Bonus — l'e-mail dans le bloc Google** (tout en haut du fichier, dans `application/ld+json`)

```json
"email": "contact@fontaine-guadeloupe.fr",
```

Même adresse que ci-dessus.

### Les tarifs

Ils sont écrits en clair dans `index.html`, section `<!-- TARIFS -->` : cherche `data-count="50"` et `data-count="70"`.
Change le chiffre **à deux endroits** sur la ligne (dans `data-count` et dans le texte), et pense aussi au bloc `50 €` des indicateurs du hero.

---

## 2. Mettre en ligne sur GitHub + Vercel

### Étape A — créer le dépôt GitHub

1. Va sur **github.com**, connecte-toi.
2. En haut à droite, clique sur le **+** puis **New repository**.
3. Repository name : `unikeau-site`
4. Coche **Private** (ou Public, comme tu veux).
5. Ne coche rien d'autre. Clique **Create repository**.

### Étape B — envoyer les fichiers

1. Sur la page qui s'affiche, clique sur le lien **uploading an existing file**.
2. Décompresse le zip sur ton ordinateur.
3. Ouvre le dossier `unikeau-site` et **sélectionne tout ce qu'il y a dedans** (`index.html`, `styles.css`, `script.js`, le dossier `assets`, etc.) puis glisse-le dans la fenêtre du navigateur.

   > Important : tu glisses **le contenu** du dossier, pas le dossier lui-même. `index.html` doit se retrouver à la racine du dépôt.
4. En bas, clique le bouton vert **Commit changes**.

### Étape C — brancher Vercel

1. Va sur **vercel.com**, clique **Sign up** puis **Continue with GitHub**.
2. Une fois connecté : bouton **Add New…** → **Project**.
3. Vercel liste tes dépôts GitHub. À côté de `unikeau-site`, clique **Import**.
4. Ne touche à aucun réglage (Framework Preset reste sur *Other*).
5. Clique **Deploy**.
6. Attends ~30 secondes. Vercel t'affiche l'aperçu et une adresse du type
   `unikeau-site.vercel.app`. **C'est ton lien d'aperçu**, il est déjà en ligne.

### Étape D — brancher le domaine fontaine-guadeloupe.fr

Le domaine est chez OVH.

1. Dans Vercel, ouvre ton projet → onglet **Settings** → **Domains**.
2. Tape `fontaine-guadeloupe.fr` → **Add**. Choisis l'option qui redirige `www` vers le domaine nu.
3. Vercel affiche les valeurs à recopier. Note-les.
4. Va sur **ovh.com** → **Espace client** → **Noms de domaine** → `fontaine-guadeloupe.fr` → onglet **Zone DNS**.
5. Modifie l'enregistrement **A** de `fontaine-guadeloupe.fr` : mets l'adresse IP donnée par Vercel (généralement `76.76.21.21`).
6. Ajoute (ou modifie) un enregistrement **CNAME** pour `www` avec la valeur donnée par Vercel (généralement `cname.vercel-dns.com.`).
7. Valide. Compte entre 15 minutes et quelques heures. Vercel passe le domaine en vert et installe le HTTPS tout seul.

> Ne touche pas aux enregistrements **MX** ni au TXT commençant par `v=spf1` : ce sont tes e-mails Zimbra, ils doivent rester tels quels.

### Modifier le site plus tard

Sur GitHub, ouvre le fichier, clique sur le crayon, modifie, **Commit changes**.
Vercel redéploie tout seul en une minute. Rien d'autre à faire.

---

## 3. Ce qu'il y a dans le dossier

| Fichier | À quoi ça sert |
|---|---|
| `index.html` | Tout le contenu du site (textes, tarifs, coordonnées) |
| `styles.css` | Les couleurs, les polices, la mise en page |
| `script.js` | Le menu mobile, les animations, la FAQ |
| `assets/` | Logo, photos détourées, icônes, fiche technique PDF, image de partage |
| `charte.html` | La charte graphique, consultable dans le navigateur |
| `robots.txt`, `sitemap.xml` | Pour Google |
| `vercel.json` | Réglages du serveur (cache, sécurité) |

### Les photos

Les deux fontaines ont été détourées sur fond transparent et converties en `.webp` (60 Ko au lieu de 450 Ko).
Pour remplacer une photo : prends-la contre un mur clair, garde exactement le même nom de fichier, et remplace-la dans `assets/`.

> La photo de la petite fontaine est à l'origine en 142×166 px. Elle a été agrandie et nettoyée, mais une vraie photo au téléphone donnera un bien meilleur rendu.

---

## 4. Points à vérifier avant de communiquer dessus

- Les tarifs affichés : **50 € TTC/mois** (comptoir, 1 à 5 personnes, 2 entretiens/an) et **70 € TTC/mois** (colonne, 6 personnes et plus, 4 entretiens/an).
- Les fiches modèles se déplient au survol sur ordinateur, et au clic sur le bouton « Caractéristiques » sur mobile.
- Aucune certification n'est revendiquée sur le site (pas d'ACS, pas de NSF). C'est volontaire : tant que tu ne l'as pas, il ne faut rien afficher.
- Le numéro WhatsApp utilisé partout est le **+590 690 34 24 76**. Il apparaît dans `index.html` sous la forme `590690342476` dans les liens `wa.me`.
- La page Facebook liée est `facebook.com/unikeau`.
