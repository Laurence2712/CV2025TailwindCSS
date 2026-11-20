// Captures des pages affichées en fond flou au survol des liens du menu (npm run build:previews).
// À relancer après une modification visible du haut d'une page.
// Chrome est cherché dans CHROME_PATH, sinon à l'emplacement par défaut sur macOS.
const path = require('path');
const puppeteer = require('puppeteer-core');

const root = path.resolve(__dirname, '..');
const chrome = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pages = [
  ['home', 'index.html'],
  ['projets', 'projet.html'],
  ['services', 'services.html'],
  ['about', 'about.html'],
  ['contact', 'services.html', '#formulaire'],
];

(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
  for (const [name, file, anchor] of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 0.5 });
    // pas d'écran d'entrée ni d'animations : on veut l'état final de la page
    await page.evaluateOnNewDocument(() => {
      try { sessionStorage.setItem('introSeen', '1'); localStorage.setItem('preferredLanguage', 'fr'); } catch (e) {}
    });
    await page.goto('file://' + path.join(root, file), { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important} #main-header,#scroll-top{visibility:hidden}' });
    if (anchor) await page.evaluate(sel => document.querySelector(sel).scrollIntoView(), anchor);
    // compteurs animés (5+, 2020) : on attend qu'ils aient atteint leur valeur finale
    await page.waitForFunction(() => [...document.querySelectorAll('[data-count]')]
      .every(el => el.textContent === el.dataset.count + (el.dataset.suffix || '')), { timeout: 8000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 600));
    const out = path.join(root, 'uploads/menu', name + '.webp');
    await page.screenshot({ path: out, type: 'webp', quality: 60 });
    console.log('uploads/menu/' + name + '.webp');
    await page.close();
  }
  await browser.close();
})();
