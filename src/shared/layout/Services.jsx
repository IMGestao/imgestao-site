export default function Services({ services = [] }) {
  return (
    <section id="atuacao" className="scroll-mt-28 border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Áreas de atuação</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Frentes desenhadas para conectar direção estratégica, organização interna e capacidade de entrega.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60"
            >
              <div className="text-xl font-semibold text-slate-950">{service.title}</div>
              <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
