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
  
  // --- 3. Intersection Observer pour les cartes de compétences ---
  // Removed - now using enhanced version below (section 8)
  
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

  // --- 6. Barre de navigation qui se cache au scroll (mobile) ---
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

  // --- 7. Parallax effect on scroll ---
  const parallaxElements = document.querySelectorAll('.floating');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrolled * speed / 10);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });

  // --- 8. Enhanced skill card animation with better stagger ---
  const enhancedSkillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 150); // Increased delay for better visual effect
        });
        enhancedSkillObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    enhancedSkillObserver.observe(skillsSection);
  }

  // --- 9. Add smooth mouse parallax effect on hero section ---
  const heroSection = document.getElementById('hero');
  if (heroSection && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const floatingElements = heroSection.querySelectorAll('.floating');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // --- 10. Add ripple effect to buttons ---
  const buttons = document.querySelectorAll('.contact-btn, .btn-scale');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation to CSS dynamically
  if (!document.querySelector('#ripple-animation')) {
    const style = document.createElement('style');
    style.id = 'ripple-animation';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // --- 11. Add intersection observer for tags/badges with stagger ---
  const tagObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('span');
        tags.forEach((tag, index) => {
          tag.classList.add('stagger-item');
          setTimeout(() => {
            tag.classList.add('visible');
          }, index * 100);
        });
        tagObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const aboutSection = document.querySelector('#about .flex.flex-wrap');
  if (aboutSection) {
    tagObserver.observe(aboutSection);
  }

  // --- 12. Smooth scroll enhancement ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- 13. Performance optimization: Debounce scroll events ---
  let scrollTimeout;
  const optimizedScroll = () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
      // Scroll-dependent animations go here
      const scrolled = window.pageYOffset;

      // Update header shadow based on scroll
      if (header) {
        if (scrolled > 50) {
          header.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.1)';
        } else {
          header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
        }
      }
    });
  };

  window.addEventListener('scroll', optimizedScroll, { passive: true });
});