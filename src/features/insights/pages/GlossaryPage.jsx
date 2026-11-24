import { Link } from "react-router-dom";
import SiteHeader from "../../../shared/layout/SiteHeader";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SeoHead from "../../../shared/seo/SeoHead";
import { getGlossarySeo } from "../../../shared/seo/seoConfig.js";
import { themes, themePath } from "../data/themes.js";
import { getTermsByTheme } from "../data/knowledge.js";
import { publicacoes } from "../data/publicacoes.js";

export default function GlossaryPage() {
  return <div className="rd-page"><SeoHead config={getGlossarySeo()} /><SiteHeader />
    <main>
      <section className="rd-hub-banner"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        <nav aria-label="Caminho de navegação" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-300"><Link to="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span><Link to="/insights" className="hover:text-white">Insights</Link><span aria-hidden="true">/</span><span aria-current="page">Glossário</span></nav>
        <p className="rd-kicker">Biblioteca de conhecimento</p><h1 className="rd-hub-title">Glossário de gestão empresarial</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">Definições concisas dos conceitos de estratégia, governança, processos, transformação digital e desenvolvimento organizacional, conectadas aos Insights da IM.</p>
      </div></section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:px-8">
        <aside className="self-start border-t-4 border-[#174b78] bg-slate-50 p-6"><h2 className="text-xl font-semibold text-[#0b2038]">Explore por tema</h2><nav aria-label="Temas do glossário" className="mt-4 space-y-3">{themes.map(theme => <a key={theme.slug} href={`#tema-${theme.slug}`} className="block border-b border-slate-200 pb-3 font-medium text-[#174b78] hover:underline">{theme.title}</a>)}</nav></aside>
        <div className="space-y-12">{themes.map(theme => <section key={theme.slug} id={`tema-${theme.slug}`} className="scroll-mt-28"><div className="border-b border-slate-200 pb-4"><h2 className="text-2xl font-semibold text-[#0b2038]">{theme.title}</h2><Link to={themePath(theme)} className="rd-text-link mt-3 inline-block">Explorar área de conhecimento</Link></div><dl className="mt-4 space-y-4">{getTermsByTheme(theme.slug).map(term => <div id={term.slug} key={term.slug} className="scroll-mt-28 border-b border-slate-200 py-5"><dt className="text-xl font-semibold text-[#0b2038]">{term.name}</dt><dd className="mt-3 text-base leading-8 text-slate-700">{term.definition}<p className="mt-3 text-sm font-semibold text-slate-600">Leitura complementar</p><ul className="mt-2 space-y-2">{term.articles.map(slug => {const article = publicacoes.find(a => a.slug === slug);return <li key={slug}><Link className="text-sm font-medium text-[#174b78] underline underline-offset-4" to={`/insights/${slug}`}>{article.titulo}</Link></li>;})}</ul></dd></div>)}</dl></section>)}</div>
      </div>
    </main><SiteFooter /></div>;
}
