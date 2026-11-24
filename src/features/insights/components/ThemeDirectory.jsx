import { Link } from "react-router-dom";
import { getThemeArticles, themePath, themes } from "../data/themes.js";
import { publicacoes } from "../data/publicacoes.js";

export default function ThemeDirectory({ items = themes }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(theme => (
        <Link key={theme.slug} to={themePath(theme)} className="group flex h-full flex-col border border-slate-200 bg-white p-6 transition hover:border-[#174b78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#174b78]">
          <p className="rd-kicker">Tema de conhecimento</p>
          <h3 className="mt-3 text-xl font-semibold text-[#0b2038]">{theme.title}</h3>
          <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{theme.description}</p>
          <p className="mt-5 text-sm text-slate-600">{getThemeArticles(theme, publicacoes).length} artigos</p>
          <span className="rd-text-link mt-3">Explorar tema</span>
        </Link>
      ))}
    </div>
  );
}
