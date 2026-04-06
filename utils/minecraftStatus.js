const { status } = require('minecraft-server-util');

const MC_IP = process.env.MC_SERVER_IP || 'localhost';
const MC_PORT = parseInt(process.env.MC_SERVER_PORT || '25565');

/**
 * Consulta el estado del servidor Java.
 * Devuelve { online, players, maxPlayers, motd, version } o { online: false }
 */
async function getServerStatus() {
  try {
    const result = await status(MC_IP, MC_PORT, { timeout: 5000 });
    return {
      online: true,
      players: result.players.online,
      maxPlayers: result.players.max,
      motd: result.motd?.clean ?? '',
      version: result.version?.name ?? 'Desconocida',
    };
  } catch {
    return { online: false };
  }
}

module.exports = { getServerStatus, MC_IP, MC_PORT };
