import { Link, useParams } from "react-router-dom";
import { getTheme, getThemeArticles } from "../data/themes.js";
import { publicacoes } from "../data/publicacoes.js";
import { getSortedArticles } from "../utils/articles.js";
import InsightCard from "../components/InsightCard";
import ThemeDirectory from "../components/ThemeDirectory";
import SiteHeader from "../../../shared/layout/SiteHeader";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SeoHead from "../../../shared/seo/SeoHead";
import { getThemeSeo } from "../../../shared/seo/seoConfig.js";
import ArticlePage from "./ArticlePage";

export default function ThemePage() {
  const { themeSlug } = useParams();
  const theme = getTheme(themeSlug);
  if (!theme) return <ArticlePage />;
  const articles = getSortedArticles(getThemeArticles(theme, publicacoes));
  return (
    <div className="rd-page">
      <SeoHead config={getThemeSeo(theme)} />
      <SiteHeader />
      <main>
        <section className="rd-hub-banner">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <nav aria-label="Caminho de navegação" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-300">
              <Link to="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span>
              <Link to="/insights" className="hover:text-white">Insights</Link><span aria-hidden="true">/</span>
              <span aria-current="page">{theme.title}</span>
            </nav>
            <p className="rd-kicker">Área de conhecimento</p>
            <h1 className="rd-hub-title max-w-5xl">{theme.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">{theme.description}</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-[#0b2038]">O que é {theme.title.toLocaleLowerCase("pt-BR")}?</h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">{theme.definition}</p>
            {theme.sections.map(section => <section key={section.title} className="mt-9"><h3 className="text-xl font-semibold text-[#0b2038]">{section.title}</h3><p className="mt-3 text-base leading-8 text-slate-700">{section.text}</p></section>)}
          </div>
          <aside className="self-start border-t-4 border-[#174b78] bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-[#0b2038]">Conceitos centrais</h2>
            <ul className="mt-4 space-y-3 text-base text-slate-700">{theme.concepts.map(concept => <li key={concept} className="border-b border-slate-200 pb-3">{concept}</li>)}</ul>
            <h2 className="mt-8 text-xl font-semibold text-[#0b2038]">Como a IM atua</h2>
            <p className="mt-3 text-base leading-7 text-slate-700">{theme.service}</p>
            <a className="rd-text-link mt-4 inline-block" href={`/#solucao-${theme.serviceIndex + 1}`}>Conheça a solução</a>
          </aside>
        </section>
        <section className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-14 lg:px-8" aria-labelledby="theme-articles">
          <div className="rd-section-heading"><div><p className="rd-kicker">Acervo editorial</p><h2 id="theme-articles">Aprofunde seu conhecimento</h2></div><p>Artigos especializados da IM para aplicar os conceitos à realidade empresarial.</p></div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{articles.map(article => <InsightCard key={article.slug} article={article} />)}</div>
        </section>
        <section className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-14 lg:px-8" aria-labelledby="related-themes">
          <h2 id="related-themes" className="mb-6 text-2xl font-semibold text-[#0b2038]">Explore também</h2>
          <ThemeDirectory items={theme.related.map(getTheme)} />
          <Link className="rd-text-link mt-8 inline-block" to="/insights">Ver todos os Insights</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
