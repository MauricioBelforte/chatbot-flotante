/* import fs from "fs/promises";
import path from "path"; */

export async function generarContexto(mensajeDelUsuario) {

    /* const rutaDatos = path.join(process.cwd(), "datos");
    
    
    
    
        // Cargamos trabajos.json
        let trabajos = [];
        try {
            const trabajosRaw = await fs.readFile(path.join(rutaDatos, "trabajos.json"), "utf-8");
            trabajos = JSON.parse(trabajosRaw);
        } catch (err) {
            console.error("Error al cargar trabajos.json:", err);
        }
    
    
    
        let perfil = {};
        try {
           const perfilRaw = await fs.readFile(path.join(rutaDatos, "sobremi.json"), "utf-8");
            perfil = JSON.parse(perfilRaw);
        } catch (err) {
            console.error("Error al cargar sobremi.json:", err);
        }
    
     */
    let trabajos = [
        {
            "titulo": "Toscanes",
            "descripcion": "Landing page para grupo de inversiones inmobiliarias. Contiene menú desplegable con transiciones.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Hostinger"],
            "enlace_web": "https://toscanes.com.ar/",
            "enlace_codigo": null
        },
        {
            "titulo": "Radio Santa Barbara",
            "descripcion": "Web para emisora radial 98.5Mhz de Río Turbio. Galería rotativa, audio 24hs, animaciones.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Git", "Github"],
            "enlace_web": "https://mauriciobelforte.github.io/radio-Santa-Barbara/",
            "enlace_codigo": "https://github.com/MauricioBelforte/radio-Santa-Barbara"
        },
        {
            "titulo": "TREX E-commerce",
            "descripcion": "E-commerce del curso Full-Stack Node.js (Codo a Codo 4.0). Carrusel y galería de imágenes con Bootstrap.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Bootstrap", "Git", "Github", "Vercel"],
            "enlace_web": "https://mauriciobelforte.github.io/Proyecto-CaC-Nodejs/",
            "enlace_codigo": "https://github.com/MauricioBelforte/Proyecto-CaC-Nodejs"
        },
        {
            "titulo": "Colimbeta",
            "descripcion": "App web para torneos de juegos de pelea. Marcador de puntajes con rotación automática de jugadores.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Git", "Github"],
            "enlace_web": "https://mauriciobelforte.github.io/proyecto-marcador-gana-sigue/",
            "enlace_codigo": "https://github.com/MauricioBelforte/proyecto-marcador-gana-sigue"
        },
        {
            "titulo": "Web Personal",
            "descripcion": "Web personal para practicar cards responsivas.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Firebase", "Node.js"],
            "enlace_web": "https://empleoonlinecripto.web.app/",
            "enlace_codigo": "#"
        },
        {
            "titulo": "Generador de contraseñas",
            "descripcion": "Generador de contraseñas seguras con validación de fuerza, símbolos especiales y botón de limpieza.",
            "tecnologias": ["HTML", "CSS", "JavaScript", "Git", "Github"],
            "enlace_web": "https://mauriciobelforte.github.io/InmersionDev-Generador-de-contrasenas-Clase1/",
            "enlace_codigo": "https://github.com/MauricioBelforte/InmersionDev-Generador-de-contrasenas-Clase1/tree/main"
        }
    ];

    let perfil = {
        "nombre": "se llama Mauricio Belforte",
        "edad": "tiene 36 años",
        "ubicacion": "actualmente vive en Trelew, Chubut, Argentina",
        "profesion": "se desempeña como Desarrollador Web Front-End, y actualmente se esta capacitando para ser Full-Stack",
        "descripcion": "es un excelente Desarrollador web Freelance, enfocado en tecnologías frontend. Le gusta crear sitios web funcionales y bien diseñados, con especial interés en JavaScript y Node.js.",
        "tecnologias": ["HTML", "CSS", "JavaScript", "Bootstrap", "Node.js", "Express", "Vercel", "Git", "GitHub", "Firebase", "EJS", "JSON"],
        "email": "mauriciobelforte@gmail.com",
        "linkedin": "https://www.linkedin.com/in/mauriciobelforte/",
        "github": "https://github.com/MauricioBelforte/"
    };

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


    // lógica modular
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
    return contexto;
}