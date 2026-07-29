# FOHAT Site

Projeto estático multipágina preparado para Vite e para sincronização com um projeto Lovable.

## Rotas

- `/` — Home institucional
- `/catalogo-de-locacao/` — Catálogo completo

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar versão de produção

```bash
npm run build
npm run preview
```

## Subir para o Lovable

1. Crie um projeto novo no Lovable.
2. No projeto, acesse `Settings → Connectors → GitHub`.
3. Conecte o projeto a um repositório GitHub criado pelo próprio Lovable.
4. Substitua os arquivos do repositório pelo conteúdo desta pasta.
5. Faça commit e push para a branch `main`.
6. Aguarde a sincronização no Lovable.
7. No Lovable, abra `Publish`, revise a URL e publique.

## Observações

- O catálogo e a home compartilham a seleção de equipamentos via `localStorage`.
- O botão de orçamento no catálogo retorna para a home com o briefing aberto.
- O WhatsApp ainda usa um número placeholder e deve ser substituído antes da publicação.
