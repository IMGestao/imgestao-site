export const CONTACT_EMAIL = "contato@imgestao.com.br";
export const institutionalPages = [
  { path: "/sobre-a-im", title: "Sobre a IM Estratégia e Gestão", description: "Conheça o posicionamento, as áreas de atuação, a abordagem de trabalho e a autoria institucional da IM Estratégia e Gestão.", type: "AboutPage" },
  { path: "/politica-editorial", title: "Política editorial", description: "Princípios de produção, fundamentação, autoria, transparência e atualização dos Insights da IM Estratégia e Gestão.", type: "WebPage" },
  { path: "/politica-de-correcoes", title: "Política de correções e atualizações", description: "Como comunicar possíveis erros e como a IM orienta a análise, correção e atualização de seus conteúdos.", type: "WebPage" },
];
export const getInstitutionalPage = path => institutionalPages.find(page => page.path === path);
export function correctionMailto(slug = "") {
  const subject = slug ? `Sugestão de correção: ${slug}` : "Sugestão de correção editorial";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
