# Portfolio — Youssef EL FARISSI

Portfolio personnel pour le **BTS SIO option SLAM**, session 2026 — Lycée Chaptal, Quimper.

Ce portfolio a été conçu pour être présenté lors de l'épreuve **E6** (parcours de professionnalisation).

---

## 🎨 Identité visuelle

- **Style** : Dark mode haut de gamme · inspiré de Linear et Stripe
- **Effets** : Glassmorphism, gradients ambiants, animations fluides
- **Couleurs** : Noir profond (`#050507`) · Bleu électrique (`#007BFF`) en accent
- **Typographie** : Geist (sans/mono) + Instrument Serif (italique)

---

## 📁 Structure du projet

```
portfolio/
├── index.html              # Page principale
├── css/
│   └── style.css           # Styles complets
├── js/
│   └── script.js           # Interactions, animations, filtres
├── php/
│   └── contact.php         # Traitement du formulaire de contact
├── assets/
│   ├── images/             # Logos et certifications
│   │   ├── bunzl-logo.png
│   │   ├── pix-1.png
│   │   └── pix-2.png
│   └── docs/               # PDF du dossier E5/E6
│       ├── CV_Youssef_EL_FARISSI.pdf
│       ├── Rapport_Stage_BUNZL.pdf
│       ├── Rapport_Stage_DecoPlatre.pdf
│       ├── Tableau_de_Synthese.pdf
│       └── Veille_Informatique.pdf
└── README.md
```

---

## 🚀 Déploiement

### Option 1 — Hébergeur classique avec PHP (recommandé)

Uploadez le dossier `portfolio/` à la racine de votre hébergement (Hostinger, OVH, IONOS, etc.) via FTP / SFTP / cPanel. Le formulaire de contact fonctionnera grâce au PHP.

**À adapter dans `php/contact.php`** :
- L'adresse `$destinataire` (déjà préréglée sur `yyouss.elff@gmail.com`)
- L'adresse `$expediteur_systeme` (à mettre une vraie adresse de votre domaine, sinon le mail finit en spam)

### Option 2 — GitHub Pages (sans PHP)

```bash
git init
git add .
git commit -m "Portfolio BTS SIO SLAM"
git branch -M main
git remote add origin git@github.com:sh6n/portfolio.git
git push -u origin main
```

Puis activer GitHub Pages dans les paramètres du dépôt (branche `main`, dossier `/`).
⚠️ Le formulaire ne pourra pas envoyer de mail directement — un fallback automatique ouvre le client mail de l'utilisateur.

### Option 3 — Local

Pour tester en local avec PHP :
```bash
cd portfolio
php -S localhost:8000
```
Puis ouvrir http://localhost:8000

Sans PHP (simple double-clic sur `index.html`), tout fonctionne sauf l'envoi du formulaire (le fallback mailto prend le relais).

---

## ✍️ Mettre à jour le contenu

- **Textes / projets / dates** : tout est dans `index.html`, sections clairement commentées (`<!-- ============= ... ============= -->`)
- **Couleurs / typographie** : variables CSS au début de `css/style.css` (`:root`)
- **Documents PDF** : remplacer dans `assets/docs/`
- **Année de copyright** : se met à jour automatiquement via JS

---

## ✅ Checklist E6 — Tout est prêt

- [x] Page d'accueil avec présentation
- [x] Section À propos + explication BTS SIO SLAM/SISR
- [x] Compétences techniques détaillées
- [x] Parcours scolaire en timeline
- [x] **Stages** détaillés (BUNZL + Déco Plâtre) avec missions et liens vers rapports
- [x] **Tableau de Synthèse** mis en avant en CTA principal
- [x] **14 réalisations** professionnelles filtrables par catégorie
- [x] **Veille technologique** complète (Sécurité des Apps Mobiles)
- [x] **Certifications PIX** (×2) mises en valeur
- [x] Formulaire de contact + liens directs
- [x] Responsive (mobile / tablette / desktop)
- [x] Performance optimisée

---

## 📞 Contact

- **Email** : yyouss.elff@gmail.com
- **LinkedIn** : [in/youssef-el-farissi](https://www.linkedin.com/in/youssef-el-farissi-245a30369/)
- **GitHub** : [@sh6n](https://github.com/sh6n)

---

*Bonne chance pour ton oral E6 ! 🚀*
