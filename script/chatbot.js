// script/chatbot.js
const chatIcon = document.getElementById("chat-icon");
const chatContainer = document.getElementById("chat-container");
const botonEnviarMensaje = document.getElementById("enviar-mensaje");
const mensajeInput = document.getElementById("mensaje");
const mensajesListado = document.getElementById("mensajes");

///
chatIcon.addEventListener("click", () => {
  /* Si el elemento ya tiene la clase "visible", la elimina, si no la tiene, la agrega. */
  chatContainer.classList.toggle("visible");
});

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
  // Si no hay mensaje no sigas
  if (!mensajeDelUsuario) return;


  agregarMensaje("usuario", mensajeDelUsuario);
  mensajeInput.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: mensajeDelUsuario }),
  });

  const data = await res.json();
  agregarMensaje("bot", data.reply);
}


function agregarMensaje(tipo, texto) {
  const contenedorVineta = document.createElement("div");
  contenedorVineta.classList.add("chat-container__listado-de-mensajes__mensaje");



  if (tipo === "usuario") {
    contenedorVineta.classList.add("mensaje-usuario");
    const icono = crearIcono("🧑", "vineta-icono-usuario");
    const vineta = crearVineta(texto, "vineta-texto-usuario");

    contenedorVineta.appendChild(icono);
    contenedorVineta.appendChild(vineta);
  } else {
    contenedorVineta.classList.add("mensaje-bot");
    const icono = crearIcono("🤖", "vineta-icono-robot");
    const vineta = crearVineta(texto, "vineta-texto-robot");

    contenedorVineta.appendChild(icono);
    contenedorVineta.appendChild(vineta);
  }

  /*     if (tipo === "usuario") {
      contenedorVineta.classList.add("mensaje-usuario");
      agregarVineta();
       contenedorVineta.innerText = `${texto}🧑`; 
    } else {
      contenedorVineta.classList.add("mensaje-bot");
       contenedorVineta.innerText = `🤖 ${texto}`; 
      agregarVineta();
    }
   */


  mensajesListado.appendChild(contenedorVineta);

  //Lo que hace es desplazar automáticamente el scroll del contenedor de mensajes hacia abajo
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