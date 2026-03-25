import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-im-transparent.png";

export default function SiteHeader({ navItems = [], ctaHref = "/#contato" }) {
  const hashItems = useMemo(
    () => navItems.filter((item) => !item.isRoute && item.href?.startsWith("#")),
    [navItems]
  );
  const [activeHash, setActiveHash] = useState(hashItems[0]?.href || "");

  useEffect(() => {
    if (!hashItems.length) return undefined;

    const sections = hashItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return undefined;

    let rafId = 0;

    const updateActiveHash = () => {
      const marker = window.scrollY + 140;
      let currentHash = hashItems[0].href;

      sections.forEach((section) => {
        if (section.offsetTop <= marker) {
          currentHash = `#${section.id}`;
        }
      });

      setActiveHash(currentHash);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        updateActiveHash();
        rafId = 0;
      });
    };

    updateActiveHash();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveHash);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveHash);
    };
  }, [hashItems]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-5">
          <img
            src={logo}
            alt="IM Estratégia e Gestão"
            className="h-16 w-auto object-contain"
          />
          <div className="leading-tight">
            <div className="text-base tracking-wide text-slate-500">Estratégia e Gestão</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.href}
                to={item.href}
                className="group relative text-sm font-semibold text-slate-950"
              >
                {item.label}
                <span className="absolute top-full left-1/2 mt-1 h-[2px] w-full -translate-x-1/2 bg-slate-950" />
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className={`group relative text-sm font-medium transition hover:text-slate-950 ${
                  activeHash === item.href ? "text-slate-950" : "text-slate-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute top-full left-1/2 mt-1 h-[2px] -translate-x-1/2 rounded-full bg-slate-900 transition-[width,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeHash === item.href
                      ? "w-full opacity-100 blur-0"
                      : "w-0 opacity-0 blur-[0.5px] group-hover:w-full group-hover:opacity-100 group-hover:blur-0"
                  }`}
                />
              </a>
            )
          )}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 md:inline-flex"
        >
          Agendar conversa
        </a>
      </div>
    </header>
  );
}
