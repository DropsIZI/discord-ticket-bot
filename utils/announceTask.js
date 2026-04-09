const { EmbedBuilder } = require('discord.js');
const { getServerStatus, MC_IP, MC_PORT } = require('./minecraftStatus');
const THEME = require('./theme');

function startAnnounceTask(client) {
  const channelId = process.env.MC_ANNOUNCE_CHANNEL_ID;
  const hours = parseFloat(process.env.MC_ANNOUNCE_INTERVAL_HOURS || '6');

  if (!channelId) {
    console.warn('⚠️  MC_ANNOUNCE_CHANNEL_ID no configurado.');
    return;
  }

  const intervalMs = hours * 60 * 60 * 1000;

  const announce = async () => {
    try {
      const channel = await client.channels.fetch(channelId).catch(() => null);
      if (!channel) return;

      const s = await getServerStatus();

      const embed = new EmbedBuilder()
        .setTitle(`⛏️  ${THEME.name} — Servidor Minecraft`)
        .setColor(s.online ? THEME.colors.primary : THEME.colors.danger)
        .setDescription(
          s.online
            ? `¡El servidor está **en línea**! Conéctate ahora.`
            : `El servidor está **fuera de línea** en este momento.`
        )
        .addFields(
          { name: '🌐 IP', value: `\`\`\`${MC_IP}\`\`\``, inline: false },
          { name: '📶 Estado', value: s.online ? '🟢 En línea' : '🔴 Fuera de línea', inline: true },
        )
        .setFooter({ text: `${THEME.footer} • Próximo anuncio en ~${hours}h` })
        .setTimestamp();

      if (THEME.logo) embed.setThumbnail(THEME.logo);

      if (s.online) {
        embed.addFields(
          { name: '👥 Jugadores', value: `**${s.players}** / ${s.maxPlayers}`, inline: true },
          { name: '🎮 Versión', value: s.version, inline: true },
        );
      }

      await channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('Error en anuncio automático:', err);
    }
  };

  announce();
  setInterval(announce, intervalMs);
  console.log(`📢 Anuncios de ${THEME.name} cada ${hours}h`);
}

module.exports = { startAnnounceTask };
