document.addEventListener('DOMContentLoaded', () => {


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
     3. FADE-SLIDE-UP (sections) — bidirectionnel
  ════════════════════════════════════════ */
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-slide-up').forEach(el => sectionObs.observe(el));

  /* ════════════════════════════════════════
     3b. ABOUT + éléments — bidirectionnel
  ════════════════════════════════════════ */
  const abObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('ab-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.ab-reveal').forEach(el => abObs.observe(el));

  /* ════════════════════════════════════════
     3c. SKILLS GROUPED TAGS — stagger reveal
  ════════════════════════════════════════ */
  const skGroups = document.querySelector('.sk-groups');
  if (skGroups) {
    document.querySelectorAll('.sk-tag').forEach((tag, i) => {
      tag.style.setProperty('--sk-i', i);
    });
    const skObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skGroups.classList.add('sk-in');
          skObs.disconnect();
        }
      });
    }, { threshold: 0.08 });
    skObs.observe(skGroups);
  }

  /* ════════════════════════════════════════
     3d. STATS COUNT-UP
  ════════════════════════════════════════ */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const from   = parseInt(el.dataset.countFrom || 0);
      const suffix = el.dataset.suffix || '';
      const fmt    = el.dataset.format === 'space';
      const duration = target > 1000 ? 3200 : 2000;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + eased * (target - from));
        el.textContent = (fmt ? val.toLocaleString('fr-BE') : val) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = (fmt ? target.toLocaleString('fr-BE') : target) + suffix;
      }
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  /* ════════════════════════════════════════
     4. TIMELINE BIDIRECTIONNELLE
  ════════════════════════════════════════ */
  const tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach(item => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
      });
    }, { threshold: 0.12 });
    obs.observe(item);
  });

  /* ════════════════════════════════════════
     5. SKILL CARDS — stagger bidirectionnel
  ════════════════════════════════════════ */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('sk-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.skill-card:not([aria-hidden])').forEach(el => skillObs.observe(el));

  /* ════════════════════════════════════════
     6. CRAFT CARDS — stagger bidirectionnel
  ════════════════════════════════════════ */
  document.querySelectorAll('.craft-card').forEach(el => {
    const delay = parseInt(el.dataset.craftIndex || 0) * 90;
    el.style.transitionDelay = delay + 'ms';
  });
  const craftObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
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
     7. TERRAIN CARDS — stagger bidirectionnel
  ════════════════════════════════════════ */
  document.querySelectorAll('.terrain-card').forEach(el => {
    const delay = parseInt(el.dataset.terrainIndex || 0) * 75;
    el.style.transitionDelay = delay + 'ms';
  });
  const terrainObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.terrain-card').forEach(el => terrainObs.observe(el));

  /* ════════════════════════════════════════
     8. PORTFOLIO — SCROLL HORIZONTAL
  ════════════════════════════════════════ */
  const pfOuter = document.getElementById('pfOuter');
  const pfTrack = document.getElementById('pfTrack');
  const pfBar   = document.getElementById('pfBar');

  if (pfOuter && pfTrack && window.innerWidth > 900) {
    let scrollMax = 0;

    function initPf() {
      scrollMax = pfTrack.scrollWidth - window.innerWidth;
      pfOuter.style.height = (scrollMax + window.innerHeight) + 'px';
    }

    function updatePf() {
      const rect = pfOuter.getBoundingClientRect();
      const outerH = pfOuter.offsetHeight - window.innerHeight;
      if (outerH <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / outerH));
      pfTrack.style.transform = `translateX(${-p * scrollMax}px)`;
      if (pfBar) pfBar.style.width = (p * 100) + '%';
    }

    window.addEventListener('load', () => { initPf(); updatePf(); });
    window.addEventListener('scroll', updatePf, { passive: true });
    window.addEventListener('resize', () => { initPf(); updatePf(); });
    initPf();
    updatePf();
  }


  /* ════════════════════════════════════════
     WORK PAGE FILTERS
  ════════════════════════════════════════ */
  const wkFilters = document.querySelectorAll('.wk-filter');
  const wkTypedRows = document.querySelectorAll('.wk-row[data-type]');

  if (wkFilters.length && wkTypedRows.length) {
    wkFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        wkFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        wkTypedRows.forEach(row => {
          const match = filter === 'all' || row.dataset.type === filter;
          row.classList.toggle('wk-row--hidden', !match);
          if (match) {
            row.classList.remove('wk-row--in');
            requestAnimationFrame(() => requestAnimationFrame(() => row.classList.add('wk-row--in')));
          } else {
            row.classList.remove('wk-row--in');
          }
        });
      });
    });
  }

  /* ════════════════════════════════════════
     7. MENU — panneau qui glisse depuis la droite
  ════════════════════════════════════════ */
  const menuBtn     = document.getElementById('menu-btn');
  const siteMenu    = document.getElementById('site-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  if (menuBtn && siteMenu) {
    const closeBtn = siteMenu.querySelector('.sm-close');

    const setMenu = (open, byKeyboard) => {
      siteMenu.classList.toggle('open', open);
      menuOverlay && menuOverlay.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      siteMenu.setAttribute('aria-hidden', String(!open));
      siteMenu.inert = !open;
      // focus déplacé seulement au clavier : pas de cadre de focus après un clic de souris
      if (byKeyboard) (open ? closeBtn : menuBtn).focus({ preventScroll: true });
    };

    menuBtn.addEventListener('click', e => setMenu(true, e.detail === 0));
    closeBtn.addEventListener('click', e => setMenu(false, e.detail === 0));
    menuOverlay && menuOverlay.addEventListener('click', () => setMenu(false));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && siteMenu.classList.contains('open')) setMenu(false, true);
    });
    // lien vers une ancre de la page en cours : fermer le menu avant de défiler
    siteMenu.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (link && link.hash && link.pathname === location.pathname) setMenu(false);
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
    const updateNav = () => {
      const y = window.scrollY;
      header.classList.toggle('nav-scrolled', y > 40);
      header.classList.toggle('header-hidden', y > lastY && y > 80);
      lastY = y;
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ════════════════════════════════════════
     9. PROJETS — modale avec toutes les infos, page floutée derrière
  ════════════════════════════════════════ */
  (function () {
    var pm = document.getElementById('pm'), list = document.querySelector('.pj-grid');
    if (!pm || !list) return;
    var q = function (s) { return pm.querySelector(s); }, lastRow = null;
    var rows = list.querySelectorAll('.wk-row');
    rows.forEach(function (r) { r.tabIndex = 0; r.setAttribute('role', 'button'); });
    function open(row) {
      lastRow = row;
      var d = row.querySelector('.wk-img-col img'), m = row.querySelector('.wk-mobile');
      q('.pm-desk').src = d ? d.src.replace('-800.webp', '.webp?v=2') : '';
      q('.pm-desk').alt = row.querySelector('.wk-title').textContent;
      q('.pm-mob').style.display = m ? '' : 'none'; if (m) q('.pm-mob').src = m.src;
      var badge = row.querySelector('.wk-badge'), year = row.querySelector('.wk-year');
      q('.pm-meta').innerHTML = '';
      var b = document.createElement('b'); b.textContent = badge.textContent;
      b.style.color = getComputedStyle(badge).color;
      q('.pm-meta').appendChild(b);
      if (year) q('.pm-meta').appendChild(document.createTextNode('  ·  ' + year.textContent));
      q('.pm-title').textContent = row.querySelector('.wk-title').textContent;
      q('.pm-desc').textContent = row.querySelector('.wk-desc').textContent;
      q('.pm-tags').innerHTML = row.querySelector('.wk-tags').innerHTML;
      var cta = row.querySelector('.wk-cta');
      q('.pm-cta').href = row.dataset.url;
      q('.pm-cta span').textContent = cta.querySelector('span').textContent;
      pm.classList.add('open'); pm.setAttribute('aria-hidden', 'false');
      document.body.classList.add('pm-open');
      setTimeout(function () { q('.pm-close').focus({ preventScroll: true }); }, 50);
    }
    function close() {
      pm.classList.remove('open'); pm.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('pm-open');
      if (lastRow) lastRow.focus({ preventScroll: true });
    }
    // le clic sur une ligne ouvre la modale (au lieu d'ouvrir directement le site)
    document.addEventListener('click', function (e) {
      var row = e.target.closest('.pj-grid .wk-row');
      if (!row) return;
      e.preventDefault(); e.stopPropagation(); open(row);
    }, true);
    list.addEventListener('keydown', function (e) {
      var row = e.target.closest('.wk-row');
      if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(row); }
    });
    q('.pm-close').addEventListener('click', close);
    q('.pm-bd').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pm.classList.contains('open')) close(); });
  })();

});

console.log('%cHello ! N\'hésitez pas à me contacter! 👋', 'color:#4d9fff;font-size:16px;font-weight:bold;');
