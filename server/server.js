// server/server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

import { proveedores } from '../lib/proveedores.js';
import { modelosPorProveedor } from '../lib/modelosPorProveedor.js';

import { consultarModeloConOpenRouter, probandoSegundoModelo, probandoTercerModelo } from "../lib/consultasModelos.js";

import { chequearLimiteOpenRouter } from "../lib/estadoOpenRouter.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/script", express.static(path.join(__dirname, "../script")));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const mensajeDelUsuario = req.body.message;

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

    const mensajeDelUsuarioEnMinuscula = mensajeDelUsuario.toLowerCase();

    // Sobre trabajos
    if (mensajeDelUsuarioEnMinuscula.includes("trabajo") || mensajeDelUsuarioEnMinuscula.includes("proyecto")) {
        /*map crea un arreglo de strings, y a ese arreglo se convierte en un solo string con join */
        contexto = trabajos.map(trabajo => `- ${trabajo.titulo}: ${trabajo.descripcion}`).join("\n");
        /* console.log(contexto); */
        // Sobre tecnologías
    } else if (mensajeDelUsuarioEnMinuscula.includes("tecnolog")) {
        const techs = [...new Set(trabajos.flatMap(t => t.tecnologias))];
        contexto = `Tecnologías usadas por Mauricio Belforte: ${techs.join(", ")}`;
        /* console.log(contexto); */

        // Sobre Mauricio (nombre, experiencia, contacto, etc.)
    } else if (keywords.some(palabra => mensajeDelUsuarioEnMinuscula.toLowerCase().includes(palabra))) {
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
    } else if (mensajeDelUsuarioEnMinuscula.includes("telefono") || mensajeDelUsuarioEnMinuscula.includes("celular")) {
        contexto = `Su numero de celular es 221-3030341 (Argentina)`

    } else if (keywordsFormacion.some(k => mensajeDelUsuarioEnMinuscula.toLowerCase().includes(k))) {
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
    } else if ((objetoTrabajo = trabajos.find(trabajo => mensajeDelUsuarioEnMinuscula.includes(trabajo.titulo.toLowerCase())))) {
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

    const generarPromptUsuario = (contexto, mensajeDelUsuario) =>
        `
Contexto:\n${contexto}

Si no encontrás una respuesta a la pregunta del usuario, generá un resumen breve del contexto, manteniendo la claridad y el tono informativo.

Utilizando la parte útil del contexto, generá una respuesta en tercera persona que responda solo y únicamente a la siguiente pregunta del usuario: “${mensajeDelUsuario}”.

Usá puntos y aparte con saltos de línea (\\n) para facilitar la lectura. No respondas temas fuera del contexto, ni preguntas de la vida privada de nadie.
`;

    const promptUsuario = generarPromptUsuario(contexto, mensajeDelUsuario);

    // Verificás el estado actual antes de decidir el proveedor
    const estado = await chequearLimiteOpenRouter();

    if (estado.degradado) {
        // Podés usar Groq, Together o fallback técnico
        /*Este return le responde al chatbotVisual sin la respuesta del modelo */
        return res.json({ respuesta: "⚠️ Usando modelo alternativo por límite de uso." });
    }


    /*     const modelos = [
            "deepseek/deepseek-chat-v3-0324:free",                   // principal
            "mistralai/mistral-small-3.2-24b-instruct:free",              // respaldo 1
            "moonshotai/kimi-k2:free"                                     // respaldo 2
        ];
     */

    // Si no está degradado, seguís con OpenRouter
    const respuesta = await consultarModeloConOpenRouter(promptSistema, promptUsuario);
    res.json({ respuesta });

    /* 
    El objeto respuesta es el que llega al frontend cuando hacemos en chatbotVisual.js un fetch('/api/chat', { method: 'POST', body: ... }) y luego lo procesás con const data = await response.json();. 
    
    {
        "respuesta": "Texto generado por el modelo según el contexto y la pregunta"
    }
    
    */
});







app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

