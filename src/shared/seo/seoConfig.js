import { SITE_NAME, resolveCanonical } from "./siteConfig.js";
import { getArticleCover } from "../../features/insights/utils/articleCover.js";
import { getArticleTheme, getThemeArticles, themePath } from "../../features/insights/data/themes.js";
import { publicacoes } from "../../features/insights/data/publicacoes.js";
import { getSortedArticles } from "../../features/insights/utils/articles.js";
export { resolveCanonical };
const organizationId = resolveCanonical("/#organization");
const websiteId = resolveCanonical("/#website");

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
        "@id": organizationId,
        name: defaultSeo.siteName,
        url: canonical,
        logo: resolveCanonical("/im-light-512.png"),
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": websiteId,
        publisher: { "@id": organizationId },
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
  const theme = getArticleTheme(article);
  const publishedTime = article.edicaoRetroativa ? (article.dataPublicacao || "") : (article.data || "");
  const modifiedTime = article.updatedAt || publishedTime;

  return {
    ...defaultSeo,
    title: `${article.titulo} | IM Estratégia e Gestão`,
    description: article.excerpt || article.descricao || defaultSeo.description,
    canonical,
    type: "article",
    robots: article.edicaoRetroativa && !article.dataPublicacao ? "noindex,nofollow" : "index,follow",
    image: getArticleCover(article) || defaultSeo.image,
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
          ...(theme ? [{ "@type": "ListItem", position: 3, name: theme.title, item: resolveCanonical(themePath(theme)) }] : []),
          {
            "@type": "ListItem",
            position: theme ? 4 : 3,
            name: article.titulo,
            item: canonical,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: article.titulo,
        description: article.excerpt || article.descricao,
        author: {
          "@type": "Organization",
          "@id": organizationId,
          name: article.autor || defaultSeo.siteName,
        },
        publisher: {
          "@type": "Organization",
          "@id": organizationId,
          name: defaultSeo.siteName,
          logo: {
            "@type": "ImageObject",
            url: resolveCanonical("/im-light-512.png"),
          },
        },
        ...(publishedTime ? { datePublished: publishedTime, dateModified: modifiedTime } : {}),
        mainEntityOfPage: canonical,
        ...(theme ? { about: { "@id": resolveCanonical(themePath(theme)) + "#topic", "@type": "Thing", name: theme.title } } : {}),
        image: resolveCanonical(getArticleCover(article) || defaultSeo.image),
        keywords: (article.palavrasChave || []).join(", "),
        articleSection: article.categoria || "Insights",
      },
    ],
  };
}

export function getThemeSeo(theme) {
  const canonical = resolveCanonical(themePath(theme));
  const articles = getSortedArticles(getThemeArticles(theme, publicacoes));
  const topic = { "@id": canonical + "#topic", "@type": "Thing", name: theme.title, description: theme.definition };
  return {
    ...defaultSeo,
    title: `${theme.title} | IM Estratégia e Gestão`, description: theme.description, canonical, type: "website",
    jsonLd: [
      { "@context": "https://schema.org", "@type": "CollectionPage", "@id": canonical + "#page", url: canonical, name: theme.title, description: theme.description, about: topic,
        isPartOf: { "@id": websiteId }, publisher: { "@id": organizationId },
        mainEntity: { "@type": "ItemList", itemListElement: articles.map((article, index) => ({ "@type": "ListItem", position: index + 1, url: resolveCanonical(`/insights/${article.slug}`), name: article.titulo })) },
      },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: resolveCanonical("/") },
        { "@type": "ListItem", position: 2, name: "Insights", item: resolveCanonical("/insights") },
        { "@type": "ListItem", position: 3, name: theme.title, item: canonical },
      ] },
    ],
  };
}

export function getNotFoundSeo() {
  return { ...defaultSeo, title: "Página não encontrada | IM Estratégia e Gestão", description: "O conteúdo solicitado não está disponível.", canonical: resolveCanonical("/insights"), robots: "noindex,follow", type: "website", jsonLd: [] };
}
