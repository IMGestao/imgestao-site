export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <div>© {new Date().getFullYear()} IM Estratégia e Gestão. Todos os direitos reservados.</div>

          <div className="flex items-center gap-6">
            <a href="/#sobre" className="transition hover:text-slate-900">
              Sobre
            </a>
            <a href="/#contato" className="transition hover:text-slate-900">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
