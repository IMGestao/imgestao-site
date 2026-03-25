import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const DATA_FILE = path.join(ROOT, "src", "features", "insights", "data", "publicacoes.js");
const SITE_URL = process.env.SITE_URL || "https://www.imgestao.com.br";
const SITE_NAME = "IM Estratégia e Gestão";
const DEFAULT_IMAGE = `${SITE_URL}/im-light-512.png`;

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeDate(value = "") {
  const match = String(value || "").match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "";
}

function canonical(pathname = "/") {
  return new URL(pathname, `${SITE_URL}/`).toString();
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
    `<meta property="og:image" content="${escapeHtml(meta.image || DEFAULT_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(meta.image || DEFAULT_IMAGE)}" />`,
  ];

  if (meta.publishedTime) {
    tags.push(`<meta property="article:published_time" content="${escapeHtml(meta.publishedTime)}" />`);
  }

  if (meta.modifiedTime) {
    tags.push(`<meta property="article:modified_time" content="${escapeHtml(meta.modifiedTime)}" />`);
  }

  const jsonLd = (meta.jsonLd || [])
    .map((entry) => `<script type="application/ld+json">${JSON.stringify(entry)}</script>`)
    .join("\n    ");

  return `<!-- SEO:START -->\n    ${tags.join("\n    ")}\n    ${jsonLd}\n    <!-- SEO:END -->`;
}

function injectSeo(html, meta) {
  const cleanHtml = html.replace(/\s*<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "\n");
  const withTitle = cleanHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  return withTitle.replace("</head>", `    ${buildSeoBlock(meta)}\n  </head>`);
}

function writeRouteHtml(routePath, template, meta) {
  const outputPath = path.join(DIST_DIR, ...routePath.split("/"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, injectSeo(template, meta), "utf8");
}

function buildHomeMeta() {
  const pageCanonical = canonical("/");

  return {
    title: "IM Estratégia e Gestão | Consultoria em Estratégia, Governança e Transformação",
    description:
      "Consultoria em estratégia, governança e transformação para empresas que precisam evoluir com clareza e execução.",
    canonical: pageCanonical,
    type: "website",
    image: DEFAULT_IMAGE,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: pageCanonical,
        logo: DEFAULT_IMAGE,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: pageCanonical,
      },
    ],
  };
}

function buildInsightsMeta() {
  const pageCanonical = canonical("/insights");

  return {
    title: "Insights | IM Estratégia e Gestão",
    description:
      "Análises e reflexões sobre estratégia, gestão, governança e transformação organizacional.",
    canonical: pageCanonical,
    type: "website",
    image: DEFAULT_IMAGE,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: canonical("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: pageCanonical,
          },
        ],
      },
    ],
  };
}

function buildArticleMeta(article) {
  const pageCanonical = canonical(`/insights/${article.slug}`);
  const publishedTime = normalizeDate(article.data);
  const modifiedTime = normalizeDate(article.updatedAt || article.data);
  const description = article.excerpt || article.descricao || "Publicação da IM Estratégia e Gestão.";

  return {
    title: `${article.titulo} | IM Estratégia e Gestão`,
    description,
    canonical: pageCanonical,
    type: "article",
    image: article.cover ? canonical(article.cover) : DEFAULT_IMAGE,
    publishedTime,
    modifiedTime,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: canonical("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: canonical("/insights"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.titulo,
            item: pageCanonical,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.titulo,
        description,
        author: {
          "@type": "Organization",
          name: article.autor || SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: DEFAULT_IMAGE,
          },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime,
        mainEntityOfPage: pageCanonical,
        image: article.cover ? canonical(article.cover) : DEFAULT_IMAGE,
        keywords: (article.palavrasChave || []).join(", "),
        articleSection: article.categoria || "Insights",
      },
    ],
  };
}

async function main() {
  const templatePath = path.join(DIST_DIR, "index.html");

  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html não encontrado. Execute vite build antes do prerender.");
  }

  const template = fs.readFileSync(templatePath, "utf8");
  const moduleUrl = pathToFileURL(DATA_FILE).href;
  const { publicacoes } = await import(moduleUrl);

  writeRouteHtml("index.html", template, buildHomeMeta());
  writeRouteHtml("insights/index.html", template, buildInsightsMeta());

  publicacoes.forEach((article) => {
    writeRouteHtml(`insights/${article.slug}/index.html`, template, buildArticleMeta(article));
  });
}

main();
