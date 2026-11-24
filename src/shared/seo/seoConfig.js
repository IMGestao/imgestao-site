import { SITE_NAME, resolveCanonical } from "./siteConfig.js";
import { getArticleCover } from "../../features/insights/utils/articleCover.js";
import { getArticleTheme, getThemeArticles, themePath } from "../../features/insights/data/themes.js";
import { publicacoes } from "../../features/insights/data/publicacoes.js";
import { getSortedArticles } from "../../features/insights/utils/articles.js";
import { CONTACT_EMAIL } from "../institutional/institutionalConfig.js";
import { glossary, glossaryPath, termPath, getTermsByTheme, getTermsByArticle } from "../../features/insights/data/knowledge.js";
export { resolveCanonical };
const organizationId = resolveCanonical("/#organization");
const websiteId = resolveCanonical("/#website");
const conceptEntity = term => ({ "@id": resolveCanonical(termPath(term)), "@type": "DefinedTerm", name: term.name });

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
        description: defaultSeo.description,
        email: CONTACT_EMAIL,
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
          url: resolveCanonical("/sobre-a-im"),
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
        mentions: getTermsByArticle(article.slug).map(conceptEntity),
        image: resolveCanonical(getArticleCover(article) || defaultSeo.image),
        keywords: (article.palavrasChave || []).join(", "),
        articleSection: article.categoria || "Insights",
        ...(article.referencias?.length ? { citation: article.referencias.map(ref => ref.url ? { "@type": "CreativeWork", name: ref.titulo, url: ref.url } : { "@type": "CreativeWork", name: ref.titulo }) } : {}),
      },
    ],
  };
}

export function getInstitutionalSeo(page) {
  const canonical = resolveCanonical(page.path);
  return { ...defaultSeo, title: page.path === "/sobre-a-im" ? page.title : `${page.title} | ${SITE_NAME}`, description: page.description, canonical, type: "website", jsonLd: [
    { "@context": "https://schema.org", "@type": page.type, "@id": canonical + "#page", url: canonical, name: page.title, description: page.description, isPartOf: { "@id": websiteId }, publisher: { "@id": organizationId }, ...(page.type === "AboutPage" ? { mainEntity: { "@id": organizationId, "@type": "Organization", name: SITE_NAME, url: resolveCanonical("/"), email: CONTACT_EMAIL, logo: resolveCanonical("/im-light-512.png") } } : { about: { "@id": organizationId } }) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: resolveCanonical("/") },
      { "@type": "ListItem", position: 2, name: page.title, item: canonical },
    ] },
  ] };
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
        mentions: getTermsByTheme(theme.slug).map(conceptEntity),
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

export function getGlossarySeo() {
  const canonical = resolveCanonical(glossaryPath);
  const title = "Glossário de gestão empresarial";
  const description = "Definições de conceitos de estratégia, governança, processos, transformação digital e desenvolvimento organizacional, conectadas aos Insights da IM.";
  return { ...defaultSeo, title: `${title} | ${SITE_NAME}`, description, canonical, type: "website", jsonLd: [
    { "@context": "https://schema.org", "@type": "WebPage", "@id": canonical + "#page", url: canonical, name: title, description, isPartOf: { "@id": websiteId }, publisher: { "@id": organizationId }, mainEntity: { "@id": canonical + "#termos" } },
    { "@context": "https://schema.org", "@type": "DefinedTermSet", "@id": canonical + "#termos", name: title, url: canonical, hasDefinedTerm: glossary.map(term => ({ ...conceptEntity(term), url: resolveCanonical(termPath(term)), description: term.definition, inDefinedTermSet: { "@id": canonical + "#termos" } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: resolveCanonical("/") },
      { "@type": "ListItem", position: 2, name: "Insights", item: resolveCanonical("/insights") },
      { "@type": "ListItem", position: 3, name: "Glossário", item: canonical },
    ] },
  ] };
}

export function getNotFoundSeo() {
  return { ...defaultSeo, title: "Página não encontrada | IM Estratégia e Gestão", description: "O conteúdo solicitado não está disponível.", canonical: resolveCanonical("/insights"), robots: "noindex,follow", type: "website", jsonLd: [] };
}
