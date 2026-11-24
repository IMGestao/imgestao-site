import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { publicacoes } from "../src/features/insights/data/publicacoes.js";
import { SITE_URL } from "../src/shared/seo/siteConfig.js";
const read = file => fs.readFileSync(path.join("dist", file), "utf8");
const sitemap = read("sitemap.xml");
const legacyHost = /https?:\/\/www\.imgestao\.com\.br(?:[/:?#]|$)/i;
assert.equal(SITE_URL, "https://imgestao.com.br", "Domínio oficial sem www");
assert(!legacyHost.test(sitemap), "Sitemap sem domínio antigo");
assert(!legacyHost.test(read("robots.txt")), "Robots sem domínio antigo");
const routes = ["/", "/insights", ...publicacoes.map(a => "/insights/" + a.slug)];
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
  if (article) {
    assert(html.includes("Em resumo"), route + ": resumo");
    assert(html.includes("Referências e leitura complementar"), route + ": referências");
    assert(html.includes("rd-reading-body"), route + ": conteúdo");
    const published = !article.edicaoRetroativa || article.dataPublicacao;
    if (published) assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    else assert(!sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    if (article.cover) assert(fs.existsSync(path.join("dist", article.cover.replace(/^\//, ""))), route + ": imagem");
  } else assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
}
const hub = read("insights.html");
for (const article of publicacoes.slice(0, 18)) assert(hub.includes('href="/insights/' + article.slug + '"'), article.slug + ": link rastreável");
assert.match(read("404.html"), /name="robots" content="noindex,follow"/);
assert(!legacyHost.test(read("404.html")), "404 sem domínio antigo");
assert(!read("_redirects").includes("/* /index.html 200"));
assert(read("robots.txt").includes("Sitemap: " + SITE_URL + "/sitemap.xml"));
console.log("SEO: " + routes.length + " rotas estáticas, metadados, links, sitemap, imagens e página 404 validados.");
