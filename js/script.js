/* ==========================================================================
   YOUSSEF EL FARISSI — PORTFOLIO
   Interactions
   ========================================================================== */

(() => {
  'use strict';

  /* -------- NAV scroll state -------- */
  const nav = document.querySelector('.nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile menu toggle -------- */
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  /* -------- Reveal on scroll -------- */
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    if (el.dataset.d) el.style.setProperty('--d', el.dataset.d);
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* -------- Project filters -------- */
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.f;
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      projects.forEach(p => {
        if (f === 'all' || p.dataset.cat === f) p.classList.remove('hidden');
        else p.classList.add('hidden');
      });
    });
  });

  /* -------- Project cards: cursor-following glow -------- */
  projects.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* -------- Smooth scroll offset for fixed nav -------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* -------- Update copyright year -------- */
  // Footer year is hard-coded to 2026; left intentionally static.

})();

/* ============================================================
   VEILLE INTERACTIVE — Timeline + Articles
   ============================================================ */
(function () {
  const veilleData = [
    {
      title: 'Septembre – Octobre 2024',
      summary: 'Rentrée 2024 — la CNIL pose les bases de ses prescriptions sur les apps mobiles, et l\'OWASP MASVS s\'impose comme référentiel de sécurité pour le développement.',
      articles: [
        {
          source: 'CNIL',
          date: '12 septembre 2024',
          title: 'Publication des prescriptions définitives sur les applications mobiles',
          desc: 'La CNIL publie ses recommandations définitives sur la collecte de données via apps mobiles : consentement éclairé, minimisation des données et chiffrement obligatoire.',
          url: 'https://www.cnil.fr/'
        },
        {
          source: 'OWASP',
          date: '3 octobre 2024',
          title: 'OWASP Mobile Top 10 — révision 2024',
          desc: 'L\'OWASP actualise son classement des 10 risques majeurs pour les apps mobiles. Les contrôles insuffisants, les stockages non chiffrés et les communications non sécurisées arrivent en tête.',
          url: 'https://owasp.org/www-project-mobile-app-security/'
        }
      ]
    },
    {
      title: 'Novembre – Décembre 2024',
      summary: 'Fin 2024 — les rapports annuels de cybersécurité tirent la sonnette d\'alarme : l\'IA générative démultiplie les attaques de phishing mobile, le sideloading explose.',
      articles: [
        {
          source: 'Zimperium',
          date: '5 novembre 2024',
          title: 'Mobile Threat Report 2024 — montée en flèche du sideloading',
          desc: 'Le rapport annuel de Zimperium révèle une hausse de 45% des apps malveillantes installées hors stores officiels. Les malwares bancaires ciblent désormais iOS via le sideloading.',
          url: 'https://www.zimperium.com/'
        },
        {
          source: 'Le Monde Informatique',
          date: '18 décembre 2024',
          title: 'Le phishing mobile dopé à l\'IA explose en 2024',
          desc: 'Les outils d\'IA permettent de générer des SMS et emails de phishing ultra-personnalisés à grande échelle. Les utilisateurs d\'apps bancaires sont les cibles privilégiées.',
          url: 'https://www.lemondeinformatique.fr/'
        }
      ]
    },
    {
      title: 'Janvier – Février 2025',
      summary: 'Début 2025 — Google publie un bulletin Android critique, et Kaspersky découvre SparkCat, un malware iOS révolutionnaire qui vole des cryptomonnaies via OCR.',
      articles: [
        {
          source: 'Android',
          date: '5 février 2025',
          title: 'Bulletin de sécurité Android — Patch Level 2025-02-05',
          desc: 'Google corrige 46 CVE dont 3 critiques permettant l\'exécution de code à distance. La mise à jour est fortement recommandée pour tous les appareils Android 10 et supérieurs.',
          url: 'https://source.android.com/docs/security/bulletin/2025-02-01?hl=fr'
        },
        {
          source: 'Kaspersky',
          date: '6 février 2025',
          title: 'SparkCat — premier malware OCR ciblant iOS',
          desc: 'Kaspersky identifie SparkCat, un SDK malveillant présent dans des apps légitimes sur l\'App Store. Il utilise l\'OCR pour lire les phrases de récupération de wallets crypto affichées à l\'écran.',
          url: 'https://www.kaspersky.fr/'
        }
      ]
    },
    {
      title: 'Mars – Avril 2025',
      summary: 'Printemps 2025 — la CNIL annonce un programme de contrôle ciblé sur les apps mobiles et publie ses recommandations techniques actualisées (TLS, Keystore, OWASP MASVS).',
      articles: [
        {
          source: 'CNIL',
          date: '14 mars 2025',
          title: '25% des contrôles 2025 viseront les apps mobiles',
          desc: 'La CNIL annonce que le quart de ses contrôles 2025 portera sur les applications mobiles, en priorité celles du secteur santé, banque et e-commerce. Risque de sanctions en hausse.',
          url: 'https://www.cnil.fr/'
        },
        {
          source: 'CNIL',
          date: '2 avril 2025',
          title: 'Recommandations techniques actualisées pour apps mobiles',
          desc: 'La CNIL met à jour sa fiche technique : obligation de TLS 1.2 minimum, usage du Keystore Android / Secure Enclave iOS, conformité OWASP MASVS recommandée pour toute app traitant des données personnelles.',
          url: 'https://www.cnil.fr/'
        }
      ]
    },
    {
      title: 'Mai – Juin 2025',
      summary: 'Mi-2025 — Apple révèle ses chiffres annuels de l\'App Store et durcit ses politiques. WWDC 2025 met l\'accent sur la confidentialité avec de nouvelles API sécurisées.',
      articles: [
        {
          source: 'Apple',
          date: '8 mai 2025',
          title: 'Rapport annuel App Store — 2 milliards de transactions frauduleuses bloquées',
          desc: 'Apple publie son rapport 2024 : plus de 2 milliards de tentatives de fraude bloquées, 47 000 apps rejetées pour collecte excessive de données. Les contrôles de revue sont renforcés.',
          url: 'https://support.apple.com/fr-fr/100100'
        },
        {
          source: 'Apple',
          date: '9 juin 2025',
          title: 'WWDC 2025 — nouvelles API de confidentialité dans iOS 19',
          desc: 'iOS 19 introduit de nouvelles API de permission granulaires : accès partiel aux contacts, localisation "à la demande" et sandbox renforcée pour les extensions d\'apps.',
          url: 'https://developer.apple.com/'
        }
      ]
    },
    {
      title: 'Juillet – Août 2025',
      summary: 'Été 2025 — découverte d\'une vague de malwares bancaires Android (Anatsa, Coyote) ciblant les apps de banque française et européenne.',
      articles: [
        {
          source: 'Écran Mobile',
          date: '21 juillet 2025',
          title: 'Anatsa — le malware bancaire qui contourne Google Play Protect',
          desc: 'Anatsa se diffuse via de fausses apps PDF sur le Play Store. Il superpose de fausses fenêtres de connexion sur les apps bancaires et exfiltre les identifiants. 650 banques ciblées en Europe.',
          url: 'https://www.ecranmobile.fr/'
        },
        {
          source: 'Kaspersky',
          date: '14 août 2025',
          title: 'Coyote cible les banques françaises sur Android',
          desc: 'Le malware Coyote, déjà actif au Brésil, fait son apparition en France. Il intercepte les codes OTP et vide les comptes en quelques secondes via des overlays dynamiques.',
          url: 'https://www.kaspersky.fr/'
        }
      ]
    },
    {
      title: 'Septembre – Octobre 2025',
      summary: 'Rentrée 2025 — Google déploie Play Protect 2.0 avec analyse comportementale en temps réel. L\'OWASP publie sa version MASVS 2.1 avec de nouveaux contrôles IA.',
      articles: [
        {
          source: 'Android',
          date: '15 septembre 2025',
          title: 'Play Protect 2.0 — détection comportementale en temps réel',
          desc: 'Google déploie Play Protect 2.0 : analyse comportementale embarquée sur le terminal, sans envoi de données dans le cloud. Détection de 40% de malwares supplémentaires selon Google.',
          url: 'https://source.android.com/'
        },
        {
          source: 'OWASP',
          date: '30 octobre 2025',
          title: 'OWASP MASVS 2.1 — nouveaux contrôles pour les apps IA',
          desc: 'La version 2.1 du MASVS intègre des contrôles spécifiques aux apps embarquant de l\'IA : protection des modèles locaux, validation des sorties, et prévention du prompt injection sur mobile.',
          url: 'https://owasp.org/'
        }
      ]
    },
    {
      title: 'Novembre – Décembre 2025',
      summary: 'Fin 2025 — bilan annuel de cybersécurité mobile : record de vulnérabilités publiées, montée du ransomware mobile et premières attaques sur wallets crypto hardware.',
      articles: [
        {
          source: 'Zimperium',
          date: '10 novembre 2025',
          title: 'Bilan 2025 — record de 1 200 CVE mobiles publiées',
          desc: 'Le rapport annuel de Zimperium recense 1 200 CVE mobiles en 2025, un record. 23% concernent des failles dans les bibliothèques tierces intégrées aux apps via SDK publicitaires.',
          url: 'https://www.zimperium.com/'
        },
        {
          source: 'Le Monde Informatique',
          date: '8 décembre 2025',
          title: 'Le ransomware mobile sort de l\'ombre',
          desc: 'Première vague de ransomwares mobiles ciblant les PME via des apps de gestion d\'équipe. Chiffrement des fichiers professionnels stockés sur le téléphone, rançon demandée en cryptomonnaie.',
          url: 'https://www.lemondeinformatique.fr/'
        }
      ]
    },
    {
      title: 'Janvier – Février 2026',
      summary: 'Début 2026 — entrée en vigueur du Cyber Resilience Act européen pour les apps. La CNIL ouvre ses premiers contentieux contre des éditeurs non conformes.',
      articles: [
        {
          source: 'CNIL',
          date: '15 janvier 2026',
          title: 'Premières sanctions CRA — 3 éditeurs sanctionnés',
          desc: 'Application du Cyber Resilience Act : trois éditeurs d\'apps mobiles sanctionnés pour absence de mise à jour de sécurité dans les délais et pour collecte excessive de données.',
          url: 'https://www.cnil.fr/'
        },
        {
          source: 'OWASP',
          date: '3 février 2026',
          title: 'Lancement du Mobile Security Verification Toolkit',
          desc: 'Outil open-source officiel de l\'OWASP permettant aux développeurs de tester automatiquement la conformité de leur app mobile aux contrôles MASVS. Intégration CI/CD facilitée.',
          url: 'https://owasp.org/'
        }
      ]
    },
    {
      title: 'Mars – Mai 2026',
      summary: 'Printemps 2026 — Apple et Google harmonisent leurs API de sécurité. La France lance un label "App Sécurisée" pour les services publics et bancaires.',
      articles: [
        {
          source: 'Apple',
          date: '20 mars 2026',
          title: 'Apple et Google standardisent l\'attestation d\'intégrité',
          desc: 'Annonce conjointe d\'une API unifiée d\'attestation d\'intégrité d\'app, permettant aux services bancaires et de santé de vérifier qu\'une app n\'a pas été modifiée ou clonée.',
          url: 'https://developer.apple.com/'
        },
        {
          source: 'CNIL',
          date: '4 mai 2026',
          title: 'Lancement du label "App Sécurisée" en France',
          desc: 'L\'ANSSI et la CNIL co-pilotent un label de sécurité pour les apps mobiles des services publics, bancaires et de santé. Audit indépendant requis tous les 18 mois.',
          url: 'https://www.cnil.fr/'
        }
      ]
    }
  ];

  const vtPeriods = document.querySelectorAll('.vt-period');
  const vtTrack   = document.getElementById('vtTrack');
  const vtPrev    = document.getElementById('vtPrev');
  const vtNext    = document.getElementById('vtNext');
  const vcPeriodTag     = document.getElementById('vcPeriodTag');
  const vcPeriodTitle   = document.getElementById('vcPeriodTitle');
  const vcPeriodSummary = document.getElementById('vcPeriodSummary');
  const vcArticles      = document.getElementById('vcArticles');

  if (!vtTrack) return; // pas de section veille sur cette page

  let currentPeriod = 0;

  function renderPeriod(idx) {
    if (idx < 0 || idx >= veilleData.length) return;
    currentPeriod = idx;
    const data = veilleData[idx];

    vtPeriods.forEach((btn, i) => btn.classList.toggle('active', i === idx));

    vcPeriodTag.textContent     = `Période ${idx + 1} / ${veilleData.length}`;
    vcPeriodTitle.textContent   = data.title;
    vcPeriodSummary.textContent = data.summary;

    vcArticles.style.animation = 'none';
    vcArticles.offsetHeight;
    vcArticles.style.animation = '';

    vcArticles.innerHTML = data.articles.map(a => `
      <article class="vc-article">
        <div class="vc-article-head">
          <span class="vc-article-source">${a.source}</span>
          <span class="vc-article-date">${a.date}</span>
        </div>
        <h4 class="vc-article-title">${a.title}</h4>
        <p class="vc-article-desc">${a.desc}</p>
        <a href="${a.url}" target="_blank" rel="noopener" class="vc-article-link">
          <span>Lire l'article</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3h7v7M21 3l-9 9M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6"/></svg>
        </a>
      </article>
    `).join('');

    vtPrev.disabled = idx === 0;
    vtNext.disabled = idx === veilleData.length - 1;

    const activeBtn = vtTrack.children[idx];
    if (activeBtn) activeBtn.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  }

  vtPeriods.forEach((btn, i) => btn.addEventListener('click', () => renderPeriod(i)));
  vtPrev.addEventListener('click', () => renderPeriod(currentPeriod - 1));
  vtNext.addEventListener('click', () => renderPeriod(currentPeriod + 1));

  renderPeriod(0);
})();
