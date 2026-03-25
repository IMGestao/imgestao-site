import { publicacoes } from "../data/publicacoes";
import { getSortedArticles } from "../utils/articles";
import SiteHeader from "../../../shared/layout/SiteHeader";
import Hero from "../../../shared/layout/Hero";
import Services from "../../../shared/layout/Services";
import InsightsPreview from "../../../shared/layout/InsightsPreview";
import ContactCTA from "../../../shared/layout/ContactCTA";
import SiteFooter from "../../../shared/layout/SiteFooter";
import SeoHead from "../../../shared/seo/SeoHead";
import { getHomeSeo } from "../../../shared/seo/seoConfig";

function SectionDivider() {
  return <div className="mx-auto h-px w-full max-w-7xl bg-[linear-gradient(90deg,transparent,#d8dee7,transparent)]" />;
}

export default function HomePage() {
  const navItems = [
    { label: "Sobre", href: "#sobre" },
    { label: "Atuação", href: "#atuacao" },
    { label: "Metodologia", href: "#metodologia" },
    { label: "Insights", href: "#insights" },
  ];

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

  const highlightedInsights = getSortedArticles(publicacoes).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900 antialiased">
      <SeoHead config={getHomeSeo()} />
      <SiteHeader navItems={navItems} ctaHref="#contato" />

      <main>
        <Hero differentiators={differentiators} />
        <SectionDivider />

        <section id="sobre" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Sobre a IM Estratégia e Gestão</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                Uma consultoria orientada por método, profundidade analítica e visão executiva.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p className="max-w-[65ch]">
                A IM Estratégia e Gestão foi concebida para apoiar organizações que precisam estruturar melhor sua estratégia, fortalecer sua governança e organizar sua capacidade de execução.
              </p>
              <p className="max-w-[65ch]">
                A atuação combina leitura de contexto, raciocínio estratégico e desenho gerencial para transformar desafios complexos em modelos mais claros de decisão, coordenação e acompanhamento.
              </p>
              <p className="max-w-[65ch]">
                Mais do que recomendar direções, o foco está em construir bases consistentes para que a empresa avance com maior alinhamento, previsibilidade e maturidade operacional.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />
        <Services services={services} />
        <SectionDivider />

        <section id="metodologia" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Metodologia</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Uma abordagem estruturada para traduzir diagnóstico em direção e direção em execução.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {methodology.map((item) => (
              <div
                key={item.step}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="text-sm font-semibold tracking-[0.2em] text-slate-400">{item.step}</div>
                <div className="mt-4 text-xl font-semibold text-slate-950">{item.title}</div>
                <p className="mt-4 max-w-[42ch] text-sm leading-7 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />
        <section className="bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">Posicionamento</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                Clareza estratégica, disciplina de gestão e transformação com consistência.
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

        <SectionDivider />
        <InsightsPreview articles={highlightedInsights} />
        <ContactCTA />
      </main>

      <SiteFooter />
    </div>
  );
}

