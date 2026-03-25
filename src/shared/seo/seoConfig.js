const SITE_NAME = "IM Estratégia e Gestão";
const DEFAULT_BASE_URL = "https://www.imgestao.com.br";
const RAW_SITE_URL = import.meta.env.VITE_SITE_URL || DEFAULT_BASE_URL;

function getBaseUrl() {
  return String(RAW_SITE_URL).replace(/\/+$/, "");
}

export function resolveCanonical(pathname = "/") {
  return new URL(pathname, `${getBaseUrl()}/`).toString();
}

export const defaultSeo = {
  siteName: SITE_NAME,
  title: "IM Estratégia e Gestão",
  description:
    "Consultoria em estratégia, governança e transformação para empresas que precisam evoluir com clareza e execução.",
  image: "/im-light-512.png",
  robots: "index,follow",
};

export function getHomeSeo() {
  const canonical = resolveCanonical("/");

  return {
    ...defaultSeo,
    title: "IM Estratégia e Gestão | Consultoria em Estratégia, Governança e Transformação",
    canonical,
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: defaultSeo.siteName,
        url: canonical,
        logo: resolveCanonical("/im-light-512.png"),
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: defaultSeo.siteName,
        url: canonical,
      },
    ],
  };
}

export function getInsightsSeo() {
  const canonical = resolveCanonical("/insights");

  return {
    ...defaultSeo,
    title: "Insights | IM Estratégia e Gestão",
    description:
      "Análises e reflexões sobre estratégia, gestão, governança e transformação organizacional.",
    canonical,
    type: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: resolveCanonical("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: canonical,
          },
        ],
      },
    ],
  };
}

export function getArticleSeo(article) {
  const canonical = resolveCanonical(`/insights/${article.slug}`);
  const publishedTime = article.data || "";
  const modifiedTime = article.updatedAt || article.data || "";

  return {
    ...defaultSeo,
    title: `${article.titulo} | IM Estratégia e Gestão`,
    description: article.excerpt || article.descricao || defaultSeo.description,
    canonical,
    type: "article",
    image: article.cover || defaultSeo.image,
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
            item: resolveCanonical("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: resolveCanonical("/insights"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.titulo,
            item: canonical,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.titulo,
        description: article.excerpt || article.descricao,
        author: {
          "@type": "Organization",
          name: article.autor || defaultSeo.siteName,
        },
        publisher: {
          "@type": "Organization",
          name: defaultSeo.siteName,
          logo: {
            "@type": "ImageObject",
            url: resolveCanonical("/im-light-512.png"),
          },
        },
        datePublished: publishedTime,
        dateModified: modifiedTime,
        mainEntityOfPage: canonical,
        image: resolveCanonical(article.cover || defaultSeo.image),
        keywords: (article.palavrasChave || []).join(", "),
        articleSection: article.categoria || "Insights",
      },
    ],
  };
}
