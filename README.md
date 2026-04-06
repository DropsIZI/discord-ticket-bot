# 🎫 Discord Bot — Tickets + Minecraft

Bot de Discord con sistema de tickets, información del servidor Minecraft y reglas del servidor.

---

## ✨ Funciones

- 🎫 **Tickets** para Bugs, Soporte y Compras (canales privados automáticos)
- ⛏️ **Comando `/servidor`** — muestra IP, estado, jugadores y versión en tiempo real
- 📢 **Anuncio automático** de la IP cada X horas en un canal configurado
- 📜 **Comando `/setup-reglas`** — publica las reglas del servidor con formato bonito
- 🔒 Cierre de tickets con confirmación y auto-eliminación del canal

---

## 🚀 Instalación local

```bash
npm install
cp .env.example .env   # Completa las variables
npm run deploy         # Registra los slash commands
npm start
```

---

## ☁️ Subir a Railway (24/7 GRATIS)

### Paso 1 — Crear cuenta y proyecto
1. Ve a [railway.app](https://railway.app) y regístrate con GitHub
2. Haz clic en **"New Project"** → **"Deploy from GitHub repo"**
3. Sube este código a un repositorio de GitHub primero (ver abajo)

### Paso 2 — Subir código a GitHub
```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 3 — Variables de entorno en Railway
En tu proyecto de Railway ve a **Variables** y agrega:

| Variable | Valor |
|----------|-------|
| `DISCORD_TOKEN` | Token del bot |
| `CLIENT_ID` | Application ID |
| `GUILD_ID` | ID de tu servidor |
| `SUPPORT_ROLE_ID` | ID del rol soporte |
| `MC_SERVER_IP` | IP de tu servidor Minecraft |
| `MC_SERVER_PORT` | `25565` (o el tuyo) |
| `MC_ANNOUNCE_INTERVAL_HOURS` | `6` |
| `MC_ANNOUNCE_CHANNEL_ID` | ID del canal de anuncios |
| `RULES_CHANNEL_ID` | ID del canal de reglas |
| `MAX_TICKETS_PER_USER` | `3` |

> ⚠️ **Nunca** subas el archivo `.env` a GitHub. Está en `.gitignore`.

### Paso 4 — Deploy
Railway detecta el `railway.json` y despliega automáticamente. Verás los logs en tiempo real.

---

## 💬 Comandos disponibles

| Comando | Descripción | Permiso |
|---------|-------------|---------|
| `/setup-tickets` | Publica el panel de tickets | Admin |
| `/setup-reglas` | Publica las reglas del servidor | Admin |
| `/servidor` | Muestra IP y estado del servidor MC | Todos |
| `/cerrar-ticket` | Cierra el ticket actual | Dentro del ticket |

---

## 📝 Editar las reglas

Abre `commands/setupReglas.js` y edita el array `REGLAS`:

```js
const REGLAS = [
  {
    titulo: '1. Mi regla',
    texto: 'Descripción de la regla...',
  },
  // ...
];
```

Luego vuelve a ejecutar `/setup-reglas` en Discord.

---

## 📁 Estructura

```
discord-ticket-bot/
├── index.js
├── deploy-commands.js
├── railway.json          ← config para Railway
├── nixpacks.toml         ← Node 20 en Railway
├── .gitignore
├── .env.example
├── commands/
│   ├── setupTickets.js
│   ├── setupReglas.js    ← NUEVO
│   ├── servidor.js       ← NUEVO
│   └── cerrarTicket.js
├── events/
│   ├── ready.js
│   └── interactionCreate.js
└── utils/
    ├── ticketManager.js
    ├── minecraftStatus.js  ← NUEVO
    └── announceTask.js     ← NUEVO
```
