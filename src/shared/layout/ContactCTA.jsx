export default function ContactCTA() {
  return (
    <section id="contato" className="scroll-mt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,#0f172a_0%,#111827_55%,#1e293b_100%)] p-10 text-white shadow-2xl shadow-slate-300/50 md:p-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-400">Contato</div>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
                Vamos conversar sobre a evolução estratégica da sua organização.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                Se sua empresa está revisando sua direção, reorganizando sua gestão ou conduzindo uma transformação relevante, a IM Estratégia e Gestão pode apoiar a estruturação dos próximos passos.
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
  );
}
