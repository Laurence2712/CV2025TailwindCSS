const translations = {
  fr: {
    pageTitle: "Laurence Pirard — Développeuse Web Front-End",
    nav: {
      about: "À propos",
      experience: "Expérience",
      skills: "Compétences",
      craft: "Fait main",
      portfolio: "Portfolio",
      contact: "Contact",
      cv: "CV"
    },
    hero: {
      available: "Disponible pour missions freelance",
      eyebrow: "Développeuse Web Front-End · Bruxelles, Belgique",
      subtitle: "Vous cherchez une développeuse web ?",
      subtitle2: "",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
      ctaCV: "Mon CV",
      scrollHint: "Défiler"
    },
    sections: {
      aboutTitle: "À propos",
      aboutText: "Développeuse web front-end basée à Bruxelles. Spécialisée <strong>WordPress, TailwindCSS, JavaScript et PHP</strong>, je transforme vos idées en sites web performants, mobile first et accessibles — de la maquette à la mise en ligne.",
      aboutText2: "Je travaille chez <strong>Paf! Design</strong> et je mène des projets freelance en parallèle pour élargir mes compétences et explorer de nouvelles technologies. Ce qui me motive : les projets où chaque détail compte, et où le code au service du design crée quelque chose de vraiment utile.",
      experienceTitle: "Parcours",
      experienceSubtitle: "De la formation au freelance",
      skillsTitle: "Compétences",
      craftTitle: "Fait main",
      craftLead: "Ce site est lui-même une démonstration. Voici les techniques qui l'animent.",
      portfolioTitle: "Portfolio",
      contactTitle: "Un projet en tête ?",
      contactText: "Disponible pour des missions freelance à Bruxelles et à distance. Parlez-moi de votre projet — je réponds vite."
    },
    about: {
      tagResponsive: "Responsive Design",
      tagUxUi: "UX / UI",
      tagPerformance: "Performance",
      tagWp: "WordPress",
      tagTailwind: "TailwindCSS",
      downloadCV: "Télécharger mon CV",
      stat1num: "5+",
      stat1label: "ans d'expérience",
      stat1: "ans d'expérience en développement web",
      statCoffeeNum: "7 300+",
      statCoffeeLabel: "cafés — 4 par jour depuis 5 ans",
      statCoffee: "cafés — 4 par jour depuis 5 ans",
      stat3: "Web Developer — EPFC, Bruxelles",
      locationLabel: "Bruxelles, Belgique",
      locationSub: "Europe · UTC+1",
      availableLabel: "Disponible",
      availableSub: "Missions freelance"
    },
    formation: {
      date1: "Diplômée 2020",
      title1: "BES Web Developer — Grande distinction",
      school1: "EPFC · Bruxelles",
      desc1: "Formation certifiante en développement web. HTML5/CSS3, JavaScript, PHP, jQuery, WordPress, Bootstrap, bases de données, Photoshop/Illustrator."
    },
    experience: {
      date1: "2023 – Présent",
      title1: "Développeuse Web Freelance",
      company1: "Indépendante · Bruxelles",
      desc1: "Conception et développement de sites web sur mesure. Gestion complète des projets : découverte, maquette, intégration, déploiement, maintenance. Je mène aussi des projets personnels pour explorer de nouvelles technologies et garder une veille active.",
      date2: "Juil. 2021 – Présent",
      title2: "Développeuse Web",
      company2: "Paf! Design · Bruxelles",
      desc2: "Développement de thèmes WordPress sur-mesure : ACF (Flexible Content), templating PHP (tpl/), hooks, WooCommerce, WPML, SCSS modulaire compilé via Gulp/NPM, intégrations JS (Swiper, lightbox, Google Maps). Projets pour Hospel Notaire, l'ONG Memisa (FR/EN/NL), Europcar. Outils : Atlassian, Contentful.",
      date3: "Oct. 2018 – Jan. 2019 · Stage",
      title3: "Stagiaire Développeuse Web",
      company3: "MFM Digital · Bruxelles",
      desc3: "Stage en entreprise dans le cadre de la formation EPFC. Intégration HTML/CSS, JavaScript et travail sur des projets web réels dans un contexte professionnel.",
      tag3Institutional: "Stage"
    },
    skills: {
      ariaPrev: "Compétence précédente",
      ariaNext: "Compétence suivante",
      htmlDesc: "Sémantique, accessibilité, structure solide.",
      cssDesc: "Animations, Grid, Flexbox — des interfaces qui respirent.",
      scssDesc: "Architecture SCSS modulaire, compilation via Gulp/NPM, media-queries et composants réutilisables.",
      jsDesc: "Vanilla JS, jQuery, GSAP, Swiper, logique d'interaction et scripts sur mesure.",
      tailwindDesc: "Utility-first, prototypage rapide, cohérence garantie.",
      phpDesc: "Templates WordPress, shortcodes, AJAX, sécurisation des sorties (esc_html, esc_url).",
      wpDesc: "Thèmes custom, hooks/filters, templates PHP, wp_enqueue, post types, menus.",
      acfDesc: "Champs personnalisés, flexible content, galeries et options pages.",
      wooDesc: "E-commerce WordPress — templates, hooks et personnalisation avancée.",
      wpmlDesc: "Sites multilingues (FR/EN/NL), requêtes WPML-aware, colonnes suffixées.",
      strapiDesc: "CMS headless — API REST & contenu flexible.",
      kirbyDesc: "CMS robustes pour projets complexes."
    },
    craft: {
      card1tag: "Vanilla JS",
      card1title: "Curseur magnétique",
      card1desc: "Anneau fluide piloté par interpolation LERP et <code>requestAnimationFrame</code> — sans librairie.",
      zeroDeps: "dépendances JS",
      card2tag: "CSS + JS",
      card2title: "Zéro librairie",
      card2desc: "Toutes les animations en CSS natif et JS pur — aucune dépendance externe.",
      card3tag: "CSS clamp()",
      card3title: "Typographie fluide",
      card3desc: "Tailles adaptées sans breakpoints grâce à <code>clamp()</code> — du mobile au grand écran.",
      card4tag: "Web API",
      card4title: "Scroll intelligent",
      card4desc: "<code>IntersectionObserver</code> déclenche chaque animation au moment exact où l'élément entre dans le viewport.",
      card5tag: "i18n",
      card5title: "Bilingue natif",
      card5desc: "Système FR/EN maison avec <code>localStorage</code> — changement instantané, zéro rechargement.",
      card6tag: "CSS Custom Props",
      card6title: "Variables CSS",
      card6desc: "Thème complet piloté par <code>:root</code> — couleurs, surfaces et accents modifiables d'une seule ligne.",
      card7tag: "SVG Filter",
      card7title: "Texture organique",
      card7desc: "Bruit de grain vivant généré en pur SVG via <code>feTurbulence</code>, sans une seule image.",
      card8tag: "Tailwind v3",
      card8title: "Build léger",
      card8desc: "CSS compilé uniquement pour les classes utilisées — purge automatique, zéro superflu."
    },
    portfolio: {
      chiroType: "Site professionnel",
      chiroTitle: "Chiropracteur",
      chiroDesc: "Site WordPress vitrine pour un cabinet de chiropractie à Mons — responsive, rapide et pensé pour les conversions.",
      hospelType: "Site institutionnel",
      hospelTitle: "Notaire Hospel",
      hospelDesc: "Site développé chez <a href='https://pafdesign.be/' target='_blank' rel='noopener noreferrer'>Paf!</a> pour une étude notariale bruxelloise.",
      memisaType: "Site associatif",
      memisaTitle: "Memisa",
      memisaDesc: "Site multilingue (FR/EN/NL) pour l'ONG Memisa, réalisé chez <a href='https://pafdesign.be/' target='_blank' rel='noopener noreferrer'>Paf!</a>.",
      poulettesType: "Projet personnel",
      poulettesTitle: "Les Poulettes",
      poulettesDesc: "E-commerce créé de A à Z pour explorer Strapi (CMS headless), Vercel et Render. Découverte personnelle d'un stack moderne hors agence.",
      tags: {
        professional: "Professionnel",
        responsive: "Responsive",
        multilingual: "Multilingue",
        personal: "Projet perso"
      }
    },
    contact: {
      sendEmail: "Envoyer un email",
      linkedin: "LinkedIn",
      downloadCV: "Mon CV"
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
      copyright: "© 2026 Laurence Pirard — Développeuse Web"
    }
  },
  en: {
    pageTitle: "Laurence Pirard — Front-End Web Developer",
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      craft: "Handcrafted",
      portfolio: "Portfolio",
      contact: "Contact",
      cv: "Resume"
    },
    hero: {
      available: "Available for freelance projects",
      eyebrow: "Front-End Web Developer · Brussels, Belgium",
      subtitle: "Looking for a web developer?",
      subtitle2: "",
      ctaProjects: "View my projects",
      ctaContact: "Contact me",
      ctaCV: "My Resume",
      scrollHint: "Scroll"
    },
    sections: {
      aboutTitle: "About",
      aboutText: "Front-end web developer based in Brussels. Specialising in <strong>WordPress, TailwindCSS, JavaScript and PHP</strong>, I turn ideas into mobile-first, accessible and high-performing websites — from wireframe to launch.",
      aboutText2: "I work at <strong>Paf! Design</strong> and run freelance projects on the side to broaden my skills and explore new technologies. What drives me: projects where every detail matters, and where code serving design creates something truly useful.",
      experienceTitle: "Journey",
      experienceSubtitle: "From training to freelance",
      skillsTitle: "Skills",
      craftTitle: "Handcrafted",
      craftLead: "This site is itself a demonstration. Here are the techniques that power it.",
      portfolioTitle: "Portfolio",
      contactTitle: "Got a project in mind?",
      contactText: "Available for freelance work in Brussels and remotely. Tell me about your project — I reply fast."
    },
    about: {
      tagResponsive: "Responsive Design",
      tagUxUi: "UX / UI",
      tagPerformance: "Performance",
      tagWp: "WordPress",
      tagTailwind: "TailwindCSS",
      downloadCV: "Download my Resume",
      stat1num: "5+",
      stat1label: "years of experience",
      stat1: "years of web development experience",
      statCoffeeNum: "7,300+",
      statCoffeeLabel: "coffees — 4 a day for 5 years",
      statCoffee: "coffees — 4 a day for 5 years",
      stat3: "Web Developer — EPFC, Brussels",
      locationLabel: "Brussels, Belgium",
      locationSub: "Europe · UTC+1",
      availableLabel: "Available",
      availableSub: "Freelance projects"
    },
    formation: {
      date1: "Graduated 2020",
      title1: "BES Web Developer — High Distinction",
      school1: "EPFC · Brussels",
      desc1: "Certified web development program. HTML5/CSS3, JavaScript, PHP, jQuery, WordPress, Bootstrap, databases, Photoshop/Illustrator."
    },
    experience: {
      date1: "2023 – Present",
      title1: "Freelance Web Developer",
      company1: "Self-employed · Brussels",
      desc1: "Custom website design and development. Full project ownership: discovery, wireframing, integration, deployment and maintenance. Personal projects on the side to keep exploring new technologies and stay current.",
      date2: "Jul. 2021 – Present",
      title2: "Web Developer",
      company2: "Paf! Design · Brussels",
      desc2: "Custom WordPress theme development: ACF (Flexible Content), PHP templating (tpl/), hooks, WooCommerce, WPML, modular SCSS compiled via Gulp/NPM, JS integrations (Swiper, lightbox, Google Maps). Projects for Hospel Notaire, Memisa NGO (FR/EN/NL), Europcar. Tools: Atlassian, Contentful.",
      date3: "Oct. 2018 – Jan. 2019 · Internship",
      title3: "Web Developer Intern",
      company3: "MFM Digital · Brussels",
      desc3: "Internship during the EPFC training program. HTML/CSS integration, JavaScript and hands-on work on real web projects in a professional environment.",
      tag3Institutional: "Internship"
    },
    skills: {
      ariaPrev: "Previous skill",
      ariaNext: "Next skill",
      htmlDesc: "Semantics, accessibility, solid structure.",
      cssDesc: "Animations, Grid, Flexbox — interfaces that breathe.",
      scssDesc: "Modular SCSS architecture, Gulp/NPM compilation, media-queries and reusable components.",
      jsDesc: "Vanilla JS, jQuery, GSAP, Swiper — interaction logic and custom scripts.",
      tailwindDesc: "Utility-first, rapid prototyping, guaranteed consistency.",
      phpDesc: "WordPress templates, shortcodes, AJAX, secure output (esc_html, esc_url).",
      wpDesc: "Custom themes, hooks/filters, PHP templates, wp_enqueue, post types, menus.",
      acfDesc: "Custom fields, flexible content, image galleries and options pages.",
      wooDesc: "WordPress e-commerce — templates, hooks and advanced customisation.",
      wpmlDesc: "Multilingual sites (FR/EN/NL), WPML-aware queries, language-suffixed columns.",
      strapiDesc: "Headless CMS — REST API & flexible content.",
      kirbyDesc: "Robust CMSs for complex projects."
    },
    craft: {
      card1tag: "Vanilla JS",
      card1title: "Magnetic cursor",
      card1desc: "Smooth ring driven by LERP interpolation and <code>requestAnimationFrame</code> — no library.",
      zeroDeps: "JS dependencies",
      card2tag: "CSS + JS",
      card2title: "Zero library",
      card2desc: "All animations in native CSS and pure JS — zero external animation dependencies.",
      card3tag: "CSS clamp()",
      card3title: "Fluid typography",
      card3desc: "Sizes that adapt without breakpoints thanks to <code>clamp()</code> — from mobile to widescreen.",
      card4tag: "Web API",
      card4title: "Smart scroll",
      card4desc: "<code>IntersectionObserver</code> triggers each animation at the exact moment the element enters the viewport.",
      card5tag: "i18n",
      card5title: "Native bilingual",
      card5desc: "In-house FR/EN system with <code>localStorage</code> — instant switch, zero page reload.",
      card6tag: "CSS Custom Props",
      card6title: "CSS variables",
      card6desc: "Full theme driven by <code>:root</code> — colours, surfaces and accents changeable in one line.",
      card7tag: "SVG Filter",
      card7title: "Organic texture",
      card7desc: "Living grain noise generated in pure SVG via <code>feTurbulence</code> — not a single image.",
      card8tag: "Tailwind v3",
      card8title: "Lightweight build",
      card8desc: "CSS compiled only for used classes — automatic purge, zero bloat."
    },
    portfolio: {
      chiroType: "Professional Website",
      chiroTitle: "Chiropractor",
      chiroDesc: "WordPress showcase site for a chiropractic clinic in Mons — responsive, fast and conversion-focused.",
      hospelType: "Institutional Website",
      hospelTitle: "Notary Hospel",
      hospelDesc: "Site built at <a href='https://pafdesign.be/' target='_blank' rel='noopener noreferrer'>Paf!</a> for a Brussels notary practice.",
      memisaType: "Non-profit Website",
      memisaTitle: "Memisa",
      memisaDesc: "Multilingual site (FR/EN/NL) for Memisa NGO, built at <a href='https://pafdesign.be/' target='_blank' rel='noopener noreferrer'>Paf!</a>.",
      poulettesType: "Personal Project",
      poulettesTitle: "Les Poulettes",
      poulettesDesc: "E-commerce built from scratch to explore Strapi (headless CMS), Vercel and Render. Personal discovery of a modern stack outside the agency.",
      tags: {
        professional: "Professional",
        responsive: "Responsive",
        multilingual: "Multilingual",
        personal: "Personal project"
      }
    },
    contact: {
      sendEmail: "Send an email",
      linkedin: "LinkedIn",
      downloadCV: "My Resume"
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
      copyright: "© 2026 Laurence Pirard — Web Developer"
    }
  }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
  try {
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateTexts(lang);
    updateLanguageButtons(lang);
  } catch (error) {
    console.error('Error changing language:', error);
  }
}

// Rendre accessible depuis le HTML
window.changeLanguage = changeLanguage;

// Fonction de mise à jour des textes
function updateTexts(lang) {
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(element => {
    try {
      const key = element.dataset.translate;
      const keys = key.split('.');

      let text = translations[lang];
      for (const k of keys) {
        text = text ? text[k] : undefined;
      }

      if (text) {
        if (element.tagName === 'TITLE') {
          element.textContent = text;
        } else if (element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', text);
        } else {
          element.innerHTML = text; // innerHTML pour supporter les <a>
        }
      }
    } catch (error) {
      console.error('Error updating text for element:', element, error);
    }
  });
}

// Fonction pour mettre à jour l'état des boutons de langue
function updateLanguageButtons(lang) {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    try {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    } catch (error) {
      console.error('Error updating language button:', btn, error);
    }
  });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  try {
    const savedLang = localStorage.getItem('preferredLanguage') || 'fr';
    changeLanguage(savedLang);
  } catch (error) {
    console.error('Error during initialization:', error);
    changeLanguage('fr');
  }
});

// Export pour les modules (optionnel)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, changeLanguage };
}
