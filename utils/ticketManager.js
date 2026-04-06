// Almacenamiento simple en memoria (puedes reemplazar con una DB)
const openTickets = new Map(); // userId -> [channelIds]

const TICKET_TYPES = {
  bug: {
    emoji: '🐛',
    label: 'Reporte de Bug',
    color: 0xFF4444,
    prefix: 'bug',
    description: 'Reporta un error o fallo en el sistema',
    questions: [
      '📋 **Descripción del bug:** ¿Qué ocurrió exactamente?',
      '🔁 **Pasos para reproducirlo:** ¿Cómo puedo recrear el problema?',
      '💻 **Entorno:** ¿Qué plataforma/versión estás usando?',
    ],
  },
  soporte: {
    emoji: '🎧',
    label: 'Soporte General',
    color: 0x5865F2,
    prefix: 'soporte',
    description: 'Obtén ayuda con cualquier problema general',
    questions: [
      '❓ **¿En qué podemos ayudarte?**',
      '📎 Si tienes capturas de pantalla o evidencia, adjúntalas aquí.',
    ],
  },
  compras: {
    emoji: '🛒',
    label: 'Problemas con Compras',
    color: 0xF0B132,
    prefix: 'compra',
    description: 'Reporta un problema con un pago o compra',
    questions: [
      '🧾 **ID de transacción o comprobante:** (adjunta imagen si puedes)',
      '💳 **Monto cobrado:** ¿Cuánto fue el cobro?',
      '📅 **Fecha de la transacción:**',
      '📬 **Correo asociado a la cuenta:**',
    ],
  },
};

function getUserTickets(userId) {
  return openTickets.get(userId) || [];
}

function addTicket(userId, channelId) {
  const current = getUserTickets(userId);
  current.push(channelId);
  openTickets.set(userId, current);
}

function removeTicket(userId, channelId) {
  const current = getUserTickets(userId);
  openTickets.set(userId, current.filter(id => id !== channelId));
}

function getTicketCount(userId) {
  return getUserTickets(userId).length;
}

module.exports = { TICKET_TYPES, addTicket, removeTicket, getTicketCount };
