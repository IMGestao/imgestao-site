# Fluxo de desenvolvimento, homologação e publicação

## Ambientes

- Desenvolvimento: branch de trabalho criada a partir da versão atual de `main`, com prefixo `feature/`, `fix/`, `editorial/` ou `governanca/`.
- Homologação: Pull Request (PR) para `main`, verificações do GitHub Actions e preview da Cloudflare Pages, quando habilitado.
- Produção: somente `main`, publicada em https://imgestao.com.br pela integração existente com Cloudflare Pages.

## Procedimento obrigatório

1. Definir escopo e critérios de aceite. Atualizar a base com a versão de `main`.
2. Criar branch de trabalho. Nunca alterar `main` diretamente, inclusive em atividades realizadas por IA.
3. Implementar e revisar as diferenças. Executar `npm ci`, `npm run lint` e `npm run build`. Corrigir falhas antes de prosseguir.
4. Abrir PR para `main` com descrição, evidências e riscos. Verificar resultado das validações e abrir o preview da Cloudflare.
5. Homologar visualmente a homepage, navegação, Insights, artigos, links, responsividade, metadados e demais componentes afetados.
6. Obter autorização explícita do responsável pela publicação. A IA não integra alterações à `main` por iniciativa própria.
7. Integrar o PR aprovado. Acompanhar o deploy da Cloudflare e verificar o domínio oficial.
8. Registrar PR, commit, implantação e resultado. Se houver regressão, avaliar rollback pela Cloudflare e reverter as alterações no GitHub mediante autorização, preservando a consistência do código.

## Configurações a confirmar no painel

- GitHub: proteger `main`, exigir PR e aprovação do responsável (quando houver revisor distinto do autor), exigir CI verde, impedir force-push e exclusão da branch. Restringir bypass conforme a política do proprietário.
- Cloudflare Pages: produção em `main`; preview para branches de trabalho; configuração de build `npm run build`, saída `dist`. Verificar proteção de acesso a previews se houver conteúdo não público.
- Não alterar DNS ou domínio oficial para realizar homologações.
- Não incluir segredos, dados pessoais ou arquivos sensíveis no repositório público, no preview ou nos logs. Usar permissões mínimas e revisão humana.

## Checklist de aceite

- [ ] Escopo e alterações revisados.
- [ ] Lint e build concluídos com sucesso.
- [ ] Preview homologado.
- [ ] Responsividade, navegação e conteúdo aprovados.
- [ ] Aprovação explícita para produção registrada.
- [ ] Deploy confirmado e domínio oficial validado.
- [ ] Plano de reversão identificado.
