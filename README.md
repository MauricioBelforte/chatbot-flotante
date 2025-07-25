# 🧠 chatbot-flotante (histórico técnico)

Este repositorio conserva el desarrollo original que dio nacimiento a un ecosistema modular y desacoplado de chatbot IA embebible.

## 🔗 Repositorios actuales del ecosistema

- 🔧 Backend desacoplado (Vercel, API modular): [`chatbot-backend-vercel`](https://github.com/MauricioBelforte/chatbot-backend-vercel)
- 🎨 Frontend embebible (HTML + JS estático): [`chatbot-frontend-embed`](https://github.com/MauricioBelforte/chatbot-frontend-embed)

---

## 🧬 Propósito de este repositorio

Este repositorio conserva la historia técnica, los commits originales y la evolución del motor de chatbot desde un prototipo personal hacia un sistema desacoplado, plug-and-play y listo para escalar como plantilla open-source.

La intención es dejar trazabilidad completa y servir como caso de estudio para desarrolladores interesados en:

- Modularidad progresiva en proyectos IA
- Estrategias de refactorización hacia desacoplamiento
- Onboarding técnico claro y replicable
- Diseño de motores resilientes y mantenibles

---

## 🧱 Evolución arquitectónica

1. 🤖 Monorepo inicial con lógica IA, frontend y backend en una sola base
2. 🔀 Proceso de refactorización y desacoplamiento
3. 📦 División en repos separados con onboarding dedicado
4. 🌐 Ecosistema escalable, embebible y clonable en cualquier entorno

---

## 🛠️ Componentes extraídos

Desde este repo se originaron los módulos que hoy viven en repos separados:

- `lib/`: motor IA modular (OpenRouter / Groq / otros)
- `api/`: rutas backend desacopladas
- `public/`: frontend embebido ahora en su propio repo

---

## 📘 Uso sugerido

Este repo se mantiene para fines didácticos y de trazabilidad:

- Explorar commits originales
- Analizar estrategias de desacoplamiento
- Estudiar la evolución técnica del chatbot

---

## 🧪 Cómo probar el sistema completo

1. Backend: desplegar [`chatbot-backend-vercel`](https://github.com/MauricioBelforte/chatbot-backend-vercel) en Vercel
2. Frontend: clonar [`chatbot-frontend-embed`](https://github.com/MauricioBelforte/chatbot-frontend-embed) y vincularlo al endpoint
3. Configurar `.env` (backend) y `script.js` (frontend) según tu instancia

---

## 📖 Lecciones aprendidas

- La modularidad y claridad de responsabilidad hacen escalable el sistema
- El onboarding técnico es tan importante como el código
- Mantener la historia del proyecto permite dejar legado y aprendizaje

---

## 📄 Licencia

Este repositorio está bajo la licencia MIT.  
Consultá el archivo [`LICENSE`](./LICENSE) para más detalles.
