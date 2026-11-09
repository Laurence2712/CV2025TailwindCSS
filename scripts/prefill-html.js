// Écrit les textes FR de js/translations.js directement dans le HTML (npm run build:html).
// Le contenu existe ainsi dès le premier affichage : pas de saut de mise en page, et lisible par Google.
const fs = require('fs');
const vm = require('vm');

const noop = () => {};
const ctx = {
  window: {},
  document: { addEventListener: noop, querySelectorAll: () => [], documentElement: {} },
  localStorage: { getItem: () => null, setItem: noop },
  navigator: { language: 'fr' },
  console,
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('js/translations.js', 'utf8') + '\n;this.__t = translations;', ctx);
const fr = ctx.__t.fr;
const lookup = key => key.split('.').reduce((o, k) => (o ? o[k] : undefined), fr);

// <tag ... data-translate="clé" ...>contenu</tag> — mêmes exclusions que updateTexts() : <title> et aria-label
const re = /<([a-z][a-z0-9]*)\b([^>]*\bdata-translate="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g;

for (const file of ['index.html', 'about.html', 'services.html', 'projet.html']) {
  let count = 0;
  const html = fs.readFileSync(file, 'utf8').replace(re, (match, tag, attrs, key) => {
    const text = lookup(key);
    if (tag === 'title' || /\baria-label=/.test(attrs) || typeof text !== 'string') return match;
    count++;
    return `<${tag}${attrs}>${text}</${tag}>`;
  });
  fs.writeFileSync(file, html);
  console.log(`${file}: ${count} textes`);
}
