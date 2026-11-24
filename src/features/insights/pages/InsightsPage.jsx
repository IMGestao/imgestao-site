import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InsightCard from "../components/InsightCard";
import ThemeDirectory from "../components/ThemeDirectory";
import { publicacoes } from "../data/publicacoes";
import {
  filterArticles,
  getCategories,
  getSortedArticles,
} from "../utils/articles";
import SiteHeader from "../../../shared/layout/SiteHeader";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SearchInput from "../../../shared/ui/SearchInput";
import CategoryPills from "../../../shared/ui/CategoryPills";
import SeoHead from "../../../shared/seo/SeoHead";
import { getInsightsSeo } from "../../../shared/seo/seoConfig";

const PAGE_SIZE = 18;

export default function InsightsPage() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const navItems = [
    { label: "Sobre", href: "/#sobre" },
    { label: "Atuação", href: "/#atuacao" },
    { label: "Metodologia", href: "/#metodologia" },
    { label: "Insights", href: "/insights", isRoute: true },
  ];

  const artigosOrdenados = useMemo(() => getSortedArticles(publicacoes), []);

  const categories = useMemo(() => getCategories(artigosOrdenados), [artigosOrdenados]);

  const filtered = useMemo(
    () => filterArticles(artigosOrdenados, { term, category }),
    [artigosOrdenados, term, category]
  );

  const visibleArticles = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const handleCategorySelect = (nextCategory) => {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
  };

  const handleTermChange = (nextTerm) => {
    setTerm(nextTerm);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="rd-page">
      <SeoHead config={getInsightsSeo()} />
      <SiteHeader navItems={navItems} />

      <main>
        <section className="rd-hub-banner">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
            <div className="mb-3">
              <nav className="text-sm text-slate-400">
                <Link to="/" className="transition hover:text-slate-900">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-200">Insights</span>
              </nav>
            </div>

            <div className="max-w-4xl">
              <div className="rd-kicker">Insights</div>

              <h1 className="rd-hub-title">
                Análises e reflexões sobre estratégia, gestão e transformação
              </h1>

              <p className="mt-3 max-w-3xl text-lg leading-7 text-slate-200">
                Conteúdos desenvolvidos para lideranças e organizações que precisam estruturar melhor sua direção, fortalecer sua gestão e ampliar sua capacidade de execução.
              </p>
            </div>
          </div>
        </section>

        <section id="temas" className="mx-auto max-w-7xl scroll-mt-28 px-6 pt-14 lg:px-8" aria-labelledby="knowledge-themes">
          <div className="rd-section-heading"><div><p className="rd-kicker">Biblioteca de conhecimento</p><h2 id="knowledge-themes">Explore por área de conhecimento</h2></div><p>Encontre conceitos, aplicações práticas e artigos relacionados a cinco grandes temas de gestão empresarial.</p></div>
          <div className="mt-8"><ThemeDirectory /></div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20" aria-labelledby="all-insights">
          <h2 id="all-insights" className="mb-6 text-2xl font-semibold text-[#0b2038]">Todos os Insights</h2>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <SearchInput
                value={term}
                onChange={handleTermChange}
                placeholder="Buscar por termo, título, categoria ou palavra-chave"
              />
              <div className="text-sm text-slate-500">{filtered.length} resultado(s)</div>
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <CategoryPills
                categories={categories}
                activeCategory={category}
                onSelect={handleCategorySelect}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>

          {visibleArticles.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Nenhum artigo encontrado com os filtros selecionados.
            </div>
          )}

          {hasMore && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((value) => value + PAGE_SIZE)}
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Carregar mais
              </button>
            </div>
          )}
        </section>
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8" aria-labelledby="insights-glossary">
          <div className="border border-slate-200 bg-slate-50 p-6"><h2 id="insights-glossary" className="text-xl font-semibold text-[#0b2038]">Glossário de gestão empresarial</h2><p className="mt-2 text-base leading-7 text-slate-600">Consulte os conceitos fundamentais que conectam nossos temas e artigos.</p><Link to="/glossario" className="rd-text-link mt-3 inline-block">Explorar glossário</Link></div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
