import { readFile, writeFile } from 'node:fs/promises';
import { transformWithEsbuild } from 'vite';

async function loadDictionary(name) {
  const file = new URL(`../src/i18n/${name}.ts`, import.meta.url);
  const source = await readFile(file, 'utf8');
  const { code } = await transformWithEsbuild(source, file.pathname, { loader: 'ts', format: 'esm' });
  return (await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`))[name];
}

const en = await loadDictionary('en');
const fr = await loadDictionary('fr');
const errors = [];
const placeholders = (value) => [...value.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]).sort();
for (const key of Object.keys(en)) {
  if (typeof fr[key] !== 'string' || !fr[key].trim()) {
    errors.push(`Missing French translation: ${key}`);
  } else if (JSON.stringify(placeholders(en[key])) !== JSON.stringify(placeholders(fr[key]))) {
    errors.push(`Placeholder mismatch: ${key}`);
  } else if ((key.startsWith('dashboard.') || key.startsWith('spot.') || key.startsWith('video.')) && en[key].split('|').length !== fr[key].split('|').length) {
    errors.push(`Translation item count mismatch: ${key}`);
  }
}
for (const key of Object.keys(fr)) {
  if (!Object.hasOwn(en, key)) errors.push(`Unexpected French key: ${key}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else if (process.argv.includes('--csv')) {
  const cell = (value) => `"${value.replaceAll('"', '""')}"`;
  const rows = Object.keys(en).flatMap((key) => {
    const english = en[key].split('|');
    const french = fr[key].split('|');
    return english.length === 1
      ? [[key, en[key], fr[key], '', '']]
      : english.map((text, index) => [`${key}[${index}]`, text, french[index], '', '']);
  });
  const seo = JSON.parse(await readFile(new URL('../src/seo.json', import.meta.url), 'utf8'));
  for (const [path, page] of Object.entries(seo.pages)) {
    rows.push([`seo.${path}.title`, page.title, page.frTitle, '', '']);
    rows.push([`seo.${path}.description`, page.description, page.frDescription, '', '']);
  }
  await writeFile(new URL('../french-review.csv', import.meta.url),
    `key,english,french,reviewer_comment,approved\n${rows.map((row) => row.map(cell).join(',')).join('\n')}\n`);
}
