import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { publicacoes } from "../src/features/insights/data/publicacoes.js";
import { SITE_URL } from "../src/shared/seo/siteConfig.js";
import { themes, themePath, getArticleTheme, getThemeArticles, getTheme, isPublished } from "../src/features/insights/data/themes.js";
import { getRelatedArticles, getSortedArticles } from "../src/features/insights/utils/articles.js";
import { institutionalPages, CONTACT_EMAIL } from "../src/shared/institutional/institutionalConfig.js";
import { glossary, glossaryPath, termPath, articleAnswers, themeAnswers, getTermsByTheme, getTermsByArticle } from "../src/features/insights/data/knowledge.js";
const read = file => fs.readFileSync(path.join("dist", file), "utf8");
const sitemap = read("sitemap.xml");
const removedPages = ["/politica-editorial", "/politica-de-correcoes"];
for (const route of removedPages) {
  assert(!sitemap.includes(SITE_URL + route), route + ": removida do sitemap");
  assert(!fs.existsSync(path.join("dist", route.slice(1) + ".html")), route + ": HTML removido");
}
const legacyHost = /https?:\/\/www\.imgestao\.com\.br(?:[/:?#]|$)/i;
assert.equal(SITE_URL, "https://imgestao.com.br", "Domínio oficial sem www");
assert(!legacyHost.test(sitemap), "Sitemap sem domínio antigo");
assert(!legacyHost.test(read("robots.txt")), "Robots sem domínio antigo");
const routes = ["/", "/insights", glossaryPath, ...institutionalPages.map(p => p.path), ...themes.map(themePath), ...publicacoes.map(a => "/insights/" + a.slug)];
assert.equal(new Set(glossary.map(t => t.slug)).size, glossary.length, "Termos únicos");
assert(glossary.every(t => getTheme(t.theme) && t.articles.length && t.articles.every(slug => publicacoes.some(a => a.slug === slug && isPublished(a)))), "Conexões de glossário válidas");
assert(publicacoes.every(a => articleAnswers[a.slug]?.length >= 2 && getTermsByArticle(a.slug).length), "Artigos com respostas e conceitos");
assert(themes.every(t => themeAnswers[t.slug]?.length >= 2 && getTermsByTheme(t.slug).length), "Temas com respostas e conceitos");
assert.equal(new Set(themes.map(t => t.slug)).size, themes.length, "Temas exclusivos");
const assignments = themes.flatMap(t => t.articles);
assert.equal(new Set(assignments).size, assignments.length, "Classificação primária sem duplicidade");
assert(assignments.every(slug => publicacoes.some(a => a.slug === slug)), "Slugs de artigos conhecidos");
assert(publicacoes.every(a => getArticleTheme(a)), "Todos os artigos classificados");
assert(themes.every(t => t.related.every(slug => slug !== t.slug && getTheme(slug))), "Temas relacionados válidos");
const titles = new Set();
for (const route of routes) {
  const html = read(route === "/" ? "index.html" : route.slice(1) + ".html");
  assert(html.includes('class="rd-brand-positioning">Consultoria em transformação,<br/>estratégia e governança'), route + ": posicionamento institucional padronizado");
  for (const removed of removedPages) assert(!html.includes(removed), route + ": sem referência a " + removed);
  assert(!html.includes("Sugerir uma correção"), route + ": sem canal editorial de correções");
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
  const structured = scripts.map(([, json]) => JSON.parse(json));
  for (const [, json] of scripts) {
    JSON.parse(json);
    assert(!legacyHost.test(json), route + ": JSON-LD sem domínio antigo");
  }
  const article = publicacoes.find(a => route === "/insights/" + a.slug);
  const institutional = institutionalPages.find(p => route === p.path);
  const footer = html.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || "";
  assert(!footer.includes('href="/glossario"'), route + ": glossário fora do rodapé global");
  for (const p of institutionalPages) assert(html.includes('href="' + p.path + '"'), route + ": página institucional rastreável");
  if (institutional) assert(structured.some(s => s["@type"] === institutional.type && s.url === SITE_URL + route), route + ": dados estruturados institucionais");
  const theme = themes.find(t => themePath(t) === route);
  if (article) {
    const schema = structured.find(s => s["@type"] === "Article");
    assert.equal(schema.author.url, SITE_URL + "/sobre-a-im", route + ": autoria navegável");
    assert.equal(schema.author.name, article.autor, route + ": autoria preservada");
    assert.equal(schema.citation?.length, article.referencias?.length, route + ": referências estruturadas");
    assert.equal(schema.mentions.length, getTermsByArticle(article.slug).length, route + ": conceitos estruturados");
    assert(html.includes('id="knowledge-answers"'), route + ": perguntas e respostas visíveis");
    for (const term of getTermsByArticle(article.slug)) assert(html.includes('href="' + termPath(term) + '"'), route + ": conceito vinculado");
    assert(html.includes('href="' + themePath(getArticleTheme(article)) + '"'), route + ": link para tema");
    assert(getRelatedArticles(getSortedArticles(publicacoes), article).every(a => a.slug !== article.slug && isPublished(a)), route + ": relacionados válidos");
    assert(html.includes("Em resumo"), route + ": resumo");
    assert(html.includes("Referências e leitura complementar"), route + ": referências");
    assert(html.includes("rd-reading-body"), route + ": conteúdo");
    assert.match(html, /<details class="rd-reading-index" open=""><summary class="rd-reading-index-toggle"/, route + ": índice recolhível aberto por padrão");
    assert(html.includes('aria-label="Neste artigo"'), route + ": índice acessível");
    const published = !article.edicaoRetroativa || article.dataPublicacao;
    if (published) assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    else assert(!sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    if (article.cover) assert(fs.existsSync(path.join("dist", article.cover.replace(/^\//, ""))), route + ": imagem");
  } else {
    assert(sitemap.includes("<loc>" + SITE_URL + route + "</loc>"));
    if (theme) {
      assert(html.includes('id="knowledge-answers"'), route + ": perguntas e respostas visíveis");
      for (const term of getTermsByTheme(theme.slug)) assert(html.includes('href="' + termPath(term) + '"'), route + ": conceito vinculado");
      assert(html.includes('"@type":"CollectionPage"'), route + ": CollectionPage");
      for (const a of getThemeArticles(theme, publicacoes)) assert(html.includes('href="/insights/' + a.slug + '"'), route + ": artigo vinculado");
      for (const slug of theme.related) assert(html.includes('href="/temas/' + slug + '"'), route + ": tema relacionado");
      assert(html.includes('href="/#solucao-' + (theme.serviceIndex + 1) + '"'), route + ": serviço vinculado");
    }
    if (route === glossaryPath) {
      const set = structured.find(s => s["@type"] === "DefinedTermSet");
      assert.equal(set.hasDefinedTerm.length, glossary.length);
      for (const term of glossary) {
        assert(html.includes('id="' + term.slug + '"'), term.slug + ": definição visível");
        assert(set.hasDefinedTerm.some(t => t["@id"] === SITE_URL + termPath(term) && t.description === term.definition));
        for (const slug of term.articles) assert(html.includes('href="/insights/' + slug + '"'), term.slug + ": leitura correspondente");
      }
    }
  }
}
const hub = read("insights.html");
const home = read("index.html");
assert(home.includes('class="rd-header rd-header-home"'), "Home: cabeçalho institucional exclusivo");
assert(home.includes('Estratégia que orienta.') && home.includes('Gestão que transforma.'), "Home: proposta de valor preservada");
assert(home.includes('src="/im-hero-conceito.webp"') && fs.existsSync(path.join("dist", "im-hero-conceito.webp")), "Home: arte conceitual disponível");
assert(home.includes('srcSet="/im-hero-conceito-836.webp 836w, /im-hero-conceito.webp 1672w"') && fs.existsSync(path.join("dist", "im-hero-conceito-836.webp")), "Home: versões responsivas da arte disponíveis");
assert(home.includes('class="rd-hero-art"') && !home.includes('src="/im-hero-panoramico.webp"'), "Home: arte conceitual substitui a fotografia");
assert(home.includes('href="#atuacao"') && home.includes('href="#insights"'), "Home: chamadas para ação preservadas");
assert(!hub.includes('rd-header-home'), "Demais páginas: cabeçalho preservado");
assert(hub.includes('href="/glossario"') && hub.indexOf('id="insights-glossary"') > hub.indexOf('id="all-insights"'), "Glossário rastreável ao final dos Insights");
for (const theme of themes) assert(hub.includes('href="' + themePath(theme) + '"'), theme.slug + ": tema rastreável");
assert.equal((sitemap.match(/<loc>/g) || []).length, 3 + institutionalPages.length + themes.length + publicacoes.filter(isPublished).length);
assert(read("sobre-a-im.html").includes(`mailto:${CONTACT_EMAIL}`));
for (const article of publicacoes.slice(0, 18)) assert(hub.includes('href="/insights/' + article.slug + '"'), article.slug + ": link rastreável");
assert.match(read("404.html"), /name="robots" content="noindex,follow"/);
assert(!legacyHost.test(read("404.html")), "404 sem domínio antigo");
assert(!read("_redirects").includes("/* /index.html 200"));
assert(read("robots.txt").includes("Sitemap: " + SITE_URL + "/sitemap.xml"));
console.log("SEO: " + routes.length + " rotas estáticas, metadados, links, sitemap, imagens e página 404 validados.");
