import { Link, useLocation } from "react-router-dom";
import SiteHeader from "../layout/SiteHeader";
import SiteFooter from "../layout/SiteFooter";
import SeoHead from "../seo/SeoHead";
import { getInstitutionalSeo } from "../seo/seoConfig.js";
import { CONTACT_EMAIL, correctionMailto, getInstitutionalPage } from "./institutionalConfig.js";
import { themes, themePath } from "../../features/insights/data/themes.js";

function Section({ title, children }) {
  return <section className="border-b border-slate-200 pb-8"><h2 className="text-2xl font-semibold tracking-tight text-[#0b2038]">{title}</h2><div className="mt-4 space-y-4 text-base leading-8 text-slate-700">{children}</div></section>;
}

function About() {
  return <>
    <Section title="Quem somos"><p>A IM Estratégia e Gestão é uma consultoria voltada à integração entre estratégia, governança, gestão e transformação empresarial. Seu propósito é apoiar organizações na construção de uma direção clara e de condições consistentes de execução.</p><p>O acervo Insights complementa essa atuação com análises, conceitos e recomendações dirigidos a gestores, lideranças e profissionais interessados em desenvolver capacidades organizacionais.</p></Section>
    <Section title="Áreas de conhecimento"><p>A produção editorial se organiza em cinco domínios complementares, que conectam os desafios da gestão à prática empresarial.</p><ul className="grid gap-3 sm:grid-cols-2">{themes.map(theme => <li key={theme.slug} className="border border-slate-200 p-4"><Link className="font-semibold text-[#174b78] underline underline-offset-4" to={themePath(theme)}>{theme.title}</Link><p className="mt-2 text-sm leading-6">{theme.description}</p></li>)}</ul></Section>
    <Section title="Como atuamos"><p>A abordagem de consultoria articula diagnóstico, direcionamento, estruturação e implementação. O objetivo é estabelecer prioridades, responsabilidades e meios de acompanhar resultados, respeitando o contexto da organização.</p><a className="rd-text-link inline-block" href="/#metodologia">Conheça a metodologia de atuação</a><p>As soluções abrangem estratégia e direcionamento, governança e gestão, transformação organizacional, tecnologia, dados e performance.</p><a className="rd-text-link inline-block" href="/#atuacao">Conheça as soluções</a></Section>
    <Section title="Autoria institucional"><p>Os Insights atualmente publicados identificam a IM Estratégia e Gestão como autora institucional. A identificação de autores ou revisores individuais deverá refletir sua contribuição efetiva, sem atribuição presumida de autoria.</p><p>Conheça os princípios que orientam a elaboração e a revisão do acervo em nossa <Link className="underline text-[#174b78]" to="/politica-editorial">política editorial</Link>.</p></Section>
    <Section title="Contato institucional"><p>Para conversar sobre consultoria, conteúdos e oportunidades de colaboração, escreva para <a className="underline text-[#174b78] break-all" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p></Section>
  </>;
}

function Editorial() {
  return <>
    <Section title="Propósito e público"><p>Os Insights buscam contribuir para decisões empresariais informadas. Devem oferecer clareza conceitual, contexto, evidências relevantes e implicações práticas para a gestão, evitando conteúdo meramente promocional ou produzido apenas para mecanismos de busca.</p></Section>
    <Section title="Critérios de pesquisa e fundamentação"><p>A seleção de fontes deve priorizar documentos oficiais, pesquisas acadêmicas, instituições reconhecidas e referências originais. As evidências devem ser interpretadas segundo seu contexto, qualidade, data e limitações.</p><p>Dados quantitativos, citações e afirmações factuais relevantes devem ser verificáveis. Análises, recomendações e hipóteses devem ser diferenciadas de fatos demonstrados. Referências são apresentadas ao final dos artigos, com links quando disponíveis.</p></Section>
    <Section title="Autoria, revisão e uso de tecnologia"><p>A autoria institucional identifica a organização responsável pelo conteúdo. Quando houver autor ou revisor individual identificado, sua contribuição e qualificação deverão ser correspondentes e verificáveis.</p><p>Ferramentas digitais e inteligência artificial podem apoiar pesquisa, estruturação e edição. Seus resultados não substituem a verificação das fontes, a avaliação crítica e a aprovação editorial. Não devem ser inventados dados, referências, credenciais ou experiências.</p></Section>
    <Section title="Padrão de publicação"><p>De acordo com a natureza de cada artigo, o padrão prevê título descritivo, resumo executivo, contextualização, fundamentação, análise, recomendações aplicáveis, autoria, informações de data e referências. O conteúdo deve ser apresentado de modo acessível e compreensível.</p><p>Publicações retrospectivas distinguem a data de referência da edição e a data efetiva de publicação. Alterações substantivas devem ser registradas com a data de atualização.</p></Section>
    <Section title="Independência e responsabilidade"><p>O conteúdo editorial deve preservar sua finalidade informativa, distinguir recomendações de promoção comercial e tornar explícitos eventuais interesses relevantes quando aplicáveis. As análises não substituem a avaliação específica da realidade de cada organização.</p><p>Informações passíveis de revisão podem ser contestadas pelo leitor. Consulte a <Link className="underline text-[#174b78]" to="/politica-de-correcoes">política de correções e atualizações</Link>.</p></Section>
  </>;
}

