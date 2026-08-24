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
     4b. TIMELINE — STICKY SCROLL-DRIVEN
  ════════════════════════════════════════ */
  const expWrap    = document.querySelector('.exp-pin-wrap');
  const tlNavItems = document.querySelectorAll('.tl-nav-item');
  const tlPanels   = document.querySelectorAll('.tl-panel');
  const tlNavFill  = document.querySelector('.tl-nav-fill');

  const tlPanelsWrap = document.querySelector('.tl-panels');

  if (expWrap && tlPanels.length) {
    const count = tlPanels.length;
    let currentIdx = -1;

    const checkPanelScroll = panel => {
      if (!panel || !tlPanelsWrap) return;
      const atBottom = panel.scrollHeight - panel.scrollTop <= panel.clientHeight + 8;
      tlPanelsWrap.classList.toggle('tl-at-bottom', atBottom);
    };

    const switchPanel = idx => {
      if (idx === currentIdx) return;
      tlPanels.forEach((p, i) => {
        if (i === idx) {
          p.classList.remove('tl-panel--out');
          p.classList.add('tl-panel--visible');
          p.onscroll = () => checkPanelScroll(p);
          checkPanelScroll(p);
        } else if (i === currentIdx) {
          p.classList.remove('tl-panel--visible');
          p.classList.add('tl-panel--out');
          p.onscroll = null;
          setTimeout(() => p.classList.remove('tl-panel--out'), 600);
        }
      });
      tlNavItems.forEach((n, i) => n.classList.toggle('tl-nav-item--active', i === idx));
      currentIdx = idx;
    };

    const updateExp = () => {
      if (window.innerWidth <= 768) return;
      const rect = expWrap.getBoundingClientRect();
      const wrapH = expWrap.offsetHeight;
      const vh = window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const total = wrapH - vh;
      const progress = Math.max(0, Math.min(1, scrolled / total));

      const idx = Math.min(count - 1, Math.floor(progress * count));
      switchPanel(idx);

      if (tlNavFill) {
        tlNavFill.style.height = (progress * 100) + '%';
      }
    };

    window.addEventListener('scroll', updateExp, { passive: true });
    window.addEventListener('resize', updateExp, { passive: true });
    if (window.innerWidth > 768) switchPanel(0);
    updateExp();
  }

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
     WORK PAGE — PARALLAX IMAGES
  ════════════════════════════════════════ */
  const wkImgs = document.querySelectorAll('.wk-img-col img');
  if (wkImgs.length) {
    const updateWkParallax = () => {
      const vh = window.innerHeight;
      wkImgs.forEach(img => {
        const col = img.closest('.wk-img-col');
        const rect = col.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (vh - rect.top) / (vh + rect.height);
        const offset = (progress - 0.5) * 70;
        img.style.transform = `translateY(${offset}px)`;
      });
    };
    window.addEventListener('scroll', updateWkParallax, { passive: true });
    updateWkParallax();
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
     9. PROJECT MODAL — work.html
  ════════════════════════════════════════ */
  const wkModal   = document.getElementById('wk-modal');
  const wkList    = document.querySelector('.wk-list');

  if (wkModal && wkList) {
    const panel    = wkModal.querySelector('.wk-modal-panel');
    const bd       = wkModal.querySelector('.wk-modal-bd');
    const closeBtn = wkModal.querySelector('.wk-modal-close');
    const mNum     = wkModal.querySelector('.wk-modal-num');
    const mBadge   = wkModal.querySelector('.wk-modal-badge');
    const mTitle   = wkModal.querySelector('.wk-modal-title');
    const mTags    = wkModal.querySelector('.wk-modal-tags');
    const mImg     = wkModal.querySelector('.wk-modal-img');
    const mDesc    = wkModal.querySelector('.wk-modal-desc');
    const mLink    = wkModal.querySelector('.wk-modal-link');

    const mAnimEls = [
      wkModal.querySelector('.wk-modal-head'),
      wkModal.querySelector('.wk-modal-img-wrap'),
      wkModal.querySelector('.wk-modal-body')
    ];

    function resetInnerAnim() {
      mAnimEls.forEach(el => { if (el) el.style.cssText = ''; });
    }

    function openModal(row) {
      const url      = row.dataset.url || '#';
      const title    = row.querySelector('.wk-title')?.textContent || '';
      const numEl    = row.querySelector('.wk-num');
      const badgeEl  = row.querySelector('.wk-badge');
      const descEl   = row.querySelector('.wk-desc');
      const imgEl    = row.querySelector('.wk-img-col img');
      const tagEls   = row.querySelectorAll('.wk-tags span');

      // Reset inner animations instantly so they replay
      mAnimEls.forEach(el => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
      });

      mNum.textContent   = numEl?.textContent || '';
      mTitle.textContent = title;
      mDesc.textContent  = descEl?.textContent || '';
      mImg.src           = imgEl?.src || '';
      mImg.alt           = title;
      mLink.href         = url;

      mBadge.textContent = badgeEl?.textContent || '';
      mBadge.className   = 'wk-modal-badge';
      if (badgeEl?.classList.contains('wk-badge--freelance')) mBadge.classList.add('wk-modal-badge--freelance');
      else if (badgeEl?.classList.contains('wk-badge--agency')) mBadge.classList.add('wk-modal-badge--agency');
      else if (badgeEl?.classList.contains('wk-badge--personal')) mBadge.classList.add('wk-modal-badge--personal');
      else mBadge.classList.add('wk-modal-badge--wip');

      mTags.innerHTML = '';
      tagEls.forEach(t => {
        const s = document.createElement('span');
        s.textContent = t.textContent;
        mTags.appendChild(s);
      });

      wkModal.setAttribute('aria-hidden', 'false');
      wkModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      panel.scrollTop = 0;
      const mInner = wkModal.querySelector('.wk-modal-inner');
      if (mInner) mInner.scrollTop = 0;

      // Re-enable transitions after a frame so CSS takes over
      requestAnimationFrame(() => requestAnimationFrame(() => {
        mAnimEls.forEach(el => { if (el) el.style.cssText = ''; });
      }));
    }

    function closeModal() {
      // Instantly hide inner content — panel animation handles the visual close
      mAnimEls.forEach(el => {
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
      });
      wkModal.classList.remove('open');
      wkModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(resetInnerAnim, 450);
    }

    wkList.addEventListener('click', e => {
      const row = e.target.closest('.wk-row');
      if (!row) return;
      if (e.target.closest('.wk-cta')) return; // let the link open normally
      openModal(row);
    });

    bd.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  /* ════════════════════════════════════════
     PARALLAX ENGINE — [data-parallax]
  ════════════════════════════════════════ */
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    const pxItems = [];
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const rect = el.getBoundingClientRect();
      pxItems.push({
        el,
        speed: parseFloat(el.dataset.parallax) || 0.1,
        cy: rect.top + window.scrollY + rect.height / 2
      });
    });
    if (pxItems.length) {
      let pxTick = false;
      const runPx = () => {
        const half = window.innerHeight / 2;
        pxItems.forEach(({ el, speed, cy }) => {
          const offset = (window.scrollY + half - cy) * speed;
          el.style.transform = `translateY(${offset}px)`;
        });
        pxTick = false;
      };
      window.addEventListener('scroll', () => {
        if (!pxTick) { pxTick = true; requestAnimationFrame(runPx); }
      }, { passive: true });
      runPx();
    }
  }

});

console.log('%cHello ! N\'hésitez pas à me contacter! 👋', 'color:#4d9fff;font-size:16px;font-weight:bold;');
