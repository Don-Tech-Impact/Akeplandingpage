import { readFile, writeFile, mkdir } from "node:fs/promises";

const { origin, pages } = JSON.parse(
  await readFile(new URL("../src/seo.json", import.meta.url), "utf8"),
);
const dist = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", dist), "utf8");
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

for (const [path, page] of Object.entries(pages)) {
 for (const language of ["en", "fr"]) {
  const localizedPath = language === "fr" ? `/fr${path === "/" ? "" : path}` : path;
  const url = `${origin}${localizedPath}`;
  const { title, description } = language === "fr"
    ? { title: page.frTitle, description: page.frDescription }
    : page;
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${language === "fr" ? "fr_FR" : "en_GB"}$2`)
    .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${origin}${path}$2`)
    .replace(/(<link rel="alternate" hreflang="fr" href=")[^"]*(")/, `$1${origin}/fr${path === "/" ? "" : path}$2`)
    .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${origin}${path}$2`);
  const directory = new URL(localizedPath === "/" ? "./" : `.${localizedPath}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
 }
}

for (const language of ["en", "fr"]) {
  const path = language === "fr" ? "/fr/thank-you" : "/thank-you";
  const title = language === "fr" ? "Informations sur votre demande | ScholarFlow" : "Request information | ScholarFlow";
  const description = language === "fr"
    ? "Si vous avez envoyé une demande, un membre de notre équipe vous répondra dans un délai d’un jour ouvrable."
    : "If you submitted a request, a member of our team will reply within one business day.";
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="robots" content=")[^"]*(")/, "$1noindex, nofollow$2")
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${origin}${path}$2`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${origin}${path}$2`)
    .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${language === "fr" ? "fr_FR" : "en_GB"}$2`)
    .replace(/(<link rel="alternate" hreflang="en" href=")[^"]*(")/, `$1${origin}/thank-you$2`)
    .replace(/(<link rel="alternate" hreflang="fr" href=")[^"]*(")/, `$1${origin}/fr/thank-you$2`)
    .replace(/(<link rel="alternate" hreflang="x-default" href=")[^"]*(")/, `$1${origin}/thank-you$2`);
  const directory = new URL(`.${path}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

await writeFile(new URL("robots.txt", dist),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.keys(pages).flatMap((path) => [
    `  <url><loc>${origin}${path}</loc></url>`,
    `  <url><loc>${origin}/fr${path === "/" ? "" : path}</loc></url>`,
  ]).join("\n") +
  `\n</urlset>\n`);
