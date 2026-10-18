import { readFile, writeFile, mkdir } from "node:fs/promises";

const { origin, pages } = JSON.parse(
  await readFile(new URL("../src/seo.json", import.meta.url), "utf8"),
);
const dist = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", dist), "utf8");
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[char]);

for (const [path, { title, description }] of Object.entries(pages)) {
  const url = `${origin}${path}`;
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*(")/g, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(")/g, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  const directory = new URL(path === "/" ? "./" : `.${path}/`, dist);
  await mkdir(directory, { recursive: true });
  await writeFile(new URL("index.html", directory), html);
}

await writeFile(new URL("robots.txt", dist),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL("sitemap.xml", dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.keys(pages).map((path) => `  <url><loc>${origin}${path}</loc></url>`).join("\n") +
  `\n</urlset>\n`);
