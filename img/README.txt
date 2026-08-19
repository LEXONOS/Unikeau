PHOTOS DU CLIENT A DEPOSER DANS CE DOSSIER /img
================================================

Le site affiche des blocs "IMAGE A FOURNIR" tant que ces fichiers ne sont
pas presents. Depose simplement les images avec EXACTEMENT ces noms de
fichiers (format .webp de preference, sinon .jpg en renommant l'extension
dans le HTML), et les blocs disparaitront automatiquement.

Fichiers attendus
-----------------
fontaine-colonne.webp     Grande fontaine sur pied, sur fond clair. Portrait, ~900 x 1200 px.
                          (utilisee dans le hero + la carte modele "colonne")

fontaine-comptoir.webp    Modele comptoir, sur fond clair. ~900 x 1000 px.
                          (carte modele "comptoir")

situation-bureau.webp     Fontaine en situation dans un bureau / une entreprise. Paysage, ~1000 x 750 px.

situation-commerce.webp   Fontaine en accueil ou commerce. Paysage, ~1000 x 750 px.

situation-maison.webp     Comptoir pose dans une cuisine. Paysage, ~1000 x 750 px.

confiance.webp            Verre d'eau claire, ou plan rapproche des cartouches / de la
                          filtration. Portrait, ~800 x 1000 px.
                          (section sombre "L'eau du robinet, enfin sans hesiter")

Comment inserer une image
--------------------------
1. Ouvre index.html.
2. Cherche le nom du fichier (ex. "fontaine-colonne.webp").
3. Remplace tout le bloc <div class="ph"> ... </div> par :
   <img src="img/fontaine-colonne.webp" alt="Fontaine a eau colonne UNIK'EAU" loading="lazy">
   (garde un texte alt descriptif pour le referencement)

Autres visuels de marque (optionnel)
------------------------------------
- assets/og-image.png : image de partage sur les reseaux (1200 x 630). Remplacable par un vrai visuel.
- assets/favicon.svg  : icone d'onglet. Remplacable par le vrai logo si tu as une version carree.
- Logo d'en-tete : actuellement en typographie "UNIK'EAU" + goutte. Pour mettre le vrai logo,
  remplace le bloc <a class="brand"> ... </a> par une <img src="assets/logo.png" ...>.
