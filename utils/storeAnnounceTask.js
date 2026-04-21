const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const THEME = require('./theme');

const STORE_CHANNEL_ID = '1491934044831879189';
const INTERVAL_HOURS = 1;

function startStoreAnnounceTask(client) {
  const announce = async () => {
    try {
      const channel = await client.channels.fetch(STORE_CHANNEL_ID).catch(() => null);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle('🏆  ¡Apoya CobbleverseMMO — Tienda Oficial!')
        .setColor(THEME.colors.primary)
        .setDescription(
          `### ¿Quieres ser el mejor Entrenador del servidor? ⚡\n` +
          `> Consigue rangos exclusivos y beneficios únicos que llevarán tu aventura Pokémon al siguiente nivel.\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `🎉 **¡OFERTA DE LANZAMIENTO! Primer mes todo a mitad de precio.** ⏳\n\n` +
          `> Cada compra ayuda a mantener y mejorar el servidor. ❤️\n` +
          `> ¡Únete a los mejores Entrenadores de **CobbleverseMMO**!`
        )
        .setImage('https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner_v2.png')
        .setFooter({ text: `${THEME.footer} • Pagos 100% seguros` })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Visitar Tienda')
          .setURL('https://cobbleversemmo.tebex.io')
          .setStyle(ButtonStyle.Link)
      );

      await channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error('Error en anuncio de tienda:', err);
    }
  };

  announce();
  setInterval(announce, INTERVAL_HOURS * 60 * 60 * 1000);
  console.log(`🛒 Anuncios de tienda cada ${INTERVAL_HOURS}h`);
}

module.exports = { startStoreAnnounceTask };
