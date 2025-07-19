# 🤖 chatbot-flotante

Un chatbot modular y flotante desarrollado en **Node.js**, diseñado para integrarse fácilmente en cualquier sitio web mediante un ícono fijo tipo “burbuja”.  
Este proyecto refleja un enfoque técnico propio, adaptable y pensado para escalar de forma independiente. Está enfocado en la reutilización personal, demostración profesional, y exploración con IA abierta.

## 🎯 Propósito

Este chatbot está pensado como:
- Una herramienta reutilizable para mis futuros proyectos
- Una muestra técnica para reclutadores y desarrolladores
- Un experimento modular para explorar IA open-source

## 🧰 Tecnologías utilizadas

- **Node.js**: motor principal del backend
- **Express**: servidor HTTP ligero y personalizable
- **dotenv**: manejo de variables de entorno sin exponer credenciales
- **node-fetch**: conexión a modelos de IA vía API externa
- **OpenRouter**: servicio que permite usar modelos como Mistral (gratuito y en español)
- **HTML/CSS**: diseño visual del widget flotante e integración

> Este chatbot se ejecuta localmente mediante Node.js, y se conecta a modelos de IA externos como Mistral a través de OpenRouter. En el futuro puede adaptarse a instancias auto-hospedadas o modelos locales sin alterar su estructura principal.

## ⚙️ Arquitectura general

\
chatbot-flotante/
├── server/
│   └── server.js               # Lógica del backend y API
├── public/
│   └── widget.html             # Burbuja flotante para integrar en cualquier sitio
├── config/
│   └── env.example             # Variables de entorno de ejemplo
├── LICENSE                     # Licencia MIT - Mauricio Belforte
├── README.md                   # Documentación del proyecto
└── package.json                # Metadata y dependencias
\

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Podés usarlo, modificarlo y distribuirlo libremente, siempre que se conserve el siguiente aviso:

Consulta el archivo [`LICENSE`](./LICENSE) para ver el texto completo.
