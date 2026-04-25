const WebSocket = require("ws");
const express = require("express");

const app = express();

let cache = {};

const ws = new WebSocket("wss://super-duper-parakeet-production.up.railway.app/ws");

ws.on("open", () => {
    console.log("WS conectado");
});

ws.on("message", (data) => {
    try {
        const json = JSON.parse(data.toString());
        cache = json;
    } catch {
        console.log("mensaje raro:", data.toString());
    }
});

app.get("/http", (req, res) => {
    res.json(cache);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server corriendo"));
