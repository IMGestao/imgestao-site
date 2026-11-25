export default function Hero() {
  return (
    <section className="rd-hero">
      <div className="rd-panoramic-shell rd-hero-intro">
        <h1><span>Estratégia que orienta.</span>{" "}<span>Gestão que transforma.</span></h1>
        <p>Conectamos visão estratégica, estrutura organizacional e disciplina de execução para apoiar empresas em seus desafios de crescimento e transformação.</p>
      </div>
      <div className="rd-hero-panorama">
        <img src="/im-hero-panoramico.webp" width="2172" height="724" alt="Reconstituição ilustrativa da Ponte Estaiada Octávio Frias de Oliveira, do Rio Pinheiros e do entorno da Berrini, em São Paulo, vistos de um escritório" fetchPriority="high" loading="eager" />
      </div>
      <div className="rd-panoramic-shell rd-hero-actions">
        <a href="#atuacao" className="rd-button">Conheça nossas soluções</a>
        <a href="#insights" className="rd-hero-link">Explore nossos insights</a>
      </div>
    </section>
  );
}
