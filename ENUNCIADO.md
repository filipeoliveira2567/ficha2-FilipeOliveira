# Ficha 2 — O meu primeiro servidor

**Redes de Comunicação · Módulo 5**

Vais construir um servidor que responde a várias páginas. Nenhuma delas existe
em ficheiro: são todas fabricadas no momento em que alguém as pede.

Tarefas **1 a 6** são obrigatórias. **7 e 8** são extra, se chegares lá.

---

## Antes de começar

1. Cria um ficheiro novo na tua pasta chamado **`servidor.js`**.
2. Abre o terminal **nessa pasta**.
3. Confirma que tens Node: escreve `node -v`. Tem de aparecer um número.

Duas coisas que te vão poupar meia hora de frustração:

- **O Node não recarrega sozinho.** Sempre que mudas o código: `Ctrl+C` no
  terminal e corre outra vez com `node servidor.js`. Se te esqueceres, vais
  jurar que o código não funciona.
- **Se o browser ficar a rodar para sempre**, esqueceste-te do `res.end()`.
  Não é um erro, é o browser à espera de uma resposta que nunca chega.

O ponto de partida (escreve isto e confirma que funciona antes de avançar):

```js
const http = require("http");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Funciona</h1>");
});

server.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});
```

Corre com `node servidor.js` e abre `http://localhost:3000`.
Se vires **Funciona** em grande, estás pronto.

---

## Tarefa 1 — A página de início

Faz com que o endereço `/` responda uma página de apresentação da tua coleção.
Tem de ter um título (`<h1>`) e pelo menos um parágrafo.

Precisas de olhar para o `req.url` e decidir:

```js
if (req.url === "/") {
  // responde aqui
  return;
}
```

> **Está feito quando:** `http://localhost:3000/` mostra a tua página.

---

## Tarefa 2 — A página "sobre"

Acrescenta o endereço `/sobre`, com o **teu nome** e a **tua turma**.

> **Está feito quando:** `/` e `/sobre` mostram páginas diferentes,
> e o `/sobre` tem lá o teu nome.

---

## Tarefa 3 — As cartas vêm de um array

Cria, **fora** do `createServer` (lá em cima, ao pé do `PORT`), um array com
pelo menos **cinco** cartas. Inventa as tuas:

```js
const cards = [
  { name: "Dragão de Cobalto", type: "Criatura", attack: 7, defense: 5 },
  { name: "Guardiã das Marés", type: "Criatura", attack: 4, defense: 8 },
  // ... mais três
];
```

Agora cria o endereço `/cartas`, que mostra **todas** numa lista `<ul>`.

⚠️ **Não escrevas os `<li>` à mão.** Se acrescentares uma carta ao array, a
página tem de mudar sozinha. Se tiveres de ir editar o HTML, não fizeste esta
tarefa.

*Pista:* `.map()` transforma cada carta num pedaço de HTML, e `.join("")` cola
os pedaços todos numa string só.

```js
const items = cards.map(card => `<li>${card.name}</li>`).join("");
```

> **Está feito quando:** acrescentas uma carta ao array, reinicias o servidor,
> e ela aparece na página sem teres tocado no HTML.

---

## Tarefa 4 — A contagem

Na página de início, mostra quantas cartas tens.

⚠️ O número **não pode estar escrito à mão**. Tem de vir do array.

> **Está feito quando:** apagas uma carta do array e o número na página
> de início desce sozinho.

---

## Tarefa 5 — A hora

Cria o endereço `/agora`, que mostra a data e a hora **do momento em que a
página foi pedida**.

```js
const now = new Date().toLocaleString("pt-PT");
```

Carrega F5 várias vezes. Os segundos têm de mudar.

> **Está feito quando:** cada F5 mostra uma hora diferente.
>
> **Pensa nisto:** um ficheiro `.html` guardado no disco nunca conseguiria
> fazer isto. É esta a diferença entre estático e dinâmico.

---

## Tarefa 6 — O 404 (a mais importante)

Visita `http://localhost:3000/batatas`. Neste momento, ou não responde nada,
ou responde uma das tuas páginas.

Faz com que qualquer endereço que não conheças responda uma página de erro.
Põe esse código **no fim**, a seguir a todos os `if`, **sem `if` nenhum** — se
a execução chegou ali, é porque nada bateu certo.

⚠️ **O status code tem de ser 404, não 200.** É aqui que quase toda a gente
erra. Uma página que diz "não encontrado" mas responde 200 está a dizer ao
browser que correu tudo bem.

```js
res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
```

**Como confirmar:** F12 → separador **Network** → F5 → clica no pedido.
O número tem de aparecer **404, a vermelho**. Se estiver 200, não está feito.

⚠️ Não escrevas mais nada a seguir a este `res.end()`. Se responderes duas
vezes ao mesmo pedido, o servidor rebenta e morre.

> **Está feito quando:** o Network tab mostra 404 em `/batatas` e 200 em `/`.

---

## Antes de considerares terminado

Confirma as seis, uma a uma, com o Network tab aberto:

- [ ] `/` mostra a minha página de início — **200**
- [ ] `/sobre` tem o meu nome e a minha turma — **200**
- [ ] `/cartas` lista as cartas todas, geradas a partir do array — **200**
- [ ] A contagem na página inicial vem do `cards.length`
- [ ] `/agora` muda a cada F5 — **200**
- [ ] `/batatas` dá erro — **404**
- [ ] Acrescentei uma carta ao array e a página mudou sozinha
- [ ] O servidor não morreu nem encravou nenhuma vez

---

## Extra 7 — Uma carta à sorte

Cria `/cartas/aleatoria`, que mostra **uma** carta escolhida ao acaso, com o
nome, o tipo, o ataque e a defesa. Cada F5 mostra outra.

```js
const card = cards[Math.floor(Math.random() * cards.length)];
```

---

## Extra 8 — O mesmo, com Express

Copia o teu `servidor.js` para um ficheiro novo, `servidor-express.js`, e
reescreve-o usando Express. **O resultado tem de ser exactamente igual** —
as mesmas páginas, os mesmos status codes.

Instalar (uma vez só, **na tua pasta**):

```
npm init -y
npm install express
```

O molde:

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Início</h1>");
});

// ... as outras rotas

// sem caminho e NO FIM: apanha tudo o que sobrou
app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

Repara no que desapareceu: o `writeHead`, o `return` no fim de cada `if`, e o
404 deixou de ser um caso especial. O Express não faz nada que tu não tenhas
feito à mão — só te poupa escrever as mesmas linhas em todas as rotas.

> **Confirma no Network tab que os status codes continuam os mesmos.**
> Se o 404 passou a 200, a rota de trás não está onde devia.

---

## Se encravares

| O que vês | O que é | O que fazer |
|---|---|---|
| Mudei o código e não mudou nada | o Node não recarrega sozinho | `Ctrl+C` e correr outra vez |
| O browser fica a rodar para sempre | falta o `res.end()` nesse caminho | responde e faz `return` |
| `EADDRINUSE` | já tens um servidor a correr | `Ctrl+C` na outra janela do terminal |
| `Cannot find module 'express'` | instalaste fora da tua pasta | `npm install express` **dentro** da pasta certa |
| O servidor morreu de repente | respondeste duas vezes ao mesmo pedido | lê o erro no terminal e tira o segundo `res` |
| Todas as páginas mostram o mesmo | falta o `return` a seguir ao `res.end()` | põe `return` no fim de cada `if` |

Se estiveres preso mais de cinco minutos no mesmo sítio, chama.
