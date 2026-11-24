# Sprint 04 — AEO, GEO e estrutura de recuperação

## Entregáveis

- 36 perguntas/respostas em 18 Insights e 10 nas cinco páginas de tema; conteúdo original de síntese baseado nos artigos existentes, sem alterar seus textos, imagens, autoria ou data. 20 conceitos com definições e links contextualizados; glossário em uma página, com âncoras persistentes e dados estruturados DefinedTerm/DefinedTermSet. Artigos e temas referenciam conceitos exibidos.
- Geração estática e sitemap com 27 páginas; sem novas dependências, DNS ou alterações de produção. As páginas de políticas retiradas na Sprint 03 permanecem ausentes.
- AEO/GEO não são garantia de ranqueamento, resultados enriquecidos ou citações. Perguntas e respostas visíveis não recebem FAQPage artificial: não há promessa de rich results.

## Rastreabilidade e treinamento

O robots.txt do repositório permite acesso genérico, mas o arquivo efetivamente servido em produção inclui diretivas gerenciadas pela Cloudflare: `search=yes,ai-train=no,use=reference` e bloqueio explícito de GPTBot e outros rastreadores de treinamento. A decisão sobre treinamento é independente da descoberta em pesquisa; não alterar essa configuração sem decisão expressa.

Diagnóstico HTTP de `/insights` por cabeçalho User-Agent em 24/11/2026: Googlebot 200, Bingbot 200, OAI-SearchBot 200 e PerplexityBot 403. Esses são testes de resposta a cabeçalhos, não visitas de rastreadores autenticados/verificados. O 403 exige inspeção do AI Crawl Control e dos eventos de segurança no painel Cloudflare antes de qualquer decisão sobre regras específicas. Não modificar nem desativar proteções da zona. Não criar llms.txt nesta sprint: experimental, sem requisito comprovado para os recursos de IA do Google.

## Linha de base — 24/11/2026

30 consultas padronizadas, em português, sem marca, seis por domínio. Consulta realizada na ferramenta de busca web disponível nesta sessão, com até cinco resultados solicitados por consulta. O domínio IM não apareceu no conjunto retornado em 30/30 consultas (0/30 com presença). Os domínios a seguir são exemplos efetivamente retornados; a amostra pode ser incompleta e não representa posições universais. Não confundir busca web com respostas generativas ou com dados do Google Search Console.

