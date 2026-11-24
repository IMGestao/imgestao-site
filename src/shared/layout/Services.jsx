import { Link } from "react-router-dom";
import { themes, themePath } from "../../features/insights/data/themes.js";

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
            <details className="rd-service scroll-mt-28" id={`solucao-${index + 1}`} key={service.title}>
              <summary><span className="rd-service-num">0{index+1}</span><span className="rd-service-title">{service.title}</span><span className="rd-service-expand" aria-hidden="true">+</span></summary>
              <div className="rd-service-body"><p>{service.description}</p><ul>{details[index].map(item => <li key={item}>{item}</li>)}</ul><div className="flex flex-col gap-3"><a href="#contato" className="rd-text-link">Converse conosco sobre esta solução</a>{themes.filter(theme => theme.serviceIndex === index).map(theme => <Link key={theme.slug} to={themePath(theme)} className="rd-text-link">{theme.title}</Link>)}</div></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
