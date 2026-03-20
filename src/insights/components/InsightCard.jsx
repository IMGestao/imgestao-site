import { Link } from "react-router-dom";

function InsightCard({ article }) {
  if (!article) return null;

  return (
    <Link
      to={`/insights/${article.slug}`}
      className="block h-full no-underline"
    >
      <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
        <div>
          {article.data && (
            <p className="text-sm text-gray-400 mb-2">
              {new Date(article.data).toLocaleDateString("pt-BR")}
            </p>
          )}

          {article.categoria && (
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-3">
              {article.categoria}
            </p>
          )}

          <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
            {article.titulo}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed">
            {article.descricao}
          </p>
        </div>

        <div className="mt-6 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
          Ler mais
          <span className="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default InsightCard;