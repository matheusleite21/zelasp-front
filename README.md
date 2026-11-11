# ZelaSP · Front-end

**Zeladoria colaborativa para São Paulo**: o cidadão registra problemas de rua (buraco, poste, árvore, entulho, calçada, sinalização), descobre se alguém já registrou o mesmo problema e acompanha uma linha do tempo pública até a resolução.
Global Solution 2026/2 · CitizenTech · FIAP · Front-End Design Engineering

## Objetivo
SPA em React que consome a API REST Java do ZelaSP (Domain Driven Design Using Java) para cadastrar cidadãos, registrar ocorrências e mostrar o andamento publicado pela prefeitura, com interface responsiva e acessível.

## Links
| | |
|---|---|
| Site publicado (Vercel) | https://zelasp-front.vercel.app |
| Repositório (GitHub) | https://github.com/matheusleite21/zelasp-front |
| API Java (Render) | https://zelasp-api.onrender.com (Swagger: https://zelasp-api.onrender.com/swagger-ui.html) |
| Vídeo (YouTube) | https://youtu.be/gUFmMc0l9Ec |

## Tecnologias
- **React 19 + Vite 8 + TypeScript 7**
- **Tailwind CSS 4** (tema no `src/index.css`, sem `tailwind.config.js`)
- **React Router 8** (`createBrowserRouter`, rotas estáticas e dinâmicas)
- **React Hook Form** (validação dos formulários)
- **Context API** (cidadão ativo salvo no `localStorage`)
- **Fetch API** para as requisições (sem Axios)
- **oxlint** (lint) · **Vercel** (deploy)

## Páginas e rotas
| Rota | Página | API |
|---|---|---|
| `/` | Início (com números reais vindos da API) | GET /ocorrencias |
| `/sobre` | Sobre a solução e os ODS | — |
| `/faq` | Perguntas frequentes (acordeão) | — |
| `/contato` | Contato com formulário validado | — |
| `/integrantes` e `/integrantes/:rm` | Integrantes e detalhe (**rota dinâmica**) | — |
| `/cadastro` | Cadastro do cidadão | **GET** /bairros · **POST** /cidadaos · GET /cidadaos/{id} |
| `/ocorrencias` | Lista com filtros de status e bairro | **GET** /ocorrencias |
| `/ocorrencias/nova` | Registrar ocorrência (com aviso de duplicada, HTTP 409) | GET /categorias, /bairros · **POST** /ocorrencias |
| `/ocorrencias/:id` | Detalhe e linha do tempo (**rota dinâmica**) | GET /ocorrencias/{id} · GET /ocorrencias/{id}/atualizacoes |

## Estrutura de pastas
```
src/
├── components/   Header (menu mobile), Footer, Botao, CampoFormulario, Carregando, MensagemErro,
│                 ListaVazia, BadgeStatus, CardOcorrencia  (componentes reutilizáveis)
├── contexts/     CidadaoAtivoContext + Provider (useContext)
├── data/         integrantes e perguntas do FAQ
├── pages/        uma página por rota
├── services/     api.ts (fetch base com VITE_API_URL), cidadaos, ocorrencias, catalogo, formatacao
├── types/        interfaces TypeScript dos dados da API
├── App.tsx       layout (Header + Outlet + Footer)
└── main.tsx      rotas
```

## Como executar
Pré-requisitos: Node.js 20+ e a API Java rodando (local ou no Render).
```bash
npm install
cp .env.example .env      # no Windows: copy .env.example .env
# edite o .env:  VITE_API_URL=http://localhost:8081  (ou a URL do Render, sem barra no final)
npm run dev               # abre em http://localhost:5173
```
Outros comandos: `npm run build` (gera a versão de produção) · `npm run lint`.

**Na Vercel:** importe o repositório, mantenha o preset *Vite* e crie a variável de ambiente `VITE_API_URL` com a URL do Render. O `vercel.json` faz o fallback das rotas da SPA (abrir `/ocorrencias/6` direto funciona).

## Responsividade e acessibilidade
Testado em **390 × 844**, **768 × 1024** e **1440 × 900**, sem rolagem horizontal. Rótulos ligados aos campos, mensagens de erro anunciadas (`role="alert"`), foco visível, link "pular para o conteúdo", status com texto além da cor e menu mobile com `aria-expanded`.

## Integrantes (1TDSPO)
| Nome | RM | GitHub |
|---|---|---|
| Matheus Leite Souza das Virgens | 573416 | [matheusleite21](https://github.com/matheusleite21) |
| Matheus Ruiz Giatti | 570701 | [matheusruiz-07](https://github.com/matheusruiz-07) |

## Contato
Use a página [/contato](#) do site ou escreva para rm573416@fiap.com.br e rm570701@fiap.com.br.
