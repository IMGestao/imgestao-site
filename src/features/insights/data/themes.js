// Single source of truth for thematic routes, editorial relationships and metadata.
export const themes = [
  {
    slug: "estrategia-empresarial", title: "Estratégia empresarial",
    description: "Como transformar escolhas estratégicas em prioridades, indicadores e resultados sustentáveis.",
    definition: "Estratégia empresarial é o conjunto de escolhas que define onde a organização pretende competir, como pretende gerar valor e quais capacidades precisa desenvolver. Ela se concretiza quando decisões, recursos e responsabilidades convergem para objetivos comuns.",
    sections: [
      { title: "Direcionamento e escolhas", text: "O planejamento começa pela compreensão do contexto, das restrições e das alternativas. Escolher prioridades implica explicitar também o que não será feito, evitando uma carteira de iniciativas maior que a capacidade de execução." },
      { title: "Desdobramento e acompanhamento", text: "Objetivos precisam de indicadores, responsáveis e metas coerentes. Ritos de revisão permitem confrontar resultados com hipóteses, ajustar prioridades e alocar investimentos de acordo com as evidências disponíveis." },
      { title: "Aplicação na gestão", text: "Conecte o planejamento ao orçamento e à operação. Examine periodicamente se os projetos contribuem para os objetivos, se os indicadores sinalizam progresso e se as decisões têm responsáveis e prazos claros." },
    ],
    concepts: ["Planejamento estratégico", "Execução da estratégia", "Indicadores de desempenho", "Priorização de investimentos"],
    service: "Estratégia e Direcionamento", serviceIndex: 0,
    articles: ["planejamento-estrategico-empresas", "indicadores-de-desempenho-kpis", "modelo-de-gestao-empresarial", "orcamento-priorizacao-investimentos", "planejamento-estrategico-2027"],
    related: ["governanca-corporativa", "excelencia-operacional"],
  },
  {
    slug: "governanca-corporativa", title: "Governança corporativa",
    description: "Estruturas de decisão, responsabilidade, controles e gestão de riscos para organizações mais resilientes.",
    definition: "Governança corporativa compreende estruturas, responsabilidades e mecanismos pelos quais uma organização é dirigida, supervisionada e presta contas. Seu propósito é apoiar decisões responsáveis e alinhar interesses, riscos e resultados.",
    sections: [
      { title: "Direitos de decisão e responsabilidades", text: "Distribua atribuições de forma explícita entre instâncias de direção, gestão e operação. Defina matérias reservadas, critérios de escalonamento e informações necessárias para que a decisão ocorra no nível apropriado." },
      { title: "Riscos e controles", text: "Identifique eventos que podem comprometer objetivos, avalie exposição e defina respostas proporcionais. Controles úteis são aqueles incorporados à operação, com responsáveis definidos e evidência de funcionamento." },
      { title: "Governança de dados e tecnologia", text: "A qualidade das decisões depende de dados confiáveis, critérios de acesso e responsabilidades claras ao longo do ciclo de vida da informação. A governança deve integrar esses elementos aos ritos de gestão existentes." },
    ],
    concepts: ["Governança empresarial", "Gestão de riscos", "Controles internos", "Governança de dados"],
    service: "Governança e Gestão", serviceIndex: 1,
    articles: ["governanca-corporativa-na-pratica", "governanca-dados-ia", "riscos-resiliencia-empresarial"],
    related: ["estrategia-empresarial", "transformacao-digital"],
  },
  {
    slug: "excelencia-operacional", title: "Processos e excelência operacional",
    description: "Gestão por processos, melhoria contínua e automação orientadas à entrega de valor e à eficiência.",
    definition: "Excelência operacional é a capacidade de entregar valor de forma consistente por meio de processos confiáveis, eficientes e continuamente aperfeiçoados. O foco recai sobre o fluxo de ponta a ponta, e não apenas sobre tarefas isoladas.",
    sections: [
      { title: "Compreender o fluxo de valor", text: "Mapeie entradas, saídas, interfaces e necessidades dos clientes do processo. Diferencie atividades que agregam valor de esperas, retrabalho e etapas que criam complexidade sem melhorar a entrega." },
      { title: "Melhoria baseada em evidências", text: "Estabeleça uma linha de base de desempenho, identifique causas e teste mudanças em escala adequada. Acompanhe qualidade, tempo, custo e previsibilidade em conjunto para evitar ganhos locais que prejudiquem o resultado global." },
      { title: "Automatizar processos redesenhados", text: "Antes de automatizar, examine regras, exceções e dependências. A tecnologia deve simplificar a execução e melhorar a visibilidade, sem perpetuar desperdícios ou controles redundantes." },
    ],
    concepts: ["Gestão por processos", "BPM", "Lean e melhoria contínua", "Automação de processos"],
    service: "Transformação Organizacional", serviceIndex: 2,
    articles: ["eficiencia-operacional", "automacao-redesenho-processos"],
    related: ["estrategia-empresarial", "transformacao-digital"],
  },
  {
    slug: "transformacao-digital", title: "Transformação digital",
    description: "Tecnologia, dados, inteligência artificial e inovação como capacidades integradas à estratégia e à gestão.",
    definition: "Transformação digital é a mudança coordenada de capacidades organizacionais, processos e modelos de trabalho apoiada por tecnologias digitais. A aquisição de ferramentas, isoladamente, não caracteriza transformação: o valor depende de seu uso e dos resultados gerados.",
    sections: [
      { title: "Estratégia antes da tecnologia", text: "Parta dos problemas e oportunidades de negócio. Priorize iniciativas com hipóteses de valor explícitas, responsabilidades e critérios de avaliação, considerando as dependências técnicas e organizacionais." },
      { title: "Dados e inteligência artificial", text: "Dados devem ser tratados como ativos sujeitos a critérios de qualidade, segurança e uso responsável. A adoção de inteligência artificial exige atenção às limitações dos modelos, à supervisão humana e às competências das equipes." },
      { title: "Decisões e transformação contínua", text: "Combine indicadores e julgamento gerencial para avaliar efeitos reais. A aprendizagem decorrente de pilotos, integração de sistemas e mudanças de processo pode orientar a expansão gradual das iniciativas digitais." },
    ],
    concepts: ["Estratégia digital", "Inteligência artificial", "Gestão de dados", "Decisão baseada em evidências"],
    service: "Tecnologia, Dados e Performance", serviceIndex: 3,
    articles: ["transformacao-digital-origem-e-significado", "ia-competencias-profissionais", "decisao-orientada-dados"],
    related: ["governanca-corporativa", "excelencia-operacional"],
  },
  {
    slug: "desenvolvimento-organizacional", title: "Liderança e desenvolvimento organizacional",
    description: "Cultura, liderança, gestão da mudança e competências para sustentar a evolução das organizações.",
    definition: "Desenvolvimento organizacional é a evolução deliberada de capacidades, comportamentos e estruturas de trabalho para melhorar a efetividade da organização. Liderança, cultura e aprendizagem são elementos interdependentes desse processo.",
    sections: [
      { title: "Liderança em ambientes de mudança", text: "Liderar mudanças envolve estabelecer direção, comunicar escolhas e criar condições para a equipe agir. Em cenários incertos, explicitar hipóteses e estabelecer ciclos de revisão ajuda a preservar coerência sem limitar a adaptação." },
      { title: "Cultura e comportamento", text: "A cultura se manifesta nas decisões cotidianas, nos incentivos e nas práticas compartilhadas. Transformá-la requer consistência entre o comportamento das lideranças, as rotinas de trabalho e os resultados esperados." },
      { title: "Competências e aprendizagem", text: "Relacione as competências exigidas pela estratégia às oportunidades de desenvolvimento. Acompanhe o desempenho pelo valor entregue, considerando colaboração, autonomia e a capacidade de aprender diante de novas necessidades." },
    ],
    concepts: ["Liderança", "Cultura organizacional", "Gestão da mudança", "Futuro do trabalho"],
    service: "Transformação Organizacional", serviceIndex: 2,
    articles: ["transformacao-organizacional-como-fazer", "lideranca-incerteza", "produtividade-modelos-trabalho", "cultura-gestao-mudanca", "relacoes-trabalho-talentos"],
    related: ["estrategia-empresarial", "transformacao-digital"],
  },
];

export const themePath = theme => `/temas/${theme.slug}`;
export const getTheme = slug => themes.find(theme => theme.slug === slug);
export const isPublished = article => !article.edicaoRetroativa || Boolean(article.dataPublicacao);
export const getArticleTheme = article => themes.find(theme => theme.articles.includes(article?.slug));
export const getThemeArticles = (theme, articles) => articles.filter(article => isPublished(article) && getArticleTheme(article)?.slug === theme.slug);
