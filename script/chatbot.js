// script/chatbot.js
const chatIcon = document.getElementById("chat-icon");
const chatContainer = document.getElementById("chat-container");
const botonEnviarMensaje = document.getElementById("enviar-mensaje");
const mensajeInput = document.getElementById("mensaje");
const mensajesListado = document.getElementById("mensajes");




/// Escuchando el click en el icono
chatIcon.addEventListener("click", () => {
  /* Si el elemento ya tiene la clase "visible", la elimina, si no la tiene, la agrega. */
  chatContainer.classList.toggle("visible");
  mostrarMensajeBienvenida();


});

/// Mostrar mensaje de bienvenida apenas se abre el chat
function mostrarMensajeBienvenida() {
  // Si esta vacio agrega el mensaje de bienvenida
  if (mensajesListado.children.length === 0) {
    agregarMensaje("bot", "👋 ¡Hola! Soy el asistente de Mauricio Belforte.\nPodés preguntarme por sus proyectos, tecnologías utilizadas y cómo ponerte en contacto con él.")

  }
}


///
botonEnviarMensaje.addEventListener("click", enviarMensaje);


///
mensajeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    enviarMensaje();
  }
});


async function enviarMensaje() {
  const mensajeDelUsuario = mensajeInput.value.trim();
  if (!mensajeDelUsuario) return;

  agregarMensaje("usuario", mensajeDelUsuario);
  mensajeInput.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensajeDelUsuario }),
  });

  const data = await res.json();
  const mensajeFinal = formatearRespuestaBot(data.reply);

  agregarMensaje("bot", mensajeFinal, true); // si tu función renderiza con HTML
}

function formatearRespuestaBot(textoPlano) {
  // Elimina signos de ángulo que rompen el HTML
  const limpio = textoPlano.replace(/<([^>]+)>/g, '$1');

  // Convierte URLs en enlaces HTML
  const conLinks = limpio.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  console.log(conLinks)
  // Convierte saltos de línea \n en <br>
  const conSaltos = conLinks.replace(/\n/g, '<br>');
  console.log(conSaltos)

  return conSaltos;
}

function agregarMensaje(tipo, texto, esHTML = false) {
  const contenedorVineta = document.createElement("div");
  contenedorVineta.classList.add("chat-container__listado-de-mensajes__mensaje");

  let icono;
  let vineta;

  if (tipo === "usuario") {
    contenedorVineta.classList.add("mensaje--usuario");
    icono = crearIcono("🧑", "vineta-icono-usuario");
    vineta = crearVineta(texto, "vineta-texto-usuario");
  } else {
    contenedorVineta.classList.add("mensaje--bot");
    icono = crearIcono("🤖", "vineta-icono-robot");
    vineta = document.createElement("div");
    vineta.classList.add("vineta-texto-robot");

    if (esHTML) {
      vineta.innerHTML = texto;
    } else {
      vineta.textContent = texto;
    }
  }

  contenedorVineta.appendChild(icono);
  contenedorVineta.appendChild(vineta);
  mensajesListado.appendChild(contenedorVineta);
  mensajesListado.scrollTop = mensajesListado.scrollHeight;
}

function crearVineta(texto, clase) {
  const vineta = document.createElement("div")

  vineta.classList.add(clase);
  vineta.innerText = texto;
  return vineta
}

function crearIcono(icon, clase) {
  const icono = document.createElement("div");

  icono.classList.add(clase);
  icono.innerText = icon;
  return icono

}