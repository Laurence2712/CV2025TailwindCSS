document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════
     1. CURSOR FILAMENT — canvas trail
  ════════════════════════════════════════ */
  const canvas = document.getElementById('cursor-canvas');

  if (canvas && window.innerWidth > 768) {
    const ctx = canvas.getContext('2d');
    const N   = 18;   // nombre de points du filament
    const LF  = 0.14; // facteur LERP (plus petit = plus trainant)

    let mouse = { x: -300, y: -300 };
    let hovered = false;

    const pts = Array.from({ length: N }, () => ({ x: -300, y: -300 }));

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Masquer le curseur natif sur desktop
    document.documentElement.style.cursor = 'none';
    document.querySelectorAll('a, button').forEach(el => {
      el.style.cursor = 'none';
      el.addEventListener('mouseenter', () => { hovered = true; });
      el.addEventListener('mouseleave', () => { hovered = false; });
    });

    const lerp = (a, b, t) => a + (b - a) * t;

    (function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mettre à jour les points avec LERP chaîné
      pts[0].x = lerp(pts[0].x, mouse.x, LF);
      pts[0].y = lerp(pts[0].y, mouse.y, LF);
      for (let i = 1; i < N; i++) {
        pts[i].x = lerp(pts[i].x, pts[i - 1].x, LF);
        pts[i].y = lerp(pts[i].y, pts[i - 1].y, LF);
      }

      // Couleur selon état hover
      const accent = hovered ? '255,255,255' : '77,159,255';

      // Filament — ligne lissée avec quadraticCurveTo
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      for (let i = 0; i < N - 1; i++) {
        const mx2 = (pts[i].x + pts[i + 1].x) / 2;
        const my2 = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx2, my2);
      }
      ctx.quadraticCurveTo(pts[N - 2].x, pts[N - 2].y, pts[N - 1].x, pts[N - 1].y);

      const grad = ctx.createLinearGradient(mouse.x, mouse.y, pts[N - 1].x, pts[N - 1].y);
      grad.addColorStop(0,   `rgba(${accent}, ${hovered ? 0.9 : 0.75})`);
      grad.addColorStop(0.4, `rgba(${accent}, 0.25)`);
      grad.addColorStop(1,   `rgba(${accent}, 0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = hovered ? 1.8 : 1.2;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.stroke();

      // Point de tête
      const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, hovered ? 10 : 5);
      glow.addColorStop(0,   `rgba(${accent}, ${hovered ? 1 : 0.9})`);
      glow.addColorStop(1,   `rgba(${accent}, 0)`);
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, hovered ? 10 : 5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      requestAnimationFrame(tick);
    })();
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
     8b. PORTFOLIO FILTERS
  ════════════════════════════════════════ */
  const pfFilters = document.querySelectorAll('.pf-filter');
  const pfRows    = document.querySelectorAll('.pf-list .pf-row');

  pfFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      pfFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      pfRows.forEach(row => {
        const match =
          filter === 'all' ||
          (filter === 'freelance' && row.classList.contains('pf-row--freelance')) ||
          (filter === 'agency'    && row.classList.contains('pf-row--agency'))    ||
          (filter === 'personal'  && row.classList.contains('pf-row--personal'));
        row.classList.toggle('pf-hidden', !match);
      });
    });
  });

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
