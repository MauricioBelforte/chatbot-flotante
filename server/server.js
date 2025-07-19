// server/server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/script", express.static(path.join(__dirname, "../script")));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Mi Sitio Web",
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct", // Gratuito y en español
            messages: [
                {
                    role: "system",
                    content: "Sos un asistente útil. Contestá en español. Limitate a responder sobre el sitio web. El sitio trata sobre el portfolio del Desarrollador Web Mauricio Belforte. En esta pagina econtraras sus trabajos mas importantes. Solo respondé cosas que estén relacionadas al sitio, sobre sus paginas y aplicaciones. Por ejemplo Toscanes",
                },
                {
                    role: "user",
                    content: userMessage,
                },
            ],
        }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Lo siento, no entendí.";
    res.json({ reply });
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
