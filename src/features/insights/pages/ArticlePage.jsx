import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import InsightCard from "../components/InsightCard";
import EditorialVisual from "../components/EditorialVisual";
import { publicacoes } from "../data/publicacoes";
import {
  formatDate,
  getRelatedArticles,
  getSortedArticles,
} from "../utils/articles";
import {
  headingToAnchor,
  parseConteudoToBlocks,
} from "../utils/contentParser";
import SiteHeader from "../../../shared/layout/SiteHeader";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SeoHead from "../../../shared/seo/SeoHead";
import { getArticleSeo, getNotFoundSeo } from "../../../shared/seo/seoConfig";

function InlineText({ text = "" }) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((part, i) => part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part);
}

function BannerAbstrato({ artigo }) {
  return <div className="rd-article-visual"><EditorialVisual article={artigo} priority /></div>;
}

function EditorialTable({ headers = [], rows = [] }) {
  if (!headers.length || !rows.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse text-left">
  
        <thead>
          <tr className="bg-slate-50">
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600"
              >
                <InlineText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="align-top">
              {headers.map((_, colIndex) => (
                <td
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="border-b border-slate-100 px-4 py-3 text-base leading-7 text-slate-700"
                >
                  <InlineText text={row[colIndex] || "—"} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const artigosOrdenados = useMemo(() => getSortedArticles(publicacoes), []);
  const artigo = artigosOrdenados.find((item) => item.slug === slug);

  const blocos = useMemo(() => parseConteudoToBlocks(artigo?.conteudo || ""), [artigo]);
  const takeaways = artigo?.resumoExecutivo || [];
  const headings = blocos.filter(bloco => bloco.tipo === "h2");
  const relacionados = useMemo(
    () => getRelatedArticles(artigosOrdenados, artigo, 3),
    [artigosOrdenados, artigo]
  );

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Insights", href: "/insights", isRoute: true },
  ];

  if (!artigo) {
    const sugeridos = artigosOrdenados.slice(0, 3);

    return (
      <div className="min-h-screen bg-[#f5f7fa] text-slate-900 antialiased">
        <SeoHead
          config={getNotFoundSeo()}
        />
        <SiteHeader navItems={navItems} />

        <main className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Publicação</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">Artigo não encontrado</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              O conteúdo solicitado não está disponível, foi removido ou o link está incompleto.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/insights"
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Ver todos os insights
              </Link>
              <Link
                to="/"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Voltar para Home
              </Link>
            </div>
          </section>

          {sugeridos.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Talvez você esteja procurando por</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {sugeridos.map((item) => (
                  <InsightCard key={item.slug} article={item} />
                ))}
              </div>
            </section>
          )}
        </main>

        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-950 antialiased">
      <SeoHead config={getArticleSeo(artigo)} />
      <SiteHeader navItems={navItems} />

      <main>
        <section className="rd-article-banner">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
            <nav aria-label="Caminho de navegação" className="mb-8 text-sm text-slate-300">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/insights" className="transition hover:text-white">
                Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-200">{artigo.categoria}</span>
            </nav>

            <div className="max-w-5xl">
              <h1 className="rd-article-title">
                {artigo.titulo}
              </h1>

              <p className="rd-article-lead">
                {artigo.excerpt || artigo.descricao}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300">
                <span>{artigo.edicaoRetroativa ? "Edição de " : ""}{formatDate(artigo.data)}</span>
                <span>•</span>
                <span>{artigo.autor}</span>
                {artigo.tempoLeitura && <><span>·</span><span>{artigo.tempoLeitura}</span></>}
                {artigo.updatedAt && artigo.updatedAt !== artigo.data && (
                  <>
                    <span>•</span>
                    <span>Atualizado em {formatDate(artigo.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>

            {artigo.edicaoRetroativa && <p className="mt-4 text-sm text-slate-300">Série retrospectiva de 2026. {artigo.dataPublicacao ? `Publicado em ${formatDate(artigo.dataPublicacao)}.` : "Em homologação, aguardando publicação."}</p>}
            <div className="mt-8">
              <BannerAbstrato artigo={artigo} />
            </div>
          </div>
        </section>

        <section className="rd-reading-shell">
          <div className="rd-reading-layout">
            {headings.length > 0 && (
              <aside className="rd-reading-aside">
                <nav aria-label="Neste artigo">
                  <h2>Neste artigo</h2>
                  <ul>{headings.map(bloco => <li key={bloco.texto}><a href={`#${headingToAnchor(bloco.texto)}`}>{bloco.texto}</a></li>)}</ul>
                </nav>
              </aside>
            )}
            <article className="rd-reading">
              {takeaways.length > 0 && (
                <section className="rd-summary" aria-labelledby="resumo-executivo">
                  <h2 id="resumo-executivo">Em resumo</h2>
                  <ul>{takeaways.map(item => <li key={item}><InlineText text={item} /></li>)}</ul>
                </section>
              )}
              <div className="rd-reading-body">
                {blocos.map((bloco, index) => {
                  if (bloco.tipo === "h2") return <h2 key={index} id={headingToAnchor(bloco.texto)}><InlineText text={bloco.texto} /></h2>;
                  if (bloco.tipo === "h3") return <h3 key={index}><InlineText text={bloco.texto} /></h3>;
                  if (bloco.tipo === "lista") return <ul key={index}>{bloco.itens.map((item,i) => <li key={i}><InlineText text={item} /></li>)}</ul>;
                  if (bloco.tipo === "tabela") return <EditorialTable key={index} headers={bloco.headers} rows={bloco.rows} />;
                  return <p key={index} className={index === 0 ? "rd-reading-intro" : undefined}><InlineText text={bloco.texto} /></p>;
                })}
              </div>
              {artigo.referencias?.length > 0 && (
                <section className="rd-references" aria-labelledby="referencias">
                  <h2 id="referencias">Referências e leitura complementar</h2>
                  <ul>{artigo.referencias.map(ref => <li key={ref.titulo}>{ref.url ? <a href={ref.url}>{ref.titulo}</a> : ref.titulo}</li>)}</ul>
                </section>
              )}
              <div className="rd-reading-end"><Link to="/insights" className="rd-text-link">Explorar outros insights</Link><a href="/#contato" className="rd-button">Fale conosco</a></div>
            </article>
          </div>

          {relacionados.length > 0 && (
            <section className="mt-20">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Artigos relacionados</h2>
                <Link to="/insights" className="text-sm font-medium text-blue-700 transition hover:text-blue-900">
                  Ver todos
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {relacionados.map((item) => (
                  <InsightCard key={item.slug} article={item} />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
