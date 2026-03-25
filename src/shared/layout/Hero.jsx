export default function Hero({ differentiators = [] }) {
  const trustHighlights = differentiators.slice(0, 3);

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
              Estruturamos estratégia, gestão e transformação para empresas que precisam evoluir com clareza e execução.
            </h1>
          </div>

          <p className="mt-6 w-full text-lg leading-8 text-slate-700">
            A IM Estratégia e Gestão apoia organizações na construção de modelos mais sólidos de direção, governança e operação, conectando liderança, processos, tecnologia e dados para viabilizar mudanças consistentes.
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

          <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
            <p className="text-sm leading-7 text-slate-700">
              Atuação baseada em diagnóstico inicial, escopo claro e acompanhamento por marcos de execução.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              {trustHighlights.map((item) => (
                <span key={item}>• {item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
