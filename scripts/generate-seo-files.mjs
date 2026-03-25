import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(ROOT, "src", "features", "insights", "data", "publicacoes.js");
const SITE_URL = "https://www.imgestao.com.br";

function normalizeDate(value = "") {
  const match = String(value || "").match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
}

function buildSitemapXml(publicacoes = []) {
  const staticRoutes = [
    { loc: `${SITE_URL}/`, lastmod: null, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/insights`, lastmod: null, changefreq: "daily", priority: "0.9" },
  ];

  const articleRoutes = publicacoes.map((article) => ({
    loc: `${SITE_URL}/insights/${article.slug}`,
    lastmod: normalizeDate(article.updatedAt || article.data) || null,
    changefreq: "weekly",
    priority: "0.8",
  }));

  const entries = [...staticRoutes, ...articleRoutes]
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

async function main() {
  const moduleUrl = pathToFileURL(DATA_FILE).href;
  const { publicacoes } = await import(moduleUrl);

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), buildSitemapXml(publicacoes), "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, "robots.txt"), buildRobotsTxt(), "utf8");
}

main();
