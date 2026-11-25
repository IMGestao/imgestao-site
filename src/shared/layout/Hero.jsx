export default function Hero() {
  return (
    <section className="rd-hero">
      <div className="rd-panoramic-shell rd-hero-intro">
        <h1><span>Estratégia que orienta.</span>{" "}<span>Gestão que transforma.</span></h1>
        <p>Conectamos visão estratégica, estrutura organizacional e disciplina de execução para apoiar empresas em seus desafios de crescimento e transformação.</p>
      </div>
      <div className="rd-hero-panorama">
        <img src="/im-hero-panoramico.webp" srcSet="/im-hero-panoramico-836.webp 836w, /im-hero-panoramico.webp 1536w" sizes="100vw" width="1536" height="1024" alt="Reconstituição da Ponte Estaiada Octávio Frias de Oliveira, Rio Pinheiros e edifícios da Berrini, sob céu azul com nuvens, em São Paulo" fetchPriority="high" loading="eager" />
      </div>
      <div className="rd-panoramic-shell rd-hero-actions">
        <a href="#atuacao" className="rd-button">Conheça nossas soluções</a>
        <a href="#insights" className="rd-hero-link">Explore nossos insights</a>
      </div>
    </section>
  );
}
