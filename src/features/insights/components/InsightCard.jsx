import { Link } from "react-router-dom";
import { formatDate } from "../utils/articles";
import EditorialVisual from "./EditorialVisual";

export default function InsightCard({ article, featured = false }) {
  if (!article) return null;
  return (
    <Link to={`/insights/${article.slug}`} className={`rd-card ${featured ? "rd-card-featured" : ""}`}>
      <div className="rd-card-media"><EditorialVisual article={article} />{featured && <span className="rd-featured-label">{article.edicaoRetroativa ? "Edição mais recente" : "Mais recente"}</span>}</div>
      <div className="rd-card-content">
        <p className="rd-card-meta">{article.categoria} <span>·</span> {article.edicaoRetroativa ? "Edição de " : ""}{formatDate(article.data)}</p>
        <h3>{article.titulo}</h3>
        <p className="rd-card-desc">{article.excerpt || article.descricao}</p>
        <span className="rd-text-link">Ler artigo</span>
      </div>
    </Link>
  );
}
