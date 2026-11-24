import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { publicacoes } from "./features/insights/data/publicacoes.js";
import { normalizeArticle } from "./features/insights/utils/articles.js";
import { getHomeSeo, getInsightsSeo, getArticleSeo, getNotFoundSeo } from "./shared/seo/seoConfig.js";
export const routes = ["/", "/insights", ...publicacoes.map(a => "/insights/" + a.slug)];
export function renderPage(url) {
  const article = publicacoes.find(a => url === "/insights/" + a.slug);
  const meta = url === "/" ? getHomeSeo() : url === "/insights" ? getInsightsSeo() : article ? getArticleSeo(normalizeArticle(article)) : getNotFoundSeo();
  const html = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  return { html, meta };
}
