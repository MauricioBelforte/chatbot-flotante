¡Listo, Mauricio! Acá tenés el README actualizado según tu nuevo enfoque, sin iframe y con integración directa desde cualquier frontend externo 💡:

---

# 🤖 chatbot-flotante

Un chatbot modular, auto-hospedado y desacoplado, desarrollado en **Node.js** y desplegado en **Vercel**. Este proyecto refleja un enfoque técnico propio, pensado para escalar de forma independiente, y diseñado para que cualquier frontend externo pueda enviar prompts directamente al motor IA sin depender de componentes visuales embebidos.

## 🎯 Propósito

Este chatbot cumple múltiples roles:
- 🔄 Un backend universal que responde a prompts enviados desde sitios estáticos, dashboards, portfolios o CMS externos.
- 💼 Una muestra técnica clara para reclutadores y desarrolladores, con foco en modularidad y arquitectura limpia.
- 🧪 Un experimento open-source para explorar el uso de modelos IA desacoplados.
- 🎁 Un template liviano para desarrolladores que buscan integrar respuestas por IA sin acoplar lógica contextual.

## 🧰 Tecnologías utilizadas

- **Node.js**: motor principal del backend.
- **API desacoplada**: recibe `systemPrompt` y `userPrompt` ya procesados desde el cliente.
- **OpenRouter, Groq, Ollama**: integración flexible con múltiples proveedores IA.
- **Vercel Functions**: despliegue serverless y control de rutas con `vercel.json`.
- **dotenv**: manejo seguro de claves privadas.

## ⚙️ Arquitectura general

```text
chatbot-flotante/
├── public/
│   ├── index.html          # Interfaz visual del chatbot (opcional)
│   ├── styles.css          # Estilos visuales
│   └── chatbotVisual.js    # Script embebible para integración directa
├── api/
│   └── chatbotApi.js       # Recibe prompts, responde con modelo IA
├── lib/
│   ├── consultasModelos.js
│   ├── estadoOpenRouter.js
│   ├── proveedores.js
│   └── modelosPorProveedor.js
├── .env                    # Configuraciones privadas
├── vercel.json             # Deploy y control de rutas
├── LICENSE                 # Licencia MIT - Mauricio Belforte
└── README.md               # Esta documentación ✨
```

## 📡 Cómo integrarlo desde otro proyecto

### Consulta directa por API

```js
const res = await fetch("https://chatbot-flotante.vercel.app/api/chatbotApi", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    systemPrompt: "Respondé como mentor técnico.",
    userPrompt: "¿Qué es un stream en JavaScript?"
  })
});
const { respuesta } = await res.json();
console.log(respuesta);
```

> 💬 Este backend espera prompts ya armados: no interpreta el mensaje del usuario ni genera contexto. El frontend se encarga de eso.

## 📄 Formato esperado del cuerpo del request

```json
{
  "systemPrompt": "Definí el rol del asistente",
  "userPrompt": "Mensaje del usuario"
}
```

## 🧪 Sobre el modelo desacoplado

- El backend es neutro y reusable: puede integrarse con cualquier cliente, visual o no.
- El frontend externo controla el tono, el contenido y el flujo conversacional.
- El motor IA se gestiona desde `lib/`, con fallback automático y selección de proveedor.

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Podés usarlo, modificarlo y distribuirlo libremente, siempre que se conserve el siguiente aviso:

Consulta el archivo [`LICENSE`](./LICENSE) para ver el texto completo.

---

Si querés, armamos una variante de este README para el backend puro (`chatbot-backend-vercel`) o un ejemplo embebido tipo `docs/index.html` que haga el `fetch()` directamente. Vos decís cómo seguimos 🔧📦.
