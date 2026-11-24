export default function Hero() {
  return (
    <section className="rd-hero">
      <div className="rd-shell rd-hero-inner">
        <div className="rd-hero-copy">
          <p className="rd-kicker">Consultoria em estratégia, governança e transformação</p>
          <h1>Estratégia que orienta.<br /><span>Gestão que transforma.</span></h1>
          <p>Conectamos visão estratégica, estrutura organizacional e disciplina de execução para apoiar empresas em seus desafios de crescimento e transformação.</p>
          <div className="rd-actions"><a href="#atuacao" className="rd-button">Conheça nossas soluções</a><a href="#insights" className="rd-hero-link">Explore nossos insights</a></div>
        </div>
        <div className="rd-hero-picture" role="img" aria-label="Arquitetura contemporânea: estrutura, perspectiva e transformação">
          <div className="rd-hero-overlay" />
          <div className="rd-hero-caption"><span>VISÃO ESTRATÉGICA</span><span>DISCIPLINA DE EXECUÇÃO</span></div>
        </div>
      </div>
    </section>
  );
}
