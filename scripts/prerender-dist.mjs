import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
import { SITE_NAME, resolveCanonical } from "../src/shared/seo/siteConfig.js";
const DEFAULT_IMAGE = resolveCanonical("/im-light-512.png");

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSeoBlock(meta) {
  const tags = [
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="robots" content="${escapeHtml(meta.robots || "index,follow")}" />`,
    `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.type || "website")}" />`,
    `<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(meta.image ? resolveCanonical(meta.image) : DEFAULT_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.image ? resolveCanonical(meta.image) : DEFAULT_IMAGE)}" />`,
  ];

  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(meta.publishedTime)}" />`);
  }

  if (meta.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${escapeHtml(meta.modifiedTime)}" />`);
  }

  const jsonLd = (meta.jsonLd || [])
    .map((entry) => `<script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(entry).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");

  return `<!-- SEO:START -->\n    ${tags.join("\n    ")}\n    ${jsonLd}\n    <!-- SEO:END -->`;
}

function injectSeo(html, meta) {
  const cleanHtml = html.replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "\n");
  const withTitle = cleanHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  return withTitle.replace("</head>", `    ${buildSeoBlock(meta)}\n  </head>`);
}

function writeRouteHtml(route, template, { html, meta }, is404 = false) {
  const filename = is404 ? "404.html" : route === "/" ? "index.html" : route.slice(1) + ".html";
  const outputPath = path.join(DIST_DIR, filename);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const document = injectSeo(template, meta).replace('<div id="root"></div>', () => '<div id="root"' + (is404 ? '' : ' data-prerendered="true"') + '>' + html + '</div>');
  fs.writeFileSync(outputPath, document, "utf8");
}
async function main() {
  const template = fs.readFileSync(path.join(DIST_DIR, "index.html"), "utf8");
  const { routes, renderPage } = await import(pathToFileURL(path.join(ROOT, ".ssg", "entry-server.js")).href);
  for (const route of routes) writeRouteHtml(route, template, renderPage(route));
  writeRouteHtml("/404", template, renderPage("/404"), true);
}
main();