| ID | Domínio temático | Pergunta padronizada | IM nos resultados retornados | Exemplos de domínios retornados |
|---|---|---|---|---|
| 01 | estrategia | Como transformar planejamento estratégico em execução real empresas | Não | ufal.br, blog.auddas.com, sebrae.com.br |
| 02 | estrategia | O que é planejamento estratégico empresarial | Não | meuatendimento.sebrae.com.br, sebrae.com.br, bibliotecas.sebrae.com.br |
| 03 | estrategia | Como escolher indicadores de desempenho KPIs | Não | www.serasaexperian.com.br, www.gov.br, canal.cecierj.edu.br |
| 04 | estrategia | Como integrar planejamento estratégico e orçamento | Não | www.treasy.com.br, bidconsultoria.com, www.repositorio.mar.mil.br |
| 05 | estrategia | Como estruturar planejamento estratégico 2027 | Não | www.gov.br, idhan.com.br, www.treasy.com.br |
| 06 | estrategia | Como funciona Balanced Scorecard na gestão empresarial | Não | bvsms.saude.gov.br, www.stj.jus.br, bdjur.stj.jus.br |
| 07 | governanca | Como estruturar governança corporativa sem burocracia empresas | Não | www.gov.br, www.bureausapientia.com.br, www.cbl.org.br |
| 08 | governanca | Qual diferença entre governança e gestão empresarial | Não | www.gov.br |
| 09 | governanca | Como elaborar matriz de riscos empresariais | Não | www.gov.br, cage.fazenda.rs.gov.br |
| 10 | governanca | Como estabelecer controles internos proporcionais aos riscos | Não | www.gov.br, www.bcb.gov.br |
| 11 | governanca | Como governar dados e inteligência artificial | Não | www.gov.br |
| 12 | governanca | Como preparar empresas para choques externos e resiliência | Não | www.itau.com.br, www.ajg.com, www.ey.com |
| 13 | processos | Como melhorar eficiência operacional e redesenhar processos empresas | Não | cdn.cade.gov.br, www.stj.jus.br, siseb.sp.gov.br |
| 14 | processos | O que é BPM gestão por processos | Não | www.gov.br |
| 15 | processos | Como aplicar Lean Management na empresa | Não | www.lean.org.br, blog.rn.sebrae.com.br |
| 16 | processos | Como implementar melhoria contínua em processos | Não | www.mg.gov.br, www.gov.br, www.manaus.am.gov.br |
| 17 | processos | Por que redesenhar processos antes de automatizar | Não | www.stj.jus.br, transparencia.stj.jus.br, stj.jus.br |
| 18 | processos | Quais indicadores medem eficiência operacional | Não | www.gov.br, www.stj.jus.br |
| 19 | digital | Qual a diferença digitalização transformação digital organizações | Não | www.sap.com, www.microsoft.com, www.gov.br |
| 20 | digital | Como alinhar estratégia digital e negócio | Não | sebrae.com.br, ci.fdc.org.br, ead4.fgv.br |
| 21 | digital | Como preparar competências profissionais para inteligência artificial | Não | www.gov.br, www.pearson.com, cead.uesb.br |
| 22 | digital | Como tomar decisões orientadas por dados | Não | www.gov.br, triundigital.com.br, mitsloanreview.com.br |
| 23 | digital | Como medir resultados de transformação digital | Não | www.gov.br, www.ibm.com, www.mckinsey.com |
| 24 | digital | Como estabelecer supervisão humana de sistemas de IA | Não | eur-lex.europa.eu, legis.senado.leg.br |
| 25 | lideranca | Como liderança cultura gestão da mudança influenciam empresas | Não | www.prosci.com, www.scielo.br, base.ohub.com.br |
| 26 | lideranca | Como liderar em ambientes de incerteza | Não | hbr.org, www.gohuman.com.br |
| 27 | lideranca | Como medir produtividade em diferentes modelos de trabalho | Não | www.gov.br, www.serasaexperian.com.br, www.ibm.com |
| 28 | lideranca | Como transformar cultura organizacional | Não | vocerh.abril.com.br, kairamcabral.com.br, growthnetwork.com.br |
| 29 | lideranca | Como desenvolver talentos e competências organizacionais | Não | www.manpowergroup.com.br, base.ohub.com.br, www.uniasselvi.com.br |
| 30 | lideranca | Como acompanhar adoção de mudanças organizacionais | Não | www.gov.br, www.heflo.com, learn.microsoft.com |

### Motores generativos

ChatGPT Search, Google AI Overviews, AI Mode, Copilot, Perplexity e Gemini: não medidos diretamente nesta execução. Ausência de dado não equivale a zero citações. Repetir as mesmas 30 perguntas em cada plataforma efetivamente acessível, em sessão sem histórico/personalização quando possível; registrar data, plataforma, pergunta, resposta com fontes, menção, URL citada e outras fontes. Classificar como não medido quando não houver acesso ou funcionalidade. Não contar mera referência sem link como citação com link. Comparar proporção de consultas com menção/citação, páginas únicas e fontes recorrentes, com tamanho da amostra explícito; estabelecer linha de base pós-publicação em janela equivalente.

### Fontes técnicas

- [Google — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [OpenAI — crawlers](https://developers.openai.com/api/docs/bots)
- [Cloudflare — managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Cloudflare — AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
- [Schema.org — DefinedTermSet](https://schema.org/DefinedTermSet)
- [Aggarwal et al. — GEO (KDD 2024)](https://arxiv.org/abs/2311.09735)
- [Bing — AI Performance preview](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/)

Publicação em produção depende de autorização expressa.
