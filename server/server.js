// server/server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

import { proveedores } from './proveedores.js';
import { modelosPorProveedor } from './modelosPorProveedor.js';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/script", express.static(path.join(__dirname, "../script")));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    // Cargamos trabajos.json
    let trabajos = [];
    try {
        const trabajosRaw = await fs.readFile(path.join(__dirname, "trabajos.json"), "utf-8");
        trabajos = JSON.parse(trabajosRaw);
    } catch (err) {
        console.error("Error al cargar trabajos.json:", err);
    }



    let perfil = {};
    try {
        const perfilRaw = await fs.readFile(path.join(__dirname, "sobremi.json"), "utf-8");
        perfil = JSON.parse(perfilRaw);
    } catch (err) {
        console.error("Error al cargar sobremi.json:", err);
    }

    // Cargamos sobremi.json
    const keywords = ["hola", "datos", "edad", "años", "vive", "ciudad", "Belforte", "ubicacion", "mail",
        "ciudad", "pais", "provincia", "dedica", "trabaja", "trabajo", "creo", "hacer", "hace", "bueno",
        "mauricio", "quién sos", "quién es", "sobre vos", "sobre él", "profesion",
        "quién es mauricio", "perfil de mauricio", "contacto", "contactar",
        "email", "linkedin", "github"];

    const keywordsFormacion = [
        "formacion", "estudios", "estudia", "estudio", "academico", "carrera", "universidad", "tecnico", "electricidad", "electronica", "electricista",
        "técnico", "colegio", "escuela", "cursos", "capacitación", "recibio", "matematica", "fisica", "quimica",
        "educacion", "título", "certificado", "certificacion",
        "bootcamp", "fullstack", "codo a codo", "platzi", "react", "react.js", "alura",
        "desafío latam", "microsoft", "scrum", "mouredev", "curriculum"
    ];

    /*Este objetoTrabajo se lo declara aca para usar en el anteultimo else if, no tenia otra posibilidad por ahora */
    let objetoTrabajo;

    // Construimos un contexto a partir del mensaje del usuario
    let contexto = "";

    const mensaje = userMessage.toLowerCase();

    // Sobre trabajos
    if (mensaje.includes("trabajo") || mensaje.includes("proyecto")) {
        /*map crea un arreglo de strings, y a ese arreglo se convierte en un solo string con join */
        contexto = trabajos.map(trabajo => `- ${trabajo.titulo}: ${trabajo.descripcion}`).join("\n");
        /* console.log(contexto); */
        // Sobre tecnologías
    } else if (mensaje.includes("tecnolog")) {
        const techs = [...new Set(trabajos.flatMap(t => t.tecnologias))];
        contexto = `Tecnologías usadas por Mauricio Belforte: ${techs.join(", ")}`;
        /* console.log(contexto); */

        // Sobre Mauricio (nombre, experiencia, contacto, etc.)
    } else if (keywords.some(palabra => mensaje.toLowerCase().includes(palabra))) {
        contexto = `
        Nombre y Apellido: ${perfil.nombre}
        Edad: ${perfil.edad}
        Ubicación de ciudad, provincia y Pais: ${perfil.ubicacion}
        Profesión: ${perfil.profesion}
        Sobre Mauricio Belforte: ${perfil.descripcion}
        Tecnologías que sabe utilizar: ${perfil.tecnologias.join(", ")}
        Email: ${perfil.email}
        LinkedIn: ${perfil.linkedin}
        GitHub: ${perfil.github}
            `;
        /* console.log(contexto); */
    } else if (mensaje.includes("telefono") || mensaje.includes("celular")) {
        contexto = `Su numero de celular es 221-3030341 (Argentina)`

    } else if (keywordsFormacion.some(k => mensaje.toLowerCase().includes(k))) {
        contexto = `
    Formación Académica:
    • Estudio Analista Programador Universitario en la UNLP - Pero actualmente se encuentra finalizando sus estudios en la UNPSJB (En curso)
    • Ingeniería Electrónica - UNLP (3 años completados)
    • Técnico Electromecánico - Escuela Industrial N°5 Río Turbio (2004-2007)

    Formación Complementaria:
    • Bootcamp Premium de Desarrollo Web Frontend (Abril 2025)
    • Programa Codo a Codo 4.0 - Full-Stack Developer Node.js (Sept 2024)
    • React.js - Platzi y Desafío Latam
    • Microsoft Certified: Azure Data Fundamentals (Marzo 2025)
    • Curso Profesional de JavaScript - CódigoFacilito
    • Bootcamp Bases de Datos en la Nube con Azure - CódigoFacilito
    • Talleres con Alura Latam, SoyLider.net, MoureDev y otros

    Conferencias y Jornadas:
    • CISL Software Libre
    • Festival FLISOL
    • Blockchain y Fintech UNLP

    Otros cursos:
    • Desarrollo Web Frontend - Facultad de Informática UNLP (2015)
    • Taller de Corel Draw - UNLP
    `;
        /* console.log(contexto); */
    } else if ((objetoTrabajo = trabajos.find(trabajo => mensaje.includes(trabajo.titulo.toLowerCase())))) {
        contexto = `Trabajo: ${objetoTrabajo.titulo}\nTecnologías: ${objetoTrabajo.tecnologias.join(", ")}\nDescripción: ${objetoTrabajo.descripcion}`;

    } else {
        // 🧠 Último recurso: usar todo el contexto disponible

        const descripcion = perfil.descripcion || "No hay descripción disponible.";
        const tecnologias = perfil.tecnologias?.join(", ") || "Tecnologías no especificadas.";
        const contacto = `
Email: <a href="mailto:${perfil.email}">${perfil.email}</a><br>
LinkedIn: <a href="${perfil.linkedin}" target="_blank">${perfil.linkedin}</a><br>
Teléfono: ${perfil.telefono || "No disponible"}<br>
`;

        const trabajosHtml = trabajos.map(trabajo => `
🧠 <b>${trabajo.titulo}</b><br>
${trabajo.descripcion}<br><br>
`).join("");

        contexto = `
Sobre Mauricio Belforte:<br>
${descripcion}<br><br>

Tecnologías que utiliza:<br>
${tecnologias}<br><br>

Información de contacto:<br>
${contacto}<br>

Experiencia laboral:<br>
${trabajosHtml}
  `;
        console.log("ultimo contexto", contexto);
    }

    // Construimos el system prompt dinámicamente
    const promptSistema = `
Respondé en menos de 100 caracteres, en español y con claridad.
 Sos un asistente virtual que brinda información precisa en tercera persona a posibles clientes, exclusivamente relacionada al Desarrollador Web Mauricio Belforte. Usá tercera persona y tono informativo. No te atribuyes la información. 
 Usá puntos y aparte con saltos de linea \n para separar frases en distintas líneas. Las respuestas deben facilitar la lectura. 
 Si no encontras informacion en el contexto que responda el mensaje del usuario, responde solo con la siguiente frase: “No me entrenaron para responder ese tipo de preguntas”.

`;

    const generarPromptUsuario = (contexto, userMessage) =>
        `
Contexto:\n${contexto}

Si no encontrás una respuesta a la pregunta del usuario, generá un resumen breve del contexto, manteniendo la claridad y el tono informativo.

Utilizando la parte útil del contexto, generá una respuesta en tercera persona que responda solo y únicamente a la siguiente pregunta del usuario: “${userMessage}”.

Usá puntos y aparte con saltos de línea (\\n) para facilitar la lectura. No respondas temas fuera del contexto, ni preguntas de la vida privada de nadie.
`;

    const promptUsuario = generarPromptUsuario(contexto, userMessage);




    /*     const modelos = [
            "deepseek/deepseek-chat-v3-0324:free",                   // principal
            "mistralai/mistral-small-3.2-24b-instruct:free",              // respaldo 1
            "moonshotai/kimi-k2:free"                                     // respaldo 2
        ];
     */
    const reply = await consultarModeloConOpenRouter(promptSistema, promptUsuario);
    res.json({ reply });

    /* 
    El objeto reply es el que llega al frontend cuando hacemos en chatbot.js un fetch('/api/chat', { method: 'POST', body: ... }) y luego lo procesás con const data = await response.json();. 
    
    {
        "reply": "Texto generado por el modelo según el contexto y la pregunta"
    }
    
    */
});


