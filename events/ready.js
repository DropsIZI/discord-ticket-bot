const { startAnnounceTask } = require('../utils/announceTask');
const { startStoreAnnounceTask } = require('../utils/storeAnnounceTask');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    client.user.setActivity('🌍 cobbleversemmo.net', { type: 0 }); // PLAYING
    startAnnounceTask(client);
    startStoreAnnounceTask(client);
  },
};
