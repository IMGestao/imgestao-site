import logo from "../../assets/logo-im-transparent.png";
import { Link } from "react-router-dom";
import { publicacoes } from "../data/publicacoes";
import InsightCard from "../components/InsightCard";

export default function Insights() {
  const navItems = [
    { label: "Sobre", href: "/#sobre" },
    { label: "Atuação", href: "/#atuacao" },
    { label: "Metodologia", href: "/#metodologia" },
    { label: "Insights", href: "/insights", isRoute: true },
    { label: "Contato", href: "/#contato" },
  ];

  const publicacoesOrdenadas = [...publicacoes].sort(
    (a, b) => new Date(b.data) - new Date(a.data)
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-900 antialiased">
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
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group relative text-sm font-semibold text-slate-950"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full mt-1 h-[2px] w-full -translate-x-1/2 bg-slate-950" />
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm font-medium text-slate-600 transition hover:text-slate-950"
                >
                  {item.label}
                  <span className="absolute left-1/2 top-full mt-1 h-[2px] w-0 -translate-x-1/2 bg-slate-900 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
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
        <section className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.05),_transparent_30%),radial-gradient(circle_at_right,_rgba(37,99,235,0.07),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
            <div className="mb-6">
              <nav className="text-sm text-slate-500">
                <Link to="/" className="transition hover:text-slate-900">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-700">Insights</span>
              </nav>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-4xl">
                <div className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
                  Insights
                </div>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                  Análises e reflexões sobre estratégia, gestão e transformação
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                  Conteúdos desenvolvidos para lideranças e organizações que
                  precisam estruturar melhor sua direção, fortalecer sua gestão e
                  ampliar sua capacidade de execução.
                </p>
              </div>

              <div className="lg:pl-10">
                <div className="rounded-[2rem] border border-slate-200 bg-white/80 p-7 shadow-sm backdrop-blur">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    Curadoria editorial
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    A página de Insights reúne conteúdos autorais sobre
                    planejamento estratégico, governança, performance,
                    transformação organizacional e modelos de gestão.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Estratégia
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Governança
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Gestão
                    </span>
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Transformação
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Publicações
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                Conteúdo recente
              </h2>
            </div>

            <div className="max-w-md text-sm leading-7 text-slate-500 md:text-right">
              Artigos voltados à estruturação de decisões, fortalecimento da
              gestão e condução de mudanças com maior consistência executiva.
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {publicacoesOrdenadas.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-[2.25rem] border border-slate-200 bg-white p-10 shadow-sm md:p-12">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                    IM Estratégia e Gestão
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                    Conteúdo para organizações que precisam evoluir com direção
                    e execução.
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                    A produção de conteúdo da IM busca traduzir temas complexos
                    em análises práticas sobre estratégia, governança, gestão e
                    transformação, sempre com foco em aplicação real.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                  <a
                    href="/#contato"
                    className="rounded-full bg-slate-950 px-6 py-3.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                  >
                    Agendar conversa
                  </a>

                  <Link
                    to="/"
                    className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    Voltar para Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
            <div>
              © {new Date().getFullYear()} IM Estratégia e Gestão. Todos os direitos reservados.
            </div>

            <div className="flex items-center gap-6">
              <a href="/#sobre" className="transition hover:text-slate-900">
                Sobre
              </a>
              <a href="/#contato" className="transition hover:text-slate-900">
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}