import logo from "../assets/logo-im-transparent.png";
import { Link } from "react-router-dom";
import { publicacoes } from "../insights/data/publicacoes";
import InsightCard from "../insights/components/InsightCard";

export default function Home() {
  const services = [
    {
      title: "Estratégia e Direcionamento",
      description:
        "Estruturação de planejamento estratégico, definição de objetivos, priorização de iniciativas e alinhamento executivo para sustentar crescimento com clareza.",
    },
    {
      title: "Governança e Gestão",
      description:
        "Desenho de modelos de governança, ritos de gestão, indicadores e mecanismos de acompanhamento para transformar estratégia em disciplina de execução.",
    },
    {
      title: "Transformação Organizacional",
      description:
        "Redesenho de processos, organização de portfólio, estruturação de PMO e apoio à implementação de mudanças relevantes na operação.",
    },
    {
      title: "Tecnologia, Dados e Performance",
      description:
        "Conexão entre gestão, tecnologia e analytics para ampliar eficiência, visibilidade e capacidade de decisão em ambientes complexos.",
    },
  ];

  const differentiators = [
    "Visão integrada entre estratégia, governança, operações e tecnologia",
    "Atuação com foco executivo, clareza analítica e implementação prática",
    "Estruturação de decisões, processos e prioridades com método",
    "Apoio a empresas em fases de crescimento, reorganização e transformação",
  ];

  const methodology = [
    {
      step: "01",
      title: "Diagnóstico",
      text: "Leitura estruturada do contexto, desafios, maturidade de gestão e principais pontos de alavancagem da organização.",
    },
    {
      step: "02",
      title: "Direcionamento",
      text: "Definição de prioridades, objetivos, frentes de atuação e arquitetura gerencial para dar consistência ao movimento estratégico.",
    },
    {
      step: "03",
      title: "Estruturação",
      text: "Desenho de governança, rotinas de gestão, indicadores, iniciativas e papéis necessários para viabilizar a execução.",
    },
    {
      step: "04",
      title: "Implementação",
      text: "Acompanhamento da implantação, apoio à liderança, organização do portfólio e monitoramento da evolução dos resultados.",
    },
  ];

  const positioningItems = [
    "Planejamento e priorização executiva",
    "Governança e ritos de acompanhamento",
    "Organização de portfólio e iniciativas",
    "Estruturação de indicadores e performance",
    "Redesenho de processos críticos",
    "Integração entre gestão, tecnologia e operação",
  ];

  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Atuação", href: "#atuacao" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "Insights", href: "#insights" },
    { label: "Contato", href: "#contato" },
  ];

  const latestInsights = publicacoes.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
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
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-sm font-medium text-slate-600 transition hover:text-slate-950"
              >
                {item.label}
                <span className="absolute left-1/2 top-full mt-1 h-[2px] w-0 -translate-x-1/2 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contato"
            className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
          >
            Agendar conversa
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.10),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f5f7fa_100%)]">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm">
                Consultoria em estratégia, governança e transformação
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                Estruturamos estratégia, gestão e transformação para empresas
                que precisam evoluir com clareza e execução.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                A IM Estratégia e Gestão apoia organizações na construção de
                modelos mais sólidos de direção, governança e operação,
                conectando liderança, processos, tecnologia e dados para
                viabilizar mudanças consistentes.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#contato"
                  className="rounded-full bg-slate-950 px-6 py-3.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                >
                  Agendar conversa
                </a>
                <a
                  href="#atuacao"
                  className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-center text-sm font-medium text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Conhecer atuação
                </a>
              </div>

              <div className="mt-12 grid gap-5 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">
                    Estratégia
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Definição de prioridades, objetivos e caminhos de evolução.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">
                    Governança
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Estruturas de gestão para transformar intenção em execução
                    disciplinada.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">
                    Transformação
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Mudanças organizacionais orientadas por método, consistência
                    e resultado.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-2xl shadow-slate-300/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-slate-300">
                      Premium Assessment
                    </div>
                    <div className="mt-2 text-2xl font-semibold">
                      Modelo executivo de atuação
                    </div>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                <div className="mt-8 space-y-6">
                  {differentiators.map((item) => (
                    <div key={item} className="flex gap-4">
                      <div className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-sky-400" />
                      <p className="text-sm leading-7 text-slate-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Foco
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-200">
                    Empresas que precisam reorganizar prioridades, fortalecer
                    sua gestão, sustentar crescimento ou conduzir processos de
                    transformação com maior maturidade executiva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Sobre a IM Estratégia e Gestão
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Uma consultoria orientada por método, profundidade analítica e
                visão executiva.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p>
                A IM Estratégia e Gestão foi concebida para apoiar organizações
                que precisam estruturar melhor sua estratégia, fortalecer sua
                governança e organizar sua capacidade de execução.
              </p>
              <p>
                A atuação combina leitura de contexto, raciocínio estratégico e
                desenho gerencial para transformar desafios complexos em modelos
                mais claros de decisão, coordenação e acompanhamento.
              </p>
              <p>
                Mais do que recomendar direções, o foco está em construir bases
                consistentes para que a empresa avance com maior alinhamento,
                previsibilidade e maturidade operacional.
              </p>
            </div>
          </div>
        </section>

        <section id="atuacao" className="scroll-mt-28 border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Áreas de atuação
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Frentes desenhadas para conectar direção estratégica,
                organização interna e capacidade de entrega.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div className="text-xl font-semibold text-slate-950">
                    {service.title}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="metodologia"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
              Metodologia
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Uma abordagem estruturada para traduzir diagnóstico em direção e
              direção em execução.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {methodology.map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-sm font-semibold tracking-[0.2em] text-slate-400">
                  {item.step}
                </div>
                <div className="mt-4 text-xl font-semibold text-slate-950">
                  {item.title}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                Posicionamento
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Clareza estratégica, disciplina de gestão e transformação com
                consistência.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {positioningItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="insights"
          className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
                Insights
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Análises e reflexões sobre estratégia, gestão e transformação
              </h2>
            </div>

            <div className="text-sm text-slate-500">
              Conteúdo recente da IM Estratégia e Gestão.
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {latestInsights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/insights"
              className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800"
            >
              Ver todos os insights
              <span className="ml-2">→</span>
            </Link>
          </div>
        </section>

        <section id="contato" className="scroll-mt-28 pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#1e293b_100%)] p-10 text-white shadow-2xl shadow-slate-300/50 md:p-14">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                <div>
                  <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">
                    Contato
                  </div>
                  <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                    Vamos conversar sobre a evolução estratégica da sua
                    organização.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                    Se sua empresa está revisando sua direção, reorganizando sua
                    gestão ou conduzindo uma transformação relevante, a IM
                    Estratégia e Gestão pode apoiar a estruturação dos próximos
                    passos.
                  </p>
                </div>

                <div className="space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-7">
                  <a
                    href="mailto:contato@imgestao.com.br"
                    className="block rounded-full bg-white px-6 py-3.5 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                  >
                    contato@imgestao.com.br
                  </a>

                  <a
                    href="https://wa.me/5500000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full border border-white/15 px-6 py-3.5 text-center text-sm font-medium text-white transition hover:bg-white/10"
                  >
                    Falar via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-slate-700 pt-6 pb-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-400 md:flex-row">
          <div>© {new Date().getFullYear()} IM Estratégia e Gestão</div>

          <a
            href="https://www.linkedin.com/company/im-gestao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554V14.83c0-1.341-.027-3.066-1.868-3.066-1.868 0-2.154 1.459-2.154 2.968v5.72H9.317V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.604 0 4.27 2.372 4.27 5.455v6.285zM5.337 7.433a2.063 2.063 0 11.002-4.126 2.063 2.063 0 01-.002 4.126zM6.969 20.452H3.704V9h3.265v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}