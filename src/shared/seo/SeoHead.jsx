import { useEffect } from "react";
import { defaultSeo, resolveCanonical } from "./seoConfig";

function upsertMeta(selector, attrs, content) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content || "");
}

function upsertLink(selector, attrs, href) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("href", href || "");
}

function cleanupJsonLd() {
  document
    .querySelectorAll('script[data-seo-jsonld="true"]')
    .forEach((node) => node.remove());
}

export default function SeoHead({ config = {} }) {
  useEffect(() => {
    const meta = {
      ...defaultSeo,
      ...config,
    };

    const canonical = meta.canonical || resolveCanonical("/");
    const ogImage = resolveCanonical(meta.image || defaultSeo.image);

    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: "description" }, meta.description);
    upsertLink('link[rel="canonical"]', { rel: "canonical" }, canonical);

    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, defaultSeo.siteName);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, meta.title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, meta.description);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, meta.type || "website");
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, ogImage);

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, meta.title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, meta.description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, ogImage);

    if (meta.type === "article") {
      upsertMeta(
        'meta[property="article:published_time"]',
        { property: "article:published_time" },
        meta.publishedTime || ""
      );
      upsertMeta(
        'meta[property="article:modified_time"]',
        { property: "article:modified_time" },
        meta.modifiedTime || ""
      );
    }

    cleanupJsonLd();

    (meta.jsonLd || []).forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });

    return cleanupJsonLd;
  }, [config]);

  return null;
}