async function obtenerEstadoAPIKey() {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            throw new Error("No se encontró OPENROUTER_API_KEY en las variables de entorno.");
        }

        const response = await fetch("https://openrouter.ai/api/v1/auth/key", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Error al consultar el estado de la API Key:", error.message);
        return null;
    }
}

(async () => {
    const info = await obtenerEstadoAPIKey();
    if (info && info.data) {
        const { usage, limit, is_free_tier } = info.data;
        console.log(`🔐 Uso actual: ${usage}/${limit}`);
        console.log(`🆓 Plan gratuito: ${is_free_tier ? "Sí" : "No"}`);

        if (usage >= limit) {
            console.warn("⚠️  Límite excedido. Activando fallback o redireccionando a otro modelo...");
            // Acá podés disparar lógica alternativa
        }
    }
})();


async function consultarModeloConOpenRouter(promptSistema, promptUsuario) {

    const primerProveedor = proveedores.openrouter
    const primerModelo = modelosPorProveedor.openrouter[0];

    /*Pido los datos al modelo con el fetch(url,objeto) */
    const response = await fetch(primerProveedor.endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Mi Sitio Web"
        },
        body: JSON.stringify({
            model: primerModelo,
            messages: [
                { role: "system", content: promptSistema },
                { role: "user", content: promptUsuario }
            ]
        })
    });

    const data = await response.json();
    console.log("Respuesta cruda del modelo 1:", data);

    // ❌ Si hay error o respuesta vacía, probamos el segundo modelo
    if (data.error || !data.choices?.[0]?.message?.content) {
        console.warn("Error o respuesta vacía. Probando primer modelo de respaldo...");
        return await probandoSegundoModelo(promptSistema, promptUsuario);
    }

    return data.choices[0].message.content || "Lo siento, no entendí.";
}



