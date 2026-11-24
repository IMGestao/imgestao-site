import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-im-transparent.png";

const items = [
  { label: "Soluções", href: "/#atuacao" },
  { label: "Insights", href: "/insights" },
  { label: "Sobre a IM", href: "/#sobre" },
  { label: "Metodologia", href: "/#metodologia" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname, hash]);
  return (
    <header className="rd-header">
      <div className="rd-shell rd-header-inner">
        <Link to="/" className="rd-brand" onClick={() => setOpen(false)}>
          <span className="rd-logo"><img src={logo} alt="IM Estratégia e Gestão" /></span>
          <span>ESTRATÉGIA<br />E GESTÃO</span>
        </Link>
        <button className="rd-menu-toggle" type="button" aria-expanded={open} aria-controls="rd-nav" onClick={() => setOpen(!open)}>
          {open ? "Fechar" : "Menu"}
        </button>
        <nav id="rd-nav" aria-label="Navegação principal" className={open ? "rd-nav rd-nav-open" : "rd-nav"}>
          {items.map(item => item.href === "/insights" ? (
            <Link key={item.href} to={item.href} aria-current={pathname === "/insights" ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
          ) : (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="rd-button rd-header-cta" href="/#contato" onClick={() => setOpen(false)}>Fale conosco</a>
        </nav>
      </div>
    </header>
  );
}
