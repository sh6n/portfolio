/* ===========================================================
   YOUSSEF EL FARISSI · PORTFOLIO
   Interactions & Animations
   =========================================================== */

(() => {
  'use strict';

  /* ------ Année dynamique footer ------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------ Nav scroll state ------ */
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  const handleScroll = () => {
    const y = window.scrollY;
    if (y > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = y;
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ------ Mobile menu toggle ------ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ------ Reveal on scroll ------ */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.section, .timeline-item, .skill-block, .internship-card, .project-card, .veille-card, .cert-card, .contact-link, .big-cta, .veille-hero')
    .forEach(el => {
      el.classList.add('fade-up');
      observer.observe(el);
    });

  /* ------ Hero reveal staggered ------ */
  document.querySelectorAll('.hero .reveal').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0, 10);
    el.style.setProperty('--delay', delay);
    el.style.animationDelay = `${delay}ms`;
  });

  /* ------ Card glow follow cursor ------ */
  const glowCards = document.querySelectorAll('.skill-block, .internship-card, .project-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${x}%`);
      card.style.setProperty('--my', `${y}%`);
    });
  });

  /* ------ Projects filter ------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.cat;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'reveal 0.5s var(--ease) forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ------ Smooth scroll w/ offset ------ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ------ Active nav link on scroll ------ */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const setActiveNav = () => {
    const y = window.scrollY + 150;
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      if (y >= top && y < top + h) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.remove('active-nav');
      if (a.getAttribute('href') === `#${current}`) {
        a.classList.add('active-nav');
      }
    });
  };
  window.addEventListener('scroll', setActiveNav, { passive: true });

  /* ------ Contact form (graceful fallback if PHP unavailable) ------ */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      feedback.className = 'form-feedback';
      feedback.textContent = 'Envoi en cours...';

      const data = new FormData(form);

      // Validation côté client
      const name = data.get('name')?.trim();
      const email = data.get('email')?.trim();
      const message = data.get('message')?.trim();

      if (!name || !email || !message) {
        feedback.className = 'form-feedback error';
        feedback.textContent = 'Merci de remplir tous les champs.';
        return;
      }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });

        if (res.ok) {
          const result = await res.json().catch(() => ({ success: true }));
          if (result.success) {
            feedback.className = 'form-feedback success';
            feedback.textContent = 'Message envoyé ! Je vous réponds rapidement.';
            form.reset();
          } else {
            throw new Error(result.error || 'Erreur');
          }
        } else {
          throw new Error('Erreur serveur');
        }
      } catch (err) {
        // Fallback : ouvrir le mail client
        feedback.className = 'form-feedback';
        feedback.innerHTML = 'Le serveur PHP n\'est pas disponible. <a href="mailto:yyouss.elff@gmail.com?subject=' +
          encodeURIComponent(data.get('subject') || 'Contact portfolio') +
          '&body=' + encodeURIComponent((data.get('message') || '') + '\n\n— ' + name) +
          '" style="color: var(--accent-bright); text-decoration: underline;">Cliquez ici pour ouvrir votre client mail</a>.';
      }
    });
  }

  /* ------ Console signature ------ */
  console.log('%c Youssef EL FARISSI %c · Portfolio BTS SIO SLAM ',
    'background:#007BFF;color:white;padding:6px 10px;border-radius:4px 0 0 4px;font-weight:bold;',
    'background:#0a0a0f;color:#9a9aa3;padding:6px 10px;border-radius:0 4px 4px 0;');

  /* ===========================================================
     VEILLE TECHNOLOGIQUE — Données + Timeline interactive
     =========================================================== */
  const veilleData = [
    {
      title: 'Septembre – Octobre 2024',
      summary: 'Rentrée 2024 — la CNIL pose les bases de ses prescriptions sur les apps mobiles, et l\'OWASP MASVS s\'impose comme référentiel de sécurité pour le développement.',
      articles: [
        {
          source: 'CNIL',
          date: '24 septembre 2024',
          title: 'Publication des prescriptions définitives sur les applications mobiles',
          desc: 'La CNIL publie ses recommandations finales encadrant la collecte de données personnelles dans les apps mobiles : information claire de l\'utilisateur, recueil du consentement, minimisation des données.',
          url: 'https://www.cnil.fr/fr/applications-mobiles-publication-de-la-version-finale-des-recommandations-pour-mieux-proteger-la'
        },
        {
          source: 'OWASP',
          date: 'Octobre 2024',
          title: 'OWASP Mobile Top 10 — révision 2024',
          desc: 'Mise à jour du Top 10 des risques majeurs des apps mobiles : credentials hardcodées, mauvaise gestion des sessions, communications non sécurisées en tête.',
          url: 'https://owasp.org/www-project-mobile-top-10/'
        }
      ]
    },
    {
      title: 'Novembre – Décembre 2024',
      summary: 'Fin 2024 — les rapports annuels de cybersécurité tirent la sonnette d\'alarme : l\'IA générative démultiplie les attaques de phishing mobile, le sideloading explose.',
      articles: [
        {
          source: 'Zimperium',
          date: '12 décembre 2024',
          title: 'Mobile Threat Report 2024 — montée en flèche du sideloading',
          desc: '68% des menaces mobiles passent désormais par des apps installées en dehors des stores officiels, en particulier dans les secteurs fintech et crypto.',
          url: 'https://www.zimperium.com/global-mobile-threat-report/'
        },
        {
          source: 'Le Monde Informatique',
          date: '4 décembre 2024',
          title: 'Le phishing mobile dopé à l\'IA explose en 2024',
          desc: 'Les attaques de smishing (SMS phishing) générées par IA augmentent de 318%. Les messages sont désormais quasi indétectables des communications légitimes.',
          url: 'https://www.lemondeinformatique.fr/'
        }
      ]
    },
    {
      title: 'Janvier – Février 2025',
      summary: 'Début 2025 — Google publie un bulletin Android critique, et Kaspersky découvre SparkCat, un malware iOS qui révolutionne le vol de cryptomonnaies via OCR.',
      articles: [
        {
          source: 'Android',
          date: '3 février 2025',
          title: 'Bulletin de sécurité Android — Patch Level 2025-02-05',
          desc: 'Correction de plusieurs failles critiques, dont une élévation de privilèges via le Framework Android. Google Play Protect renforce son filtrage côté store.',
          url: 'https://source.android.com/docs/security/bulletin/2025-02-01?hl=fr'
        },
        {
          source: 'Kaspersky',
          date: '6 février 2025',
          title: 'SparkCat — premier malware OCR ciblant iOS',
          desc: 'Malware découvert dans une vingtaine d\'apps de l\'App Store qui scanne les photos via OCR pour voler les phrases de récupération crypto. Apple et Google retirent les apps infectées.',
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
          date: '21 mars 2025',
          title: '25% des contrôles 2025 viseront les apps mobiles',
          desc: 'La CNIL annonce que les apps utilisant des SDK tiers et ne respectant pas le consentement utilisateur seront prioritairement inspectées en 2025.',
          url: 'https://www.cnil.fr/fr/les-controles-de-la-cnil-en-2025'
        },
        {
          source: 'CNIL',
          date: '8 avril 2025',
          title: 'Recommandations techniques actualisées',
          desc: 'Chiffrement TLS obligatoire, usage du Hardware Keystore (Android) ou Secure Enclave (iOS), interdiction des sauvegardes non chiffrées, conformité OWASP MASVS niveau L1 minimum.',
          url: 'https://www.cnil.fr/sites/cnil/files/2025-04/recommandation-applications-mobiles-modifiee.pdf'
        }
      ]
    },
    {
      title: 'Mai – Juin 2025',
      summary: 'Mi-2025 — Apple révèle ses chiffres annuels de l\'App Store et durcit ses politiques. WWDC 2025 met l\'accent sur la confidentialité avec de nouvelles API sécurisées.',
      articles: [
        {
          source: 'Apple',
          date: '28 mai 2025',
          title: 'Rapport annuel App Store — 2 milliards de transactions frauduleuses bloquées',
          desc: 'Apple détaille avoir bloqué 2 milliards de tentatives de transactions frauduleuses en 2024. 1,9 million d\'apps malveillantes refusées avant publication sur l\'App Store.',
          url: 'https://support.apple.com/fr-fr/100100'
        },
        {
          source: 'Apple',
          date: '10 juin 2025',
          title: 'WWDC 2025 — nouvelles API de confidentialité dans iOS 19',
          desc: 'Apple introduit de nouvelles API obligeant les développeurs à déclarer précisément les données collectées par chaque SDK tiers intégré. App Tracking Transparency renforcé.',
          url: 'https://developer.apple.com/'
        }
      ]
    },
    {
      title: 'Juillet – Août 2025',
      summary: 'Été 2025 — découverte d\'une vague de malwares bancaires Android (Anatsa, Coyote) qui ciblent les apps de banque française et européenne.',
      articles: [
        {
          source: 'Écran Mobile',
          date: '15 juillet 2025',
          title: 'Anatsa — le malware bancaire qui contourne Google Play Protect',
          desc: 'Le trojan Anatsa s\'est infiltré dans plusieurs apps populaires du Play Store (lecteurs PDF, scanners) avant d\'activer son payload. Plus de 30 000 victimes recensées en Europe.',
          url: 'https://www.ecranmobile.fr/'
        },
        {
          source: 'Kaspersky',
          date: '22 août 2025',
          title: 'Coyote cible les banques françaises sur Android',
          desc: 'Nouveau malware bancaire spécifiquement conçu pour les apps des principales banques françaises. Utilise des overlays malicieux pour voler les identifiants de connexion.',
          url: 'https://www.kaspersky.fr/'
        }
      ]
    },
    {
      title: 'Septembre – Octobre 2025',
      summary: 'Rentrée 2025 — Google déploie Play Protect 2.0 avec analyse comportementale en temps réel. L\'OWASP MASVS publie sa version 2.1 avec de nouveaux contrôles IA.',
      articles: [
        {
          source: 'Android',
          date: '12 septembre 2025',
          title: 'Play Protect 2.0 — détection comportementale en temps réel',
          desc: 'Google déploie une nouvelle génération de Play Protect qui analyse en continu le comportement des apps installées, même celles provenant du sideloading. Détection d\'activités suspectes en arrière-plan.',
          url: 'https://source.android.com/'
        },
        {
          source: 'OWASP',
          date: '8 octobre 2025',
          title: 'OWASP MASVS 2.1 — nouveaux contrôles pour les apps IA',
          desc: 'Mise à jour majeure du standard avec des contrôles spécifiques pour les apps intégrant des modèles d\'IA : protection des prompts, prévention des injections, sécurisation des modèles embarqués.',
          url: 'https://owasp.org/www-project-mobile-app-security/'
        }
      ]
    },
    {
      title: 'Novembre – Décembre 2025',
      summary: 'Fin 2025 — bilan annuel de cybersécurité mobile : record de vulnérabilités publiées, montée du ransomware mobile et premières attaques sur les wallets cryptos hardware.',
      articles: [
        {
          source: 'Zimperium',
          date: '5 décembre 2025',
          title: 'Bilan 2025 — record de 1 200 CVE mobiles publiées',
          desc: 'Année record en nombre de vulnérabilités publiées (CVE) sur les plateformes mobiles : 1 200 contre 850 en 2024. iOS rattrape Android en nombre de failles critiques.',
          url: 'https://www.zimperium.com/'
        },
        {
          source: 'Le Monde Informatique',
          date: '18 novembre 2025',
          title: 'Le ransomware mobile sort de l\'ombre',
          desc: 'Premiers cas documentés de ransomwares chiffrant les données utilisateurs sur Android. Les pirates exploitent les permissions excessives accordées à des apps en apparence légitimes.',
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
  const vtTrack = document.getElementById('vtTrack');
  const vtPrev = document.getElementById('vtPrev');
  const vtNext = document.getElementById('vtNext');
  const vcPeriodTag = document.getElementById('vcPeriodTag');
  const vcPeriodTitle = document.getElementById('vcPeriodTitle');
  const vcPeriodSummary = document.getElementById('vcPeriodSummary');
  const vcArticles = document.getElementById('vcArticles');

  let currentPeriod = 0;

  function renderPeriod(idx) {
    if (idx < 0 || idx >= veilleData.length) return;
    currentPeriod = idx;
    const data = veilleData[idx];

    // Active state
    vtPeriods.forEach((btn, i) => btn.classList.toggle('active', i === idx));

    // Header
    vcPeriodTag.textContent = `Période ${idx + 1} / ${veilleData.length}`;
    vcPeriodTitle.textContent = data.title;
    vcPeriodSummary.textContent = data.summary;

    // Articles — re-render with fade animation
    vcArticles.style.animation = 'none';
    vcArticles.offsetHeight; // force reflow
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

    // Update arrows
    vtPrev.disabled = idx === 0;
    vtNext.disabled = idx === veilleData.length - 1;

    // Scroll active button into view
    const activeBtn = vtPeriods[idx];
    if (activeBtn && vtTrack) {
      const trackRect = vtTrack.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const offset = btnRect.left - trackRect.left - (trackRect.width / 2) + (btnRect.width / 2);
      vtTrack.scrollBy({ left: offset, behavior: 'smooth' });
    }
  }

  if (vtPeriods.length > 0) {
    vtPeriods.forEach((btn, i) => {
      btn.addEventListener('click', () => renderPeriod(i));
    });

    if (vtPrev) vtPrev.addEventListener('click', () => renderPeriod(currentPeriod - 1));
    if (vtNext) vtNext.addEventListener('click', () => renderPeriod(currentPeriod + 1));

    // Initialize on first period
    renderPeriod(0);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const veilleSection = document.getElementById('veille');
      if (!veilleSection) return;
      const rect = veilleSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === 'ArrowLeft' && currentPeriod > 0) renderPeriod(currentPeriod - 1);
      if (e.key === 'ArrowRight' && currentPeriod < veilleData.length - 1) renderPeriod(currentPeriod + 1);
    });
  }
})();
