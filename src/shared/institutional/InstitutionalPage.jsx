import { Link, useLocation } from "react-router-dom";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import SeoHead from "../seo/SeoHead";
import { getInstitutionalSeo } from "../seo/seoConfig.js";
import { CONTACT_EMAIL, getInstitutionalPage } from "./institutionalConfig.js";
import { themes, themePath } from "../../features/insights/data/themes.js";

function Section({ title, children }) {
  return <section className="border-b border-slate-200 pb-8"><h2 className="text-2xl font-semibold tracking-tight text-[#0b2038]">{title}</h2><div className="mt-4 space-y-4 text-base leading-8 text-slate-700">{children}</div></section>;
}

function About() {
  return <>
    <Section title="Quem somos"><p>A IM Estratégia e Gestão é uma consultoria voltada à integração entre estratégia, governança, gestão e transformação empresarial. Seu propósito é apoiar organizações na construção de uma direção clara e de condições consistentes de execução.</p><p>O acervo Insights complementa essa atuação com análises, conceitos e recomendações dirigidos a gestores, lideranças e profissionais interessados em desenvolver capacidades organizacionais.</p></Section>
    <Section title="Áreas de conhecimento"><p>A produção editorial se organiza em cinco domínios complementares, que conectam os desafios da gestão à prática empresarial.</p><ul className="grid gap-3 sm:grid-cols-2">{themes.map(theme => <li key={theme.slug} className="border border-slate-200 p-4"><Link className="font-semibold text-[#174b78] underline underline-offset-4" to={themePath(theme)}>{theme.title}</Link><p className="mt-2 text-sm leading-6">{theme.description}</p></li>)}</ul></Section>
    <Section title="Como atuamos"><p>A abordagem de consultoria articula diagnóstico, direcionamento, estruturação e implementação. O objetivo é estabelecer prioridades, responsabilidades e meios de acompanhar resultados, respeitando o contexto da organização.</p><a className="rd-text-link inline-block" href="/#metodologia">Conheça a metodologia de atuação</a><p>As soluções abrangem estratégia e direcionamento, governança e gestão, transformação organizacional, tecnologia, dados e performance.</p><a className="rd-text-link inline-block" href="/#atuacao">Conheça as soluções</a></Section>
    <Section title="Autoria institucional"><p>Os Insights são publicados sob a autoria institucional da IM Estratégia e Gestão, com análises e referências bibliográficas voltadas aos desafios da gestão empresarial.</p><Link className="rd-text-link inline-block" to="/insights">Explore o acervo de Insights</Link></Section>
    <Section title="Contato institucional"><p>Para conversar sobre consultoria, conteúdos e oportunidades de colaboração, escreva para <a className="underline text-[#174b78] inline-block max-w-full [overflow-wrap:anywhere]" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></Section>
  </>;
}

export default function InstitutionalPage() {
  const { pathname } = useLocation();
  const page = getInstitutionalPage(pathname.replace(/\/$/, ""));
  if (!page) return null;
  return <div className="rd-page">
    <SeoHead config={getInstitutionalSeo(page)} /><SiteHeader />
    <main>
      <section className="rd-hub-banner"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        <nav aria-label="Caminho de navegação" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-300"><Link to="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
        <p className="rd-kicker">Institucional</p><h1 className="rd-hub-title max-w-5xl">{page.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">{page.description}</p>
      </div></section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
        <div className="max-w-3xl space-y-9"><About /></div>
        <aside className="self-start border-t-4 border-[#174b78] bg-slate-50 p-6"><h2 className="text-xl font-semibold text-[#0b2038]">Conheça a IM</h2><nav aria-label="Informações institucionais" className="mt-4 space-y-3"><a href="/#atuacao" className="block border-b border-slate-200 pb-3 text-base font-medium text-[#174b78] hover:underline">Soluções</a><a href="/#metodologia" className="block border-b border-slate-200 pb-3 text-base font-medium text-[#174b78] hover:underline">Metodologia</a><Link to="/insights" className="block pt-2 text-base font-medium text-[#174b78] hover:underline">Central de Insights</Link><a href="/#contato" className="block pt-2 text-base font-medium text-[#174b78] hover:underline">Contato</a></nav></aside>
      </div>
    </main><SiteFooter />
  </div>;
}
