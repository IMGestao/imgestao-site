import { Link } from "react-router-dom";
export default function SiteFooter() {
  return <footer className="rd-footer"><div className="rd-shell rd-footer-inner"><div><strong>IM Estratégia e Gestão</strong><p>Estratégia, governança e transformação empresarial.</p></div><div className="rd-footer-links flex-wrap"><Link to="/sobre-a-im">Sobre a IM</Link><a href="/#atuacao">Soluções</a><Link to="/insights">Insights</Link><Link to="/politica-editorial">Política editorial</Link><Link to="/politica-de-correcoes">Correções</Link><a href="/#contato">Contato</a></div><p>© {new Date().getFullYear()} IM Estratégia e Gestão.</p></div></footer>;
}
