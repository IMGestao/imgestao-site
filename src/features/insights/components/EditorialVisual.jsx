import { getArticleCover } from "../utils/articleCover";
export default function EditorialVisual({ article, priority = false }) {
  const src = getArticleCover(article) || "/insights/fotos/modelo-de-gestao-empresarial.svg";
  return <img src={src} alt={priority ? (article.coverAlt || "") : ""} style={article.coverPosition ? { objectPosition: article.coverPosition } : undefined} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />;
}
