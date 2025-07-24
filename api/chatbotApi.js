// api/chatbotApi.js

import { chequearLimiteOpenRouter } from "../lib/estadoOpenRouter.js";
import { consultarModeloConOpenRouter } from "../lib/consultasModelos.js";

// 🔁 Función serverless que responde peticiones POST con un mensaje del modelo
export default async function handler(req, res) {
    // ⛔ Solo aceptamos POST (evita GET, PUT, etc.)
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    // 📝 Extraemos el mensaje enviado desde el frontend
    const { mensaje } = req.body;

    // 🧠 Sistema base para el bot (puede incluir rol, contexto, tono, etc.)
    const promptSistema = "Sos un bot técnico asistente";

    // 🔐 Validamos si OpenRouter está degradado por exceso de uso
    const estado = await chequearLimiteOpenRouter();

    if (estado.degradado) {
        // 🚧 Si está degradado, enviamos mensaje alternativo sin llamar al modelo
        return res.status(200).json({
            respuesta: "⚠️ Modelo OpenRouter degradado. Usando alternativa..."
        });
    }

    // 📡 Si está todo OK, consultamos al modelo normalmente
    const respuesta = await consultarModeloConOpenRouter(promptSistema, mensaje);

    // 📤 Devolvemos la respuesta generada al frontend
    res.status(200).json({ respuesta });
}