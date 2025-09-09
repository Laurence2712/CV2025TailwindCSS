// js/translations.js

const translations = {
  fr: {
    pageTitle: "Portfolio Laurence - Web Developer",
    nav: {
      about: "À propos",
      skills: "Compétences",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    hero: {
      subtitle: "Vous êtes à la recherche d'un développeur web ?",
      subtitle2: "Je suis là !",
      ctaProjects: "Mes projets",
      ctaContact: "Me contacter"
    },
    sections: {
      aboutTitle: "À propos",
      aboutText: "Passionnée par la création d’expériences digitales fluides et agréables, je conçois des sites web performants et responsive. Grâce à mes compétences, je transforme des idées en interfaces intuitives, efficaces et plaisantes à utiliser.",
      skillsTitle: "Compétences",
      portfolioTitle: "Portfolio",
      contactTitle: "Contact",
      contactText: "N'hésitez pas à me contacter pour des collaborations ou juste pour dire bonjour !"
    },
    about: {
      tagResponsive: "Responsive Design",
      tagUxUi: "UX/UI",
      tagPerformance: "Performance"
    },
    skills: {
      ariaPrev: "Compétence précédente",
      ariaNext: "Compétence suivante",
      htmlDesc: "Structurer et présenter des contenus web.",
      cssDesc: "Mettre en forme des interfaces modernes.",
      jsDesc: "Ajouter de l'interactivité et du dynamisme.",
      tailwindDesc: "Styliser rapidement les interfaces.",
      wpDesc: "Créer des sites web sur mesure.",
      kirbyDesc: "Un CMS flexible et sans base de données." 

    },
    portfolio: {
      chiroType: "Site professionnel",
      chiroTitle: "Chiropracteur",
      chiroDesc: "Site WordPress responsive pour cabinet de chiropractie.",
      hospelType: "Site professionnel",
      hospelTitle: "Notaire",
      hospelDesc: "Projet réalisé chez Paf! : Site web professionnel pour étude notariale.",
      memisaType: "Site associatif",
      memisaTitle: "Memisa",
      memisaDesc: "Projet réalisé chez Paf! : Site web pour ONG de santé internationale.",
      tags: {
        professional: "Professionnel",
        responsive: "Responsive",
        multilingual: "Multilingue"
      }
    },
    contact: {
      sendEmail: "Envoyer un email"
    },
    footer: {
      jobTitle: "Développeuse Web",
      servicesTitle: "Services",
      serviceDev: "Développement Web",
      serviceWp: "WordPress",
      serviceKirby: "Kirby",
      serviceMaintenance: "Maintenance",
      contactTitle: "Contact",
      location: "Bruxelles, Belgique",
      followTitle: "Suivez-moi",
      copyright: "© 2025 Laurence Pirard — Développeuse Web"
    }
  },
  en: {
    pageTitle: "Laurence's Portfolio - Web Developer",
    nav: {
      about: "About",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    hero: {
      subtitle: "Looking for a Web Developer?",
      subtitle2: "I'm here!",
      ctaProjects: "View My Projects",
      ctaContact: "Contact Me"
    },
    sections: {
      aboutTitle: "About",
      aboutText: "Passionate about creating smooth and enjoyable digital experiences, I design high-performing, responsive websites. Leveraging my skills, I turn ideas into intuitive, efficient, and user-friendly interfaces.",
      skillsTitle: "Skills",
      portfolioTitle: "Portfolio",
      contactTitle: "Get in Touch",
      contactText: "Feel free to reach out for collaborations or just to say a friendly hello!"
    },
    about: {
      tagResponsive: "Responsive Design",
      tagUxUi: "UX/UI",
      tagPerformance: "Performance"
    },
    skills: {
      ariaPrev: "Previous skill",
      ariaNext: "Next skill",
      htmlDesc: "Structuring and presenting web content.",
      cssDesc: "Styling modern and responsive interfaces.",
      jsDesc: "Adding interactivity and dynamic features.",
      tailwindDesc: "Rapidly styling user interfaces.",
      wpDesc: "Creating custom-made websites.",
      kirbyDesc: "A flexible, file-based CMS."

    },
    portfolio: {
      chiroType: "Professional Website",
      chiroTitle: "Chiropractor",
      chiroDesc: "Responsive WordPress site for a chiropractic clinic.",
      hospelType: "Professional Website",
      hospelTitle: "Notary",
      hospelDesc: "Project carried out at Paf!: Professional website for a notary office.",
      memisaType: "Non-profit Website",
      memisaTitle: "Memisa",
      memisaDesc: "Project carried out at Paf!: Website for an international health NGO.",

      tags: {
        professional: "Professional",
        responsive: "Responsive",
        multilingual: "Multilingual"
      }
    },
    contact: {
      sendEmail: "Send an email"
    },
    footer: {
      jobTitle: "Web Developer",
      servicesTitle: "Services",
      serviceDev: "Web Development",
      serviceWp: "WordPress",
      serviceKirby: "Kirby",
      serviceMaintenance: "Maintenance",
      contactTitle: "Contact",
      location: "Brussels, Belgium",
      followTitle: "Follow me",
      copyright: "© 2025 Laurence Pirard — Web Developer"
    }
  }
};



// Fonction pour changer la langue
function changeLanguage(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('preferredLanguage', lang);
  updateTexts(lang);
  updateLanguageButtons(lang);
}

// Fonction de mise à jour des textes
function updateTexts(lang) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    const keys = key.split('.');
    
    let text = translations[lang];
    for (const k of keys) {
      text = text ? text[k] : undefined;
    }
    
    if (text) {
      // Pour les 'aria-label', on met à jour l'attribut, sinon le contenu
      if (element.hasAttribute('aria-label')) {
        element.setAttribute('aria-label', text);
      } else if (element.tagName === 'TITLE') {
        element.textContent = text;
      }
      else {
        element.textContent = text;
      }
    }
  });
}

// Fonction pour mettre à jour l'état des boutons de langue
function updateLanguageButtons(lang) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
  changeLanguage(savedLang);
});