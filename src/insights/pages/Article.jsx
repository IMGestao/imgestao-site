import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { publicacoes } from "../data/publicacoes";
import logo from "../../assets/logo-im-transparent.png";

function formatarData(data) {
  if (!data) return "";
  const date = new Date(data);
  if (Number.isNaN(date.getTime())) return data;
  return date.toLocaleDateString("pt-BR");
}

function parseConteudo(conteudo = "") {
  const linhas = conteudo.split("\n").map((linha) => linha.trim());
  const blocos = [];
  let paragrafoBuffer = [];
  let listaBuffer = [];

  const flushParagrafos = () => {
    if (paragrafoBuffer.length) {
      blocos.push({
        tipo: "paragrafo",
        texto: paragrafoBuffer.join(" "),
      });
      paragrafoBuffer = [];
    }
  };

  const flushLista = () => {
    if (listaBuffer.length) {
      blocos.push({
        tipo: "lista",
        itens: [...listaBuffer],
      });
      listaBuffer = [];
    }
  };

  for (const linha of linhas) {
    if (!linha) {
      flushParagrafos();
      flushLista();
      continue;
    }

    if (linha.startsWith("## ")) {
      flushParagrafos();
      flushLista();
      blocos.push({
        tipo: "h2",
        texto: linha.replace(/^##\s+/, "").trim(),
      });
      continue;
    }

    if (linha.startsWith("### ")) {
      flushParagrafos();
      flushLista();
      blocos.push({
        tipo: "h3",
        texto: linha.replace(/^###\s+/, "").trim(),
      });
      continue;
    }

    if (linha.startsWith("- ") || linha.startsWith("* ")) {
      flushParagrafos();
      listaBuffer.push(linha.replace(/^[-*]\s+/, "").trim());
      continue;
    }

    paragrafoBuffer.push(linha);
  }

  flushParagrafos();
  flushLista();

  return blocos;
}

function extrairTakeaways(blocos) {
  const primeiraLista = blocos.find((bloco) => bloco.tipo === "lista");
  return primeiraLista?.itens || [];
}

function slugParaTema(categoria = "") {
  const mapa = {
    estratégia: "azul-estrategia",
    governança: "azul-governanca",
    transformação: "azul-transformacao",
    gestão: "azul-gestao",
  };

  return mapa[categoria.toLowerCase()] || "azul-estrategia";
}

function BannerAbstrato({ artigo, tema = "azul-estrategia" }) {
  const temas = {
    "azul-estrategia":
      "bg-[linear-gradient(135deg,#dbeafe_0%,#eff6ff_38%,#e2e8f0_76%,#f8fafc_100%)]",
    "azul-governanca":
      "bg-[linear-gradient(135deg,#e0f2fe_0%,#f0f9ff_38%,#dbeafe_76%,#f8fafc_100%)]",
    "azul-transformacao":
      "bg-[linear-gradient(135deg,#ecfeff_0%,#f0fdfa_38%,#e0f2fe_76%,#f8fafc_100%)]",
    "azul-gestao":
      "bg-[linear-gradient(135deg,#eef2ff_0%,#f8fafc_38%,#e0e7ff_76%,#ffffff_100%)]",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-slate-200 ${temas[tema] || temas["azul-estrategia"]} min-h-[520px] md:min-h-[620px]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.78),transparent_22%),radial-gradient(circle_at_85%_22%,rgba(255,255,255,0.5),transparent_18%),linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(15,23,42,0.03))]" />

      <div className="absolute left-[8%] top-[16%] h-24 w-24 rounded-full border border-white/60 bg-white/20 backdrop-blur-sm md:h-36 md:w-36" />
      <div className="absolute right-[10%] top-[18%] h-16 w-16 rounded-full border border-white/60 bg-white/25 backdrop-blur-sm md:h-24 md:w-24" />

      <div className="absolute bottom-[12%] left-[12%] h-16 w-16 rounded-2xl border border-white/60 bg-white/30 shadow-sm md:h-24 md:w-24" />
      <div className="absolute bottom-[12%] left-[40%] h-20 w-20 rounded-2xl border border-white/60 bg-white/30 shadow-sm md:h-28 md:w-28" />
      <div className="absolute bottom-[12%] left-[66%] h-24 w-24 rounded-2xl border border-white/60 bg-white/30 shadow-sm md:h-32 md:w-32" />

      <div className="absolute bottom-[24%] left-[18%] h-[2px] w-[22%] rotate-[-14deg] bg-blue-500/30" />
      <div className="absolute bottom-[30%] left-[44%] h-[2px] w-[18%] rotate-[-10deg] bg-blue-700/24" />
      <div className="absolute bottom-[35%] left-[68%] h-[2px] w-[10%] rotate-[-24deg] bg-slate-700/20" />

      <div className="relative z-10 flex min-h-[520px] items-end md:min-h-[620px]">
        <div className="w-full p-8 md:p-12 lg:p-16">
          <div className="max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              {artigo.categoria && (
                <span className="rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur-sm">
                  {artigo.categoria}
                </span>
              )}

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Artigo
              </span>

              {artigo.tempoLeitura && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  {artigo.tempoLeitura}
                </span>
              )}
            </div>

            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 md:text-6xl">
              {artigo.titulo}
            </h1>

            {artigo.descricao && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700 md:text-[22px] md:leading-9">
                {artigo.descricao}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              <span>{formatarData(artigo.data)}</span>
              <span>•</span>
              <span>{artigo.autor}</span>
              <span>•</span>
              <span>{artigo.tempoLeitura}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Article() {
  const { slug } = useParams();
  const artigo = publicacoes.find((item) => item.slug === slug);

  const blocos = useMemo(() => parseConteudo(artigo?.conteudo || ""), [artigo]);
  const takeaways = useMemo(() => extrairTakeaways(blocos), [blocos]);

  const temaVisual =
    artigo?.visual?.tema || slugParaTema(artigo?.categoria || "Estratégia");

  useEffect(() => {
    if (!artigo) {
      document.title = "Artigo não encontrado | IM Estratégia e Gestão";
      return;
    }

    document.title = `${artigo.titulo} | IM Estratégia e Gestão`;

    const ensureMeta = (selector, createTag, attrs, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement(createTag);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta(
      'meta[name="description"]',
      "meta",
      { name: "description" },
      artigo.descricao || "Publicação da IM Estratégia e Gestão."
    );

    ensureMeta(
      'meta[property="og:title"]',
      "meta",
      { property: "og:title" },
      artigo.titulo
    );

    ensureMeta(
      'meta[property="og:description"]',
      "meta",
      { property: "og:description" },
      artigo.descricao || "Publicação da IM Estratégia e Gestão."
    );

    ensureMeta(
      'meta[property="og:type"]',
      "meta",
      { property: "og:type" },
      "article"
    );
  }, [artigo]);

  if (!artigo) {
    return (
      <main className="min-h-screen bg-[#f5f7fa] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            Publicação
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
            Artigo não encontrado
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            O conteúdo solicitado não está disponível ou foi removido.
          </p>
          <Link
            to="/insights"
            className="mt-8 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
          >
            Voltar para Insights
          </Link>
        </div>
      </main>
    );
  }

  const h2Blocos = blocos.filter((bloco) => bloco.tipo === "h2");

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-950 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-5">
            <img
              src={logo}
              alt="IM Estratégia e Gestão"
              className="h-16 w-auto object-contain"
            />
            <div className="leading-tight">
              <div className="text-base tracking-wide text-slate-500">
                Estratégia e Gestão
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Home
            </Link>
            <Link
              to="/insights"
              className="relative text-sm font-semibold text-slate-950"
            >
              Insights
              <span className="absolute left-1/2 top-full mt-1 h-[2px] w-full -translate-x-1/2 bg-slate-950" />
            </Link>
          </nav>

          <a
            href="/#contato"
            className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
          >
            Agendar conversa
          </a>
        </div>
      </header>

      <main>
        <section className="border-b border-slate-200/80 bg-[linear-gradient(180deg,#f8fbff_0%,#f5f7fa_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
            <div className="mb-8 text-sm text-slate-500">
              <Link to="/" className="transition hover:text-slate-900">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/insights" className="transition hover:text-slate-900">
                Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">{artigo.categoria}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            </div>

            {(artigo.visual?.exibirBanner ?? true) && (
  <div className="mt-8">
    <BannerAbstrato artigo={artigo} tema={temaVisual} />
  </div>
)}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-18">
          <div className="grid gap-10 lg:grid-cols-1">
            
            <article className="min-w-0">
              {takeaways.length > 0 && (
                <section className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                  <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Key takeaways
                  </div>
                  <ul className="space-y-4">
                    {takeaways.map((item, index) => (
                      <li
                        key={`${item}-${index}`}
                        className="flex gap-4 text-base leading-8 text-slate-700"
                      >
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-10 shadow-sm md:px-12 md:py-14">
                {blocos.length > 0 && blocos[0].tipo === "paragrafo" && (
                  <p className="border-l-2 border-blue-600 pl-5 text-xl leading-9 text-slate-800 md:text-[26px] md:leading-10">
                    {blocos[0].texto}
                  </p>
                )}

                <div className="mt-10 space-y-8 text-[17px] leading-8 text-slate-700">
                  {blocos.slice(blocos[0]?.tipo === "paragrafo" ? 1 : 0).map((bloco, index) => {
                    if (bloco.tipo === "h2") {
                      const anchor = bloco.texto
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^\w\s-]/g, "")
                        .trim()
                        .replace(/\s+/g, "-");

                      return (
                        <section key={`${bloco.texto}-${index}`} id={anchor} className="pt-2">
                          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950 md:text-4xl">
                            {bloco.texto}
                          </h2>
                        </section>
                      );
                    }

                    if (bloco.tipo === "h3") {
                      return (
                        <h3
                          key={`${bloco.texto}-${index}`}
                          className="pt-2 text-2xl font-semibold tracking-tight text-slate-900"
                        >
                          {bloco.texto}
                        </h3>
                      );
                    }

                    if (bloco.tipo === "lista") {
                      return (
                        <ul key={`lista-${index}`} className="space-y-4">
                          {bloco.itens.map((item, itemIndex) => (
                            <li
                              key={`${item}-${itemIndex}`}
                              className="flex gap-4 text-[17px] leading-8 text-slate-700"
                            >
                              <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return (
                      <p key={`${bloco.texto}-${index}`} className="text-[17px] leading-8 text-slate-700">
                        {bloco.texto}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-slate-800 bg-slate-950 p-8 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)] md:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Sobre este insight
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
                  Estratégia, governança e execução com densidade prática.
                </h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
                  A IM Estratégia e Gestão desenvolve conteúdos para empresas e
                  lideranças que precisam transformar reflexão estratégica em
                  modelo de gestão, capacidade de execução e evolução
                  organizacional.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/insights"
                    className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Explorar outros insights
                  </Link>

                  <a
                    href="/#contato"
                    className="rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                  >
                    Conhecer a IM
                  </a>
                </div>
              </div>
            </article>

            
          </div>
        </section>
      </main>
    </div>
  );
}