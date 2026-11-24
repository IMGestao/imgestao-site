export default function Services({ services = [] }) {
  const details = [
    ["Planejamento estratégico", "Desdobramento de objetivos e metas", "Priorização de iniciativas"],
    ["Modelos de governança", "Indicadores e ritos de gestão", "Gestão de portfólio e projetos"],
    ["Arquitetura de processos", "Melhoria contínua e eficiência operacional", "Gestão da mudança"],
    ["Transformação digital", "Governança de dados e analytics", "Automação e integração de negócios"]
  ];
  return (
    <section id="atuacao" className="rd-section rd-solutions">
      <div className="rd-shell">
        <div className="rd-section-heading"><div><p className="rd-kicker">Nossas soluções</p><h2>Da visão estratégica à execução.</h2></div><p>Quatro frentes complementares para fortalecer a gestão e a capacidade de entrega das organizações.</p></div>
        <div className="rd-service-list">
          {services.map((service,index) => (
            <details className="rd-service" key={service.title}>
              <summary><span className="rd-service-num">0{index+1}</span><span className="rd-service-title">{service.title}</span><span className="rd-service-expand" aria-hidden="true">+</span></summary>
              <div className="rd-service-body"><p>{service.description}</p><ul>{details[index].map(item => <li key={item}>{item}</li>)}</ul><a href="#contato" className="rd-text-link">Converse conosco sobre esta solução</a></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
