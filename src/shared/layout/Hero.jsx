export default function Hero({ differentiators = [] }) {
  const trustHighlights = differentiators.slice(0, 3);
  const milestoneIcons = [
    (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  ];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.06),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.10),_transparent_28%),linear-gradient(180deg,#ffffff_0%,#f5f7fa_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="w-full">
          <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm">
            Consultoria em estratégia, governança e transformação
          </div>

            <div className="im-hero-heading-stage">
              <div className="im-hero-heading-bg" aria-hidden="true" />
              <h1 className="relative z-10 w-full text-4xl leading-tight font-semibold tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                Estruturamos estratégia, desenvolvendo estruturas de gestão e execução para empresas que buscam evolução com método.
              </h1>
            </div>

          <p className="mt-6 w-full text-lg leading-8 text-slate-700">
            Conduzimos projetos de organização empresarial voltados à clareza estratégica e disciplina de gestão. Ao integrar estrutura organizacional, decisão e execução, apoiamos a empresa na construção de eficiência operacional e resultados consistentes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#contato"
              className="rounded-full bg-slate-950 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Agendar conversa
            </a>
            <a
              href="#atuacao"
              className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-slate-950"
            >
              Ver áreas de atuação
            </a>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/85 px-5 py-5 shadow-sm backdrop-blur-sm">
            <p className="text-sm leading-7 text-slate-700">
              Atuação baseada em diagnóstico inicial, escopo transparente e acompanhamento contínuo por marcos de execução.
            </p>
            <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700 md:grid-cols-2">
              {trustHighlights.map((item, index) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700">
                    {milestoneIcons[index % milestoneIcons.length]}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
