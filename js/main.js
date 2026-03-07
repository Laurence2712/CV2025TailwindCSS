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

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.addEventListener('click', e => {
      if (e.target.tagName === 'A' || e.target.classList.contains('lang-btn')) {
        mobileMenu.classList.remove('open');
      }
    });

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
