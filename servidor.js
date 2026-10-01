const http = require("http");
const { type } = require("os");

const PORT = 3000;

const cards = [
    { name: "Dragao de Cobalto", type: "Criatura", attack: 7, defense: 5 },
    { name: "Guardia das Mares", type: "Criatura", attack: 4, defense: 8 },
    { name: "Dragao branco de olhos azuis", type: "Criatura", attack: 10, defense: 10},
    { name: "Pote da ganancia", type: "Criatura", attack: 0, defense: 8},
    { name: "Rei das espedas", type: "Criatura", attack: 6, defense: 6},
];

const cont = cards.length
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    if (req.url === "/agora") {
        const now = new Date().toLocaleString("pt-PT");
        res.end(`<h1>Tempo</h1><h2>${now}</h2><a href=http://localhost:${PORT}/>volta</a>`)
        return;
    }else if (req.url === "/cartas") {
        const items = cards.map(card => `<li>${card.name}</li>`).join("");
        res.end(`<h1>Cartas</h1><h2>${cont}</h2>${items}<a href=http://localhost:${PORT}/>volta</a>`)
        return;
    }else if(req.url === "/sobre") {
        res.end(`<h1>Filipe</h1><a href=http://localhost:${PORT}/>volta</a>`)
        return;
    }else if(req.url === "/") {
        res.end(`<h1>wehrt</h1><a href=http://localhost:${PORT}/sobre>sobre</a></br>
                <a href=http://localhost:${PORT}/cartas>cartas${cont}</a></br>
                <a href=http://localhost:${PORT}/agora>tempo</a>`)
        return;
    }
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<h1 style="color: red;">ERRO 404</h1>`);
});


server.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});