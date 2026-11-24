export const CONTACT_EMAIL = "contato@imgestao.com.br";
export const institutionalPages = [
  { path: "/sobre-a-im", title: "Sobre a IM Estratégia e Gestão", description: "Conheça o posicionamento, as áreas de atuação, a abordagem de trabalho e a autoria institucional da IM Estratégia e Gestão.", type: "AboutPage" },
];
export const getInstitutionalPage = path => institutionalPages.find(page => page.path === path);
