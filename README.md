# PokéShadow — Shadow Quiz

Projeto acadêmico de Front End com HTML, CSS e JavaScript puro. O jogador identifica 10 Pokémon pelas silhuetas, recebe feedback com explicação e link para saber mais, acompanha a pontuação e vê um ranking da sessão.

## Arquivos

- `index.html` — estrutura das telas.
- `style.css` — visual responsivo escuro, roxo e vermelho.
- `script.js` — perguntas, alternativas, pontuação, feedback e ranking.

## Como executar no Visual Studio Code

1. Baixe e extraia o ZIP.
2. Abra a pasta `poke-shadow-quiz` no Visual Studio Code.
3. Instale a extensão **Live Server** (Ritwick Dey), se ainda não tiver.
4. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.
5. O quiz será aberto no navegador. A conexão com a internet é necessária para carregar os sprites e as fontes externas.

Também é possível abrir `index.html` diretamente no navegador, mas Live Server é recomendado para desenvolvimento.

## Como publicar no GitHub Pages

1. Entre no GitHub e crie um repositório público, por exemplo `poke-shadow-quiz`.
2. Envie `index.html`, `style.css`, `script.js` e `README.md` para a raiz do repositório.
3. No repositório, entre em **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/(root)` e clique em **Save**.
6. Aguarde o GitHub publicar e abra a URL exibida na página de Pages.

## Requisitos do documento atendidos no Front End

- Nome do jogador antes de começar.
- Uma pergunta por vez e uma resposta correta por pergunta.
- Pontuação final baseada nos acertos.
- Ranking dos resultados da sessão via `sessionStorage`.
- Opção de jogar novamente.
- Alternativa pode ser trocada antes de confirmar; não há bloqueio após o primeiro clique de seleção.
- Feedback imediato, explicação e link para fonte.
- Interface responsiva, navegação por teclado, foco visível e feedback que não depende só de cor.
- HTML, CSS e JavaScript sem frameworks.

## Observação importante sobre Postgres e API

O documento da disciplina também lista **Postgres** como restrição e diz como premissa que a API com perguntas e respostas estaria disponível. Este pacote implementa a parte de Front End e mantém as 10 perguntas em um array no `script.js`, então ele funciona como protótipo estático e pode ser hospedado no GitHub Pages.

**GitHub Pages não executa um servidor e não hospeda um banco PostgreSQL.** Para integrar um Postgres real, é necessário um backend/API separado (por exemplo, uma aplicação hospedada em um serviço que aceite servidor e banco). O navegador faria requisições HTTP à API; a API consultaria o Postgres. Nunca coloque senha, usuário ou credenciais do banco dentro do JavaScript público.

Antes de entregar, confirme com a professora/equipe se o requisito Postgres precisa estar integrado nesta etapa ou se a equipe fornecerá uma API. Se a integração real for exigida, este protótipo precisará ser conectado à API disponibilizada pela equipe.

## Imagens e propriedade intelectual

Os sprites são carregados externamente a partir do repositório público de sprites do projeto PokeAPI. A disponibilidade dos links depende do serviço externo. Pokémon e seus personagens pertencem aos respectivos titulares. Este é um projeto educacional, não oficial.
