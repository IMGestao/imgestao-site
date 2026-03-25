import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import InsightCard from "../components/InsightCard";
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

const PAGE_SIZE = 6;

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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900 antialiased">
      <SeoHead config={getInsightsSeo()} />
      <SiteHeader navItems={navItems} />

      <main>
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_30%),radial-gradient(circle_at_right,_rgba(37,99,235,0.07),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="mb-6">
              <nav className="text-sm text-slate-500">
                <Link to="/" className="transition hover:text-slate-900">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-700">Insights</span>
              </nav>
            </div>

            <div className="max-w-4xl">
              <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Insights</div>

              <h1 className="mt-5 max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                Análises e reflexões sobre estratégia, gestão e transformação
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Conteúdos desenvolvidos para lideranças e organizações que precisam estruturar melhor sua direção, fortalecer sua gestão e ampliar sua capacidade de execução.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
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
      </main>

      <SiteFooter />
    </div>
  );
}
