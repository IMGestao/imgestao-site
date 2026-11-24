import { Link } from "react-router-dom";
export default function SiteFooter() {
  return <footer className="rd-footer"><div className="rd-shell rd-footer-inner"><div><strong>IM Estratégia e Gestão</strong><p>Estratégia, governança e transformação empresarial.</p></div><div className="rd-footer-links"><a href="/#sobre">Sobre a IM</a><a href="/#atuacao">Soluções</a><Link to="/insights">Insights</Link><a href="/#contato">Contato</a></div><p>© {new Date().getFullYear()} IM Estratégia e Gestão.</p></div></footer>;
}
