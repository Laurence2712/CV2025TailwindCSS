document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════
     1. CURSOR RING avec lerp
  ════════════════════════════════════════ */
  const ring = document.getElementById('cursor-ring');
  const dot  = document.getElementById('cursor-dot');

  if (ring && dot && window.innerWidth > 768) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      // Le dot suit instantanément
      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
    });

    const lerp = (a, b, t) => a + (b - a) * t;
    (function tick() {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      requestAnimationFrame(tick);
    })();

    // Agrandir le ring sur les liens / boutons
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    // Ring "link" sur les cartes portfolio
    document.querySelectorAll('.portfolio-card, .pf-bento-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.remove('hovered');
        ring.classList.add('link-hovered');
      });
      el.addEventListener('mouseleave', () => ring.classList.remove('link-hovered'));
    });
  }

  /* ════════════════════════════════════════
     2. LINE REVEALS — .reveal-group > .rl
  ════════════════════════════════════════ */
  // Hero : déclencher avec délai sur DOMContentLoaded (déjà visible)
  const heroGroups = document.querySelectorAll('#hero .reveal-group');
  heroGroups.forEach((group, gi) => {
    group.querySelectorAll('.rl').forEach((line, li) => {
      const delay = 180 + gi * 200 + li * 90;
      setTimeout(() => line.classList.add('up'), delay);
    });
  });

  /* ════════════════════════════════════════
     PORTRAIT — entrance + scroll parallax
  ════════════════════════════════════════ */
  const portrait = document.querySelector('.hero-portrait');
  if (portrait) {
    portrait.classList.add('portrait-in');

    portrait.addEventListener('animationend', () => {
      // Hand off from CSS animation to JS-managed transform
      portrait.style.opacity   = '1';
      portrait.style.transform = 'translateX(0) translateY(0px) rotate(-4deg)';
      portrait.style.animation = 'none';

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y  = Math.min(window.scrollY, 900);
          const py = -(y * 0.12);                     // parallax vertical doux
          const pr = -4 + (y * 0.004);                // légère rotation au scroll
          portrait.style.transform = `translateX(0) translateY(${py}px) rotate(${pr}deg)`;
          ticking = false;
        });
      }, { passive: true });
    }, { once: true });
  }

  // Autres sections : IntersectionObserver
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.rl').forEach((line, i) => {
        setTimeout(() => line.classList.add('up'), i * 80);
      });
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-group').forEach(g => {
    if (!g.closest('#hero')) revealObs.observe(g);
  });

  /* ════════════════════════════════════════
     3. FADE-SLIDE-UP (sections)
  ════════════════════════════════════════ */
  const sectionObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-slide-up').forEach(el => sectionObs.observe(el));

  /* ════════════════════════════════════════
     4. TIMELINE BIDIRECTIONNELLE
  ════════════════════════════════════════ */
  const timelineLine = document.getElementById('timelineLine');
  const tlItems = document.querySelectorAll('.tl-item');
  const timelineSection = document.getElementById('timeline');

  if (timelineLine && tlItems.length && timelineSection) {
    function updateTimelineProgress() {
      const rect = timelineSection.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - rect.top) / rect.height));
      timelineLine.style.setProperty('--progress', progress);
    }
    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();

    tlItems.forEach(item => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            item.classList.add('visible');
            item.classList.remove('from-above');
          } else {
            item.classList.remove('visible');
            item.classList.toggle('from-above', entry.boundingClientRect.top < 0);
          }
        });
      }, { threshold: 0.2 });
      obs.observe(item);
    });
  }

  /* ════════════════════════════════════════
     5. SKILL CARDS — stagger
  ════════════════════════════════════════ */
  const skillObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.skill-card').forEach(el => skillObs.observe(el));

  /* ════════════════════════════════════════
     6. CRAFT CARDS — stagger
  ════════════════════════════════════════ */
  const craftObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.craftIndex || 0) * 90;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.craft-card').forEach(el => craftObs.observe(el));

  /* ════════════════════════════════════════
     6b. CRAFT CARDS — 3D tilt + cursor glow
  ════════════════════════════════════════ */
  document.querySelectorAll('.craft-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const cx = (e.clientX - r.left)  / r.width;
      const cy = (e.clientY - r.top)   / r.height;
      const rx = (cy - 0.5) * -10;
      const ry = (cx - 0.5) *  12;
      card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      card.style.setProperty('--mx', `${cx * 100}%`);
      card.style.setProperty('--my', `${cy * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ════════════════════════════════════════
     6c. PORTFOLIO CARDS — cursor glow
  ════════════════════════════════════════ */
  if (window.innerWidth > 768) {
    document.querySelectorAll('.pf-bento-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const x  = e.clientX - r.left;
        const y  = e.clientY - r.top;
        const cx = r.width  / 2;
        const cy = r.height / 2;
        const rx = ((y - cy) / cy) * -5;
        const ry = ((x - cx) / cx) *  5;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  } else {
    document.querySelectorAll('.pf-bento-card').forEach(card => {
      card.addEventListener('touchmove', e => {
        const r = card.getBoundingClientRect();
        const t = e.touches[0];
        card.style.setProperty('--mx', `${t.clientX - r.left}px`);
        card.style.setProperty('--my', `${t.clientY - r.top}px`);
      }, { passive: true });
    });
  }

  /* ════════════════════════════════════════
     7. TERRAIN CARDS — stagger
  ════════════════════════════════════════ */
  const terrainObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.terrainIndex || 0) * 75;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.terrain-card').forEach(el => terrainObs.observe(el));

  /* ════════════════════════════════════════
     8. PORTFOLIO CARDS — stagger
  ════════════════════════════════════════ */
  const portfolioObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.index || 0) * 120;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.portfolio-card').forEach(el => portfolioObs.observe(el));

  /* ════════════════════════════════════════
     7. MENU MOBILE
  ════════════════════════════════════════ */
  const menuBtn    = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  const menuOverlay = document.getElementById('menu-overlay');

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay && menuOverlay.classList.remove('open');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      menuOverlay && menuOverlay.classList.toggle('open', isOpen);
    });
    mobileMenu.addEventListener('click', e => {
      if (e.target.tagName === 'A' || e.target.classList.contains('lang-btn')) closeMenu();
    });
    menuOverlay && menuOverlay.addEventListener('click', closeMenu);
  }

  /* ════════════════════════════════════════
     8. SCROLL TO TOP
  ════════════════════════════════════════ */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ════════════════════════════════════════
     8. NAV HIDE ON MOBILE SCROLL
  ════════════════════════════════════════ */
  const header = document.getElementById('main-header');
  if (header) {
    let lastY = window.scrollY;
    window.addEventListener('scroll', () => {
      if (window.innerWidth >= 768) return;
      const y = window.scrollY;
      header.classList.toggle('header-hidden', y > lastY && y > 80);
      lastY = y;
    }, { passive: true });
  }

});

console.log('%cHello ! N\'hésitez pas à me contacter! 👋', 'color:#4d9fff;font-size:16px;font-weight:bold;');
