const FALLBACK_EXCERPT_SIZE = 160;

function normalizeString(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function normalizeDateInput(value = "") {
  const raw = String(value || "").trim();
  const match = raw.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : raw;
}

export function parseDate(value = "") {
  const normalized = normalizeDateInput(value);
  const isoDateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
  let date;

  if (isoDateOnly.test(normalized)) {
    const [, year, month, day] = normalized.match(isoDateOnly);
    date = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    date = new Date(normalized);
  }

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(value = "") {
  const parsed = parseDate(value);
  if (!parsed) return String(value || "");
  return parsed.toLocaleDateString("pt-BR");
}

export function buildExcerpt(article, maxLength = FALLBACK_EXCERPT_SIZE) {
  const explicit = article?.excerpt || article?.descricao;
  if (explicit) return explicit;

  const fromContent = String(article?.conteudo || "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!fromContent) return "";
  if (fromContent.length <= maxLength) return fromContent;
  return `${fromContent.slice(0, maxLength).trimEnd()}...`;
}

export function normalizeArticle(rawArticle) {
  const data = normalizeDateInput(rawArticle?.data || "");
  const updatedAt = normalizeDateInput(rawArticle?.updatedAt || "");

  return {
    ...rawArticle,
    data,
    updatedAt,
    excerpt: buildExcerpt(rawArticle),
    cover: rawArticle?.cover || null,
    palavrasChave: Array.isArray(rawArticle?.palavrasChave)
      ? rawArticle.palavrasChave
      : [],
  };
}

export function getSortedArticles(articles = []) {
  return articles
    .map(normalizeArticle)
    .sort((a, b) => {
      const bDate = parseDate(b.updatedAt || b.data)?.getTime() || 0;
      const aDate = parseDate(a.updatedAt || a.data)?.getTime() || 0;
      return bDate - aDate;
    });
}

export function getHomeHighlights(articles = [], count = 3) {
  const sorted = getSortedArticles(articles);
  const highlighted = sorted.filter((item) => item.destaqueHome === true);
  const used = new Set(highlighted.map((item) => item.slug));

  const fallback = sorted.filter((item) => !used.has(item.slug));
  return [...highlighted, ...fallback].slice(0, count);
}

export function getCategories(articles = []) {
  return [
    ...new Set(
      articles
        .map((article) => article?.categoria)
        .filter(Boolean)
        .map((categoria) => String(categoria).trim())
    ),
  ].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function filterArticles(articles = [], filters = {}) {
  const normalizedTerm = normalizeString(filters.term || "").trim();
  const selectedCategory = String(filters.category || "").trim();

  return articles.filter((article) => {
    const categoryMatch =
      !selectedCategory || article?.categoria === selectedCategory;

    if (!categoryMatch) return false;
    if (!normalizedTerm) return true;

    const searchableText = [
      article?.titulo,
      article?.descricao,
      article?.excerpt,
      article?.categoria,
      ...(article?.palavrasChave || []),
    ]
      .filter(Boolean)
      .map((piece) => normalizeString(piece))
      .join(" ");

    return searchableText.includes(normalizedTerm);
  });
}

export function getRelatedArticles(articles = [], currentArticle, limit = 3) {
  if (!currentArticle) return [];

  const currentKeywords = new Set(
    (currentArticle.palavrasChave || []).map((item) => normalizeString(item))
  );

  const candidates = getSortedArticles(articles)
    .filter((article) => article.slug !== currentArticle.slug)
    .map((article) => {
      const sameCategory = article.categoria === currentArticle.categoria;
      const keywordScore = (article.palavrasChave || []).reduce(
        (acc, keyword) =>
          currentKeywords.has(normalizeString(keyword)) ? acc + 1 : acc,
        0
      );

      return {
        article,
        sameCategory,
        keywordScore,
      };
    })
    .sort((a, b) => {
      if (a.sameCategory !== b.sameCategory) return a.sameCategory ? -1 : 1;
      if (a.keywordScore !== b.keywordScore) return b.keywordScore - a.keywordScore;

      const bTime = parseDate(b.article.updatedAt || b.article.data)?.getTime() || 0;
      const aTime = parseDate(a.article.updatedAt || a.article.data)?.getTime() || 0;
      return bTime - aTime;
    });

  return candidates.slice(0, limit).map((item) => item.article);
}
