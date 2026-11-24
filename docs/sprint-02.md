# Sprint 02 — Arquitetura de conhecimento

## Escopo e governança

Cinco páginas temáticas estáticas, mantendo os 18 artigos e as 20 rotas anteriores. A publicação em produção depende de aprovação expressa do responsável pela IM. Nenhuma alteração de DNS, Cloudflare Rules ou dependências foi necessária.

## Taxonomia e manutenção

`src/features/insights/data/themes.js` centraliza os cinco domínios, suas definições, conceitos, serviço associado, slugs dos artigos e temas relacionados. Cada artigo possui um tema primário; as conexões secundárias são representadas pelas relações entre temas e pela seleção de artigos relacionados. O editor deve acrescentar o slug de cada novo artigo ao tema adequado. A validação bloqueia slugs duplicados, não classificados ou inexistentes.

| Tema | Artigos iniciais |
| --- | ---: |
| Estratégia empresarial | 5 |
| Governança corporativa | 3 |
| Processos e excelência operacional | 2 |
| Transformação digital | 3 |
| Liderança e desenvolvimento organizacional | 5 |

O diretório na central de Insights oferece descoberta por tema sem substituir a pesquisa e os filtros de categorias existentes. As páginas temáticas contêm definições, conceitos, aplicação, links para os artigos e conexão com as soluções existentes. Os artigos mantêm seu texto, autoria, datas e fotografias, acrescentando navegação temática.

## Metadados e indexação

O domínio canônico segue `https://imgestao.com.br`; URLs de artigos não foram alteradas. A geração estática inclui as cinco novas rotas e o sitemap é gerado a partir da mesma taxonomia. Cada página temática apresenta `CollectionPage`, `ItemList` e `BreadcrumbList`; os artigos referenciam a entidade `Thing` do tema com identificador persistente. Dados estruturados descrevem apenas informações exibidas.

## Validação

Executar `npm ci`, `npm run lint`, `npm run build` e `npm run test:seo`. O build valida 25 rotas estáticas, cobertura da taxonomia, sitemap, metadados canônicos, conteúdos relacionados e links bidirecionais. Validar também via HTTP no preview do PR, com resposta 200, HTML pré-renderizado, canonical oficial e ausência de redirecionamento para a produção. Manter as verificações da Sprint 01.

Referências técnicas: [Google Search Central — links rastreáveis](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) e [BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