function Corrections() {
  return <>
    <Section title="Como comunicar uma inconsistência"><p>Se identificar uma informação incorreta, referência indisponível ou interpretação que necessite de esclarecimento, envie uma mensagem ao contato institucional.</p><ul className="list-disc space-y-2 pl-6"><li>Informe o título ou o endereço do artigo.</li><li>Identifique o trecho questionado e explique a inconsistência.</li><li>Quando possível, indique a evidência ou a fonte pertinente.</li></ul><a className="rd-button inline-flex" href={correctionMailto()}>Enviar sugestão de correção</a><p>Não é necessário enviar dados pessoais sensíveis ou informações confidenciais para comunicar um erro editorial.</p></Section>
    <Section title="Tratamento editorial"><p>A análise deve considerar a natureza da questão, a confiabilidade das evidências e o impacto sobre a interpretação do conteúdo. Quando houver erro material confirmado, a correção deverá ser incorporada ao texto com indicação adequada da alteração.</p><p>Pequenos ajustes ortográficos ou de formatação não exigem necessariamente uma nota de correção. Alterações substantivas de fatos, números ou conclusões deverão ser identificadas e datadas.</p></Section>
    <Section title="Atualizações e integridade"><p>Atualizações podem ocorrer quando surgirem novos dados, mudanças relevantes no contexto ou novas evidências. A revisão deve preservar a distinção entre a data original de publicação e a data da atualização, respeitando o histórico editorial.</p><p>Opiniões e interpretações divergentes serão avaliadas em função de sua fundamentação, sem presumir que toda divergência constitua erro factual.</p></Section>
    <Section title="Princípios relacionados"><p>Consulte a <Link className="underline text-[#174b78]" to="/politica-editorial">política editorial</Link> para compreender os critérios gerais de qualidade, transparência e fundamentação do acervo.</p></Section>
  </>;
}

export default function InstitutionalPage() {
  const { pathname } = useLocation();
  const page = getInstitutionalPage(pathname.replace(/\/$/, ""));
  if (!page) return null;
  const Content = page.path === "/sobre-a-im" ? About : page.path === "/politica-editorial" ? Editorial : Corrections;
  return <div className="rd-page">
    <SeoHead config={getInstitutionalSeo(page)} /><SiteHeader />
    <main>
      <section className="rd-hub-banner"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        <nav aria-label="Caminho de navegação" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-300"><Link to="/" className="hover:text-white">Home</Link><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
        <p className="rd-kicker">Institucional</p><h1 className="rd-hub-title max-w-5xl">{page.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">{page.description}</p>
      </div></section>
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:px-8">
        <div className="max-w-3xl space-y-9"><Content /></div>
        <aside className="self-start border-t-4 border-[#174b78] bg-slate-50 p-6"><h2 className="text-xl font-semibold text-[#0b2038]">Conheça a IM</h2><nav aria-label="Informações institucionais" className="mt-4 space-y-3">{["/sobre-a-im", "/politica-editorial", "/politica-de-correcoes"].map(path => <Link key={path} to={path} aria-current={path === page.path ? "page" : undefined} className="block border-b border-slate-200 pb-3 text-base font-medium text-[#174b78] hover:underline">{getInstitutionalPage(path).title}</Link>)}<Link to="/insights" className="block pt-2 text-base font-medium text-[#174b78] hover:underline">Central de Insights</Link></nav></aside>
      </div>
    </main><SiteFooter />
  </div>;
}
