import { Link } from "react-router-dom";
import InsightCard from "../../features/insights/components/InsightCard";

export default function InsightsPreview({ articles = [] }) {
  return (
    <section id="insights" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Insights</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Análises e reflexões sobre estratégia, gestão e transformação
          </h2>
        </div>

        <div className="max-w-sm text-sm leading-7 text-slate-600">
          Conteúdo recente da IM Estratégia e Gestão, ordenado por data de publicação.
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {articles.map((article, index) => (
          <div
            key={article.slug}
            className={index === 0 ? "relative h-full rounded-2xl ring-2 ring-slate-900/10" : "h-full"}
          >
            {index === 0 && (
              <span className="absolute top-4 left-4 z-10 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
                Mais recente
              </span>
            )}
            <InsightCard article={article} />
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/insights"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800"
        >
          Ver todos os insights
          <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
