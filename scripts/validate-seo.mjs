import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { publicacoes } from "../src/features/insights/data/publicacoes.js";
import { SITE_URL } from "../src/shared/seo/siteConfig.js";
import { themes, themePath, getArticleTheme, getThemeArticles, getTheme, isPublished } from "../src/features/insights/data/themes.js";
import { getRelatedArticles, getSortedArticles } from "../src/features/insights/utils/articles.js";
const read = file => fs.readFileSync(path.join("dist", file), "utf8");
const sitemap = read("sitemap.xml");
const legacyHost = /https?:\/\/www\.imgestao\.com\.br(?:[/:?#]|$)/i;
assert.equal(SITE_URL, "https://imgestao.com.br", "Domínio oficial sem www");
assert(!legacyHost.test(sitemap), "Sitemap sem domínio antigo");
assert(!legacyHost.test(read("robots.txt")), "Robots sem domínio antigo");
const routes = ["/", "/insights", ...themes.map(themePath), ...publicacoes.map(a => "/insights/" + a.slug)];
assert.equal(new Set(themes.map(t => t.slug)).size, themes.length, "Temas exclusivos");
const assignments = themes.flatMap(t => t.articles);
assert.equal(new Set(assignments).size, assignments.length, "Classificação primária sem duplicidade");
assert(assignments.every(slug => publicacoes.some(a => a.slug === slug)), "Slugs de artigos conhecidos");
assert(publicacoes.every(a => getArticleTheme(a)), "Todos os artigos classificados");
assert(themes.every(t => t.related.every(slug => slug !== t.slug && getTheme(slug))), "Temas relacionados válidos");
const titles = new Set();
for (const route of routes) {
  const html = read(route === "/" ? "index.html" : route.slice(1) + ".html");
  assert(!legacyHost.test(html), route + ": sem domínio antigo no HTML");
  assert.match(html, /<div id="root" data-prerendered="true">[\s\S]+<main/);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route + ": H1");
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), route + ": title exclusivo");
  titles.add(title);
  assert(html.includes('rel="canonical" href="' + SITE_URL + route + '"'), route + ": canonical");
  assert(html.includes('property="og:url" content="' + SITE_URL + route + '"'), route + ": Open Graph");
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  const scripts = [...html.matchAll(/<script type="application\/ld\+json" data-seo-jsonld="true">([\s\S]*?)<\/script>/g)];
  assert(scripts.length, route + ": JSON-LD");
  for (const [, json] of scripts) {
    JSON.parse(json);
    assert(!legacyHost.test(json), route + ": JSON-LD sem domínio antigo");
  }
  const article = publicacoes.find(a => route === "/insights/" + a.slug);
  const theme = themes.find(t => themePath(t) === route);
  if (article) {
    assert(html.includes('href="' + themePath(getArticleTheme(article)) + '"'), route + ": link para tema");
    assert(getRelatedArticles(getSortedArticles(publicacoes), article).every(a => a.slug !== article.slug && isPublished(a)), route + ": relacionados válidos");
    assert(html.includes("Em resumo"), route + ": resumo");
    assert(html.includes("Referências e leitura complementar"), route + ": referências");
    assert(html.includes("rd-reading-body"), route + ": conteúdo");
    const published = !article.edicaoRetroativa || article.dataPublicacao;
    if (published) assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    else assert(!sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    if (article.cover) assert(fs.existsSync(path.join("dist", article.cover.replace(/^\//, ""))), route + ": imagem");
  } else {
    assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    if (theme) {
      assert(html.includes('"@type":"CollectionPage"'), route + ": CollectionPage");
      for (const a of getThemeArticles(theme, publicacoes)) assert(html.includes('href="/insights/' + a.slug + '"'), route + ": artigo vinculado");
      for (const slug of theme.related) assert(html.includes('href="/temas/' + slug + '"'), route + ": tema relacionado");
      assert(html.includes('href="/#solucao-' + (theme.serviceIndex + 1) + '"'), route + ": serviço vinculado");
    }
  }
}
const hub = read("insights.html");
for (const theme of themes) assert(hub.includes('href="' + themePath(theme) + '"'), theme.slug + ": tema rastreável");
assert.equal((sitemap.match(/<loc>/g) || []).length, 2 + themes.length + publicacoes.filter(isPublished).length);
for (const article of publicacoes.slice(0, 18)) assert(hub.includes('href="/insights/' + article.slug + '"'), article.slug + ": link rastreável");
assert.match(read("404.html"), /name="robots" content="noindex,follow"/);
assert(!legacyHost.test(read("404.html")), "404 sem domínio antigo");
assert(!read("_redirects").includes("/* /index.html 200"));
assert(read("robots.txt").includes("Sitemap: " + SITE_URL + "/sitemap.xml"));
console.log("SEO: " + routes.length + " rotas estáticas, metadados, links, sitemap, imagens e página 404 validados.");
