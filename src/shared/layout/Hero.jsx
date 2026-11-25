export default function Hero() {
  return (
    <section className="rd-hero">
      <div className="rd-panoramic-shell rd-hero-layout">
        <div className="rd-hero-intro">
          <h1><span>Estratégia que orienta.</span>{" "}<span>Gestão que transforma.</span></h1>
          <p>Conectamos visão estratégica, estrutura organizacional e disciplina de execução para apoiar empresas em seus desafios de crescimento e transformação.</p>
          <div className="rd-hero-actions">
            <a href="#atuacao" className="rd-button">Conheça nossas soluções</a>
            <a href="#insights" className="rd-hero-link">Explore nossos insights</a>
          </div>
        </div>
        <div className="rd-hero-image-shell">
          <div className="rd-hero-art" aria-hidden="true">
            <img src="/im-hero-conceito.webp" srcSet="/im-hero-conceito-836.webp 836w, /im-hero-conceito.webp 1672w" sizes="(max-width: 860px) 100vw, 95vw" width="1672" height="941" alt="" fetchPriority="high" loading="eager" />
          </div>
        </div>
      </div>
    </section>
  );
}