async function probandoSegundoModelo(promptSistema, promptUsuario) {
    /* const segundoModelo = modelos[1]; */

    const segundoProveedor = proveedores.groq;
    const primerModelo = modelosPorProveedor.groq[0];


    const response = await fetch(segundoProveedor.endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Mi Sitio Web"
        },
        body: JSON.stringify({
            model: primerModelo,
            messages: [
                { role: "system", content: promptSistema },
                { role: "user", content: promptUsuario }
            ]
        })
    });

    const data = await response.json();
    console.log("Respuesta cruda del modelo 2:", data);
    // ❌ Si hay error o respuesta vacía, probamos el tercer modelo
    if (data.error || !data.choices?.[0]?.message?.content) {
        console.warn("Error o respuesta vacía. Probando modelo de respaldo...");
        return await probandoTercerModelo(promptSistema, promptUsuario, modelos);
    }
    return data.choices?.[0]?.message?.content || "La respuesta falló incluso en el segundo modelo alternativo.";






}

async function probandoTercerModelo(promptSistema, promptUsuario) {


    /* const tercerModelo = modelos[2]; */

    const tercerProveedor = proveedores.together;
    const primerModelo = modelosPorProveedor.together[0];

    if (!tercerModelo) return "No me entrenaron para responder ese tipo de preguntas.";

    console.log("→ Usando tercer modelo de respaldo:", tercerModelo);



    const response = await fetch(tercerProveedor, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "Mi Sitio Web"
        },
        body: JSON.stringify({
            model: primerModelo,
            messages: [
                { role: "system", content: promptSistema },
                { role: "user", content: promptUsuario }
            ]
        })
    });

    const data = await response.json();
    console.log("Respuesta cruda del modelo 3:", data);
    return data.choices?.[0]?.message?.content || "No me entrenaron para responder ese tipo de preguntas.";
}





app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

