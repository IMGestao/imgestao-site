import { Link } from "react-router-dom";
import { formatDate } from "../utils/articles";

function InsightCard({ article }) {
  if (!article) return null;

  return (
    <Link to={`/insights/${article.slug}`} className="block h-full no-underline">
      <div className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div>
          {article.data && (
            <p className="mb-2 text-sm text-gray-400">{formatDate(article.data)}</p>
          )}

          {article.categoria && (
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              {article.categoria}
            </p>
          )}

          <h2 className="mb-3 text-xl leading-snug font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {article.titulo}
          </h2>

          <p className="text-sm leading-relaxed text-gray-600">
            {article.excerpt || article.descricao}
          </p>
        </div>

        <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-800">
          Ler mais
          <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}

export default InsightCard;
