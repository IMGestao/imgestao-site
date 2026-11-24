import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";
import { publicacoes } from "./features/insights/data/publicacoes.js";
import { themes, themePath } from "./features/insights/data/themes.js";
import { institutionalPages, getInstitutionalPage } from "./shared/institutional/institutionalConfig.js";
import { normalizeArticle } from "./features/insights/utils/articles.js";
import { getHomeSeo, getInsightsSeo, getArticleSeo, getThemeSeo, getInstitutionalSeo, getNotFoundSeo } from "./shared/seo/seoConfig.js";
export const routes = ["/", "/insights", ...institutionalPages.map(p => p.path), ...themes.map(themePath), ...publicacoes.map(a => "/insights/" + a.slug)];
export function renderPage(url) {
  const article = publicacoes.find(a => url === "/insights/" + a.slug);
  const theme = themes.find(t => themePath(t) === url);
  const institutional = getInstitutionalPage(url);
  const meta = url === "/" ? getHomeSeo() : url === "/insights" ? getInsightsSeo() : institutional ? getInstitutionalSeo(institutional) : theme ? getThemeSeo(theme) : article ? getArticleSeo(normalizeArticle(article)) : getNotFoundSeo();
  const html = renderToString(<StaticRouter location={url}><App /></StaticRouter>);
  return { html, meta };
}
