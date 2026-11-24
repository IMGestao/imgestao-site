const editorialPhotos = {
  "transformacao-digital-origem-e-significado": "/insights/fotos/transformacao-digital-origem-e-significado.svg",
  "modelo-de-gestao-empresarial": "/insights/fotos/modelo-de-gestao-empresarial.svg",
  "indicadores-de-desempenho-kpis": "/insights/fotos/indicadores-de-desempenho-kpis.svg",
  "transformacao-organizacional-como-fazer": "/insights/fotos/transformacao-organizacional-como-fazer.svg",
  "governanca-corporativa-na-pratica": "/insights/fotos/governanca-corporativa-na-pratica.svg",
  "planejamento-estrategico-empresas": "/insights/fotos/planejamento-estrategico-empresas.svg"
};

export default function EditorialVisual({ article }) {
  const src = article.cover || editorialPhotos[article.slug] || editorialPhotos["modelo-de-gestao-empresarial"];
  return <img src={src} alt="" loading="lazy" decoding="async" />;
}
