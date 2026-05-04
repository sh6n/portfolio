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
})();
