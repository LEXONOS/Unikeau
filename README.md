# UNIK'EAU - Fontaine Guadeloupe

Site vitrine une page (formule Essentiel) pour UNIK'EAU, marque commerciale d'O'ELEC.
Fontaines a eau raccordees au reseau en Guadeloupe.

Code 100 % natif : HTML5, CSS3, JavaScript vanilla. Aucun framework, aucune etape
de build. Le site fonctionne en ouvrant `index.html` et se deploie tel quel sur un
hebergement mutualise OVH comme sur Vercel.

## Structure

```
index.html            Page principale (landing de conversion)
mentions-legales.html Page mentions legales
css/style.css         Feuille de style unique
js/main.js            Interactions (menu, tarifs, apparition au scroll)
assets/               Logo (favicon), image de partage Open Graph
img/                  Photos du client (voir img/README.txt)
```

## Ce qui reste a completer

Le site est complet et deployable. Trois elements sont marques dans le code
et a fournir par le client :

- **Photos** : blocs `IMAGE A FOURNIR`. Voir `img/README.txt` pour les noms de fichiers exacts.
- **Temoignages** : blocs `[A COMPLETER]` dans la section "Pourquoi UNIK'EAU". A remplacer par de vrais avis clients (aucun temoignage invente).
- **Dimensions du modele comptoir** : indiquees "sur demande" (jamais communiquees).

## Mise en ligne sur OVH (FileZilla)

1. Se connecter en FTP a l'hebergement OVH.
2. Ouvrir le dossier racine web (`www`).
3. Deposer le CONTENU de ce dossier (index.html, mentions-legales.html, css/, js/, assets/, img/) directement dans `www`, pour obtenir `www/index.html` a la racine.
4. Le fichier `README.md` n'a pas besoin d'etre mis en ligne.
5. Verifier que le nom de domaine (fontaine-guadeloupe.fr) pointe bien sur l'hebergement.

## Mise en ligne sur Vercel (alternative)

Pousser ce dossier sur un depot GitHub, puis importer le depot dans Vercel.
Aucune configuration : projet statique, deploiement automatique.

---

Realisation Novalem.
