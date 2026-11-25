import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-im-transparent.png";

const items = [
  { label: "Soluções", href: "/#atuacao" },
  { label: "Insights", href: "/insights" },
  { label: "Sobre a IM", href: "/sobre-a-im" },
  { label: "Metodologia", href: "/#metodologia" }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isHome = pathname === "/";
  useEffect(() => { if (!hash) window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname, hash]);
  return (
    <header className={`rd-header${isHome ? " rd-header-home" : ""}`}>
      <div className={`${isHome ? "rd-panoramic-shell" : "rd-shell"} rd-header-inner`}>
        <Link to="/" className="rd-brand" onClick={() => setOpen(false)}>
          <span className="rd-logo"><img src={logo} alt="IM Estratégia e Gestão" /></span>
          <span className="rd-brand-positioning">Consultoria em transformação,<br />estratégia e governança</span>
        </Link>
        <button className="rd-menu-toggle" type="button" aria-expanded={open} aria-controls="rd-nav" onClick={() => setOpen(!open)}>
          {open ? "Fechar" : "Menu"}
        </button>
        <nav id="rd-nav" aria-label="Navegação principal" className={open ? "rd-nav rd-nav-open" : "rd-nav"}>
          {items.map(item => !item.href.includes("#") ? (
            <Link key={item.href} to={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>
          ) : (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="rd-button rd-header-cta" href="/#contato" onClick={() => setOpen(false)}>Fale conosco</a>
        </nav>
      </div>
    </header>
  );
}
