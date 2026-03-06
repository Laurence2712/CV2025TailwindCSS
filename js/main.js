document.addEventListener('DOMContentLoaded', () => {
  const nameContainer = document.getElementById('animated-name');
  if (nameContainer) {
    const nameText = 'LaurenceP.';
    nameContainer.innerHTML = ''; 
    nameText.split('').forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      nameContainer.appendChild(span);
    });

    let index = 0;
    const spans = nameContainer.querySelectorAll('span');
    function showNextLetter() {
      if (index < spans.length) {
        spans[index].classList.add('visible');
        index++;
        setTimeout(showNextLetter, 150);
      }
    }
    showNextLetter();
  }

  // --- 2. Intersection Observer pour les sections (fade-slide-up) ---
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-slide-up').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // --- 3. Timeline bidirectionnelle ---
  const timelineLine = document.getElementById('timelineLine');
  const tlItems = document.querySelectorAll('.tl-item');
  const timelineSection = document.getElementById('timeline');

  if (timelineLine && tlItems.length && timelineSection) {
    // Ligne qui progresse selon le scroll
    function updateTimelineProgress() {
      const rect = timelineSection.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowH * 0.7 - rect.top) / rect.height));
      timelineLine.style.setProperty('--progress', progress);
    }
    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();

    // Chaque item s'anime individuellement — dans les deux directions
    tlItems.forEach(item => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            item.classList.add('visible');
            item.classList.remove('from-above');
          } else {
            item.classList.remove('visible');
            // Si l'item sort par le haut → il réapparaîtra par le bas la prochaine fois
            if (entry.boundingClientRect.top < 0) {
              item.classList.add('from-above');
            } else {
              item.classList.remove('from-above');
            }
          }
        });
      }, { threshold: 0.2 });
      obs.observe(item);
    });
  }

  // --- 4. Intersection Observer pour les cartes de compétences ---
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.skill-card').forEach(item => {
    skillObserver.observe(item);
  });
  
  // --- 4. Menu mobile toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    
    mobileMenu.addEventListener('click', (e) => {
  console.log('Click sur', e.target);
  if (e.target.tagName === 'A' || e.target.classList.contains('lang-btn')) {
    console.log('fermeture du menu');
    mobileMenu.classList.remove('open');
  }
});
  }
  
  // --- 5. Effet de traînée du curseur ---
const cursorDot = document.getElementById('cursor-dot');
const desktopQuery = window.matchMedia('(min-width: 769px)');

function moveCursor(e) {
  const posX = e.clientX - cursorDot.offsetWidth / 2;
  const posY = e.clientY - cursorDot.offsetHeight / 2;
  cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
}

if (cursorDot) {
  if (desktopQuery.matches) {
    document.addEventListener('mousemove', moveCursor);
  } else {
    // Sur mobile : on masque ET on retire les events
    cursorDot.style.display = 'none';
  }
}

  // --- Logique pour le slider des compétences ---
  const skillsScroller = document.getElementById('skills-scroller');
  const prevBtn = document.getElementById('skills-prev');
  const nextBtn = document.getElementById('skills-next');

  if (skillsScroller && prevBtn && nextBtn) {
    const updateButtonsState = () => {
      prevBtn.disabled = skillsScroller.scrollLeft === 0;
      const maxScrollLeft = skillsScroller.scrollWidth - skillsScroller.clientWidth;
      nextBtn.disabled = skillsScroller.scrollLeft >= maxScrollLeft - 1;
    };

    nextBtn.addEventListener('click', () => {
      const scrollAmount = skillsScroller.querySelector('.skill-card').offsetWidth + 32;
      skillsScroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      const scrollAmount = skillsScroller.querySelector('.skill-card').offsetWidth + 32;
      skillsScroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    skillsScroller.addEventListener('scroll', updateButtonsState);
    setTimeout(updateButtonsState, 100);
  }

  // --- 6. Scroll to top button ---
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 7. Barre de navigation qui se cache au scroll (mobile) ---
  const header = document.getElementById('main-header');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      // On exécute cette logique uniquement sur les écrans de moins de 768px (taille 'md' de Tailwind)
      if (window.innerWidth < 768) {
        const currentScrollY = window.scrollY;

        // Si on scrolle vers le bas et qu'on a déjà un peu scrollé
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          header.classList.add('header-hidden');
        } else {
          // Si on scrolle vers le haut
          header.classList.remove('header-hidden');
        }
        
        // On met à jour la dernière position de scroll
        lastScrollY = currentScrollY;
      }
    });
  }
});