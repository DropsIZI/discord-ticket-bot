const { startAnnounceTask } = require('../utils/announceTask');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    client.user.setActivity('⛏️ Servidor Minecraft', { type: 3 }); // WATCHING
    startAnnounceTask(client);
  },
};
