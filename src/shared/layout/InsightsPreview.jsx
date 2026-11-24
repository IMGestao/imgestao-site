import { Link } from "react-router-dom";
import InsightCard from "../../features/insights/components/InsightCard";

export default function InsightsPreview({ articles = [] }) {
  return (
    <section id="insights" className="rd-section rd-insights">
      <div className="rd-shell">
        <div className="rd-section-heading"><div><p className="rd-kicker">Insights</p><h2>Perspectivas para quem decide.</h2></div><Link className="rd-text-link" to="/insights">Ver todos os insights</Link></div>
        <div className="rd-featured-grid">
          {articles.map((article,index) => <InsightCard key={article.slug} article={article} featured={index === 0} />)}
        </div>
      </div>
    </section>
  );
}
