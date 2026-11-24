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
  extractTakeaways,
  headingToAnchor,
  parseConteudoToBlocks,
} from "../utils/contentParser";
import SiteHeader from "../../../shared/layout/SiteHeader";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SeoHead from "../../../shared/seo/SeoHead";
import { getArticleSeo, resolveCanonical } from "../../../shared/seo/seoConfig";

function EditorialDivider() {
  return <div className="my-12 h-px w-full bg-[linear-gradient(90deg,transparent,#d1d5db,transparent)]" />;
}

function QuoteBlock({ quote }) {
  if (!quote) return null;

  return (
    <blockquote className="rounded-3xl border border-slate-200 bg-white px-6 py-7 md:px-8">
      <p className="font-serif text-2xl leading-relaxed text-slate-900 md:text-3xl">“{quote}”</p>
    </blockquote>
  );
}

function pickQuoteFromBlocks(blocos = []) {
  const paragraph = blocos.find(
    (bloco) => bloco.tipo === "paragrafo" && String(bloco.texto || "").length > 90
  );

  if (!paragraph) return "";

  const sentence = String(paragraph.texto).split(". ").slice(0, 1).join(". ").trim();
  return sentence.replace(/\.+$/, "");
}

function BannerAbstrato({ artigo }) {
  return <div className="rd-article-visual"><EditorialVisual article={artigo} /></div>;
}

function EditorialTable({ headers = [], rows = [] }) {
  if (!headers.length || !rows.length) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse text-left">
        <colgroup>
          <col className="w-[22%]" />
          <col className="w-[30%]" />
          <col className="w-[48%]" />
        </colgroup>
        <thead>
          <tr className="bg-slate-50">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-600"
              >
                {header}
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
                  className={`border-b border-slate-100 px-4 py-3 text-[16px] leading-7 text-slate-700 ${
                    colIndex === 0 ? "whitespace-nowrap" : ""
                  }`}
                >
                  {row[colIndex] || "—"}
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
  const takeaways = useMemo(() => extractTakeaways(blocos), [blocos]);
  const quote = useMemo(() => pickQuoteFromBlocks(blocos), [blocos]);
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
          config={{
            title: "Artigo não encontrado | IM Estratégia e Gestão",
            description:
              "O artigo solicitado não está disponível. Explore os insights publicados pela IM Estratégia e Gestão.",
            canonical: resolveCanonical("/insights"),
            type: "website",
            robots: "noindex,follow",
          }}
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
            <div className="mb-8 text-sm text-slate-300">
              <Link to="/" className="transition hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/insights" className="transition hover:text-white">
                Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-200">{artigo.categoria}</span>
            </div>

            <div className="max-w-5xl">
              <h1 className="rd-article-title">
                {artigo.titulo}
              </h1>

              <p className="rd-article-lead">
                {artigo.excerpt || artigo.descricao}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-300">
                <span>{formatDate(artigo.data)}</span>
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

            <div className="mt-8">
              <BannerAbstrato artigo={artigo} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <article className="mx-auto min-w-0 max-w-3xl">
            <QuoteBlock quote={quote} />
            <EditorialDivider />

            {takeaways.length > 0 && (
              <section className="mb-12 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Destaques</div>
                <ul className="space-y-4">
                  {takeaways.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex gap-4 text-base leading-8 text-slate-700">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="rd-article-body">
              {blocos.length > 0 && blocos[0].tipo === "paragrafo" && (
                <p className="border-l-2 border-slate-900 pl-5 font-serif text-2xl leading-10 text-slate-800 md:text-[30px] md:leading-[1.6]">
                  {blocos[0].texto}
                </p>
              )}

              <div className="mt-12 space-y-10 text-[18px] leading-9 text-slate-700">
                {blocos.slice(blocos[0]?.tipo === "paragrafo" ? 1 : 0).map((bloco, index) => {
                  if (bloco.tipo === "h2") {
                    return (
                      <section
                        key={`${bloco.texto}-${index}`}
                        id={headingToAnchor(bloco.texto)}
                        className="pt-6"
                      >
                        <EditorialDivider />
                        <h2 className="font-serif text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                          {bloco.texto}
                        </h2>
                      </section>
                    );
                  }

                  if (bloco.tipo === "h3") {
                    return (
                      <h3
                        key={`${bloco.texto}-${index}`}
                        className="pt-4 text-2xl font-semibold tracking-tight text-slate-900"
                      >
                        {bloco.texto}
                      </h3>
                    );
                  }

                  if (bloco.tipo === "lista") {
                    return (
                      <ul key={`lista-${index}`} className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                        {bloco.itens.map((item, itemIndex) => (
                          <li key={`${item}-${itemIndex}`} className="flex gap-4 text-[17px] leading-8 text-slate-700">
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-900" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }

                  if (bloco.tipo === "tabela") {
                    return (
                      <EditorialTable
                        key={`tabela-${index}`}
                        headers={bloco.headers}
                        rows={bloco.rows}
                      />
                    );
                  }

                  return (
                    <p key={`${bloco.texto}-${index}`} className="text-[18px] leading-9 text-slate-700">
                      {bloco.texto}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>

          {relacionados.length > 0 && (
            <section className="mt-12">
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
