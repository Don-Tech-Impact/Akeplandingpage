import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const seo = JSON.parse(await readFile(new URL('../src/seo.json', import.meta.url), 'utf8'));

const dist = new URL('../dist/', import.meta.url);
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
for (const path of Object.keys(seo.pages)) {
  for (const language of ['en', 'fr']) {
    const localized = language === 'fr' ? `/fr${path === '/' ? '' : path}` : path;
    const html = await readFile(new URL(`${localized === '/' ? '.' : `.${localized}`}/index.html`, dist), 'utf8');
    assert.ok(html.includes(`<html lang="${language}">`), `${localized}: incorrect language`);
    assert.ok(html.includes(`<link rel="canonical" href="${seo.origin}${localized}"`), `${localized}: incorrect canonical`);
    assert.ok(html.includes(`hreflang="en" href="${seo.origin}${path}"`), `${localized}: missing English alternate`);
    assert.ok(html.includes(`hreflang="fr" href="${seo.origin}/fr${path === '/' ? '' : path}"`), `${localized}: missing French alternate`);
    assert.ok(sitemap.includes(`<loc>${seo.origin}${localized}</loc>`), `${localized}: missing from sitemap`);
  }
}
for (const path of ['/thank-you', '/fr/thank-you']) {
  const html = await readFile(new URL(`.${path}/index.html`, dist), 'utf8');
  assert.ok(html.includes('<meta name="robots" content="noindex, nofollow"'), `${path}: missing noindex`);
  assert.ok(!sitemap.includes(`<loc>${seo.origin}${path}</loc>`), `${path}: should not be in sitemap`);
}
console.log(`SEO checks passed for ${Object.keys(seo.pages).length * 2} pages.`);
