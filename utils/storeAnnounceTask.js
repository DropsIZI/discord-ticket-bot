const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const THEME = require('./theme');

const STORE_CHANNEL_ID = '1491934044831879189';
const INTERVAL_HOURS = 6;
const DELAY_HOURS = 3; // arranca 3h después del anuncio del servidor para no acumularse

function startStoreAnnounceTask(client) {
  const announce = async () => {
    try {
      const channel = await client.channels.fetch(STORE_CHANNEL_ID).catch(() => null);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle('🏆  ¡Tienda Oficial — CobbleverseMMO!')
        .setColor(THEME.colors.primary)
        .setDescription(
          `### ⚡ ¿Listo para llevar tu aventura Pokémon al siguiente nivel?\n` +
          `> Consigue productos exclusivos que solo encontrarás en **CobbleverseMMO**.\n\n` +

          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

          `## 🗝️ Llaves de Gacha\n` +
          `> Abre cajas y consigue Pokémon directamente en tu inventario.\n\n` +
          `> 🔵 **Llave Normal** — Pokémon aleatorio del pool estándar\n` +
          `> ✨ **Llave Shiny** — Garantiza un Pokémon **shiny**\n` +
          `> 👑 **Llave Legendaria** — Garantiza un Pokémon **legendario**\n` +
          `> 🌟 **Llave Shiny Legendaria** — El mejor premio: **legendario shiny** garantizado\n\n` +

          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

          `## 📦 Cofres\n` +
          `> Los cofres normales contienen recompensas variadas... ¡y sorpresas!\n\n` +
          `> 🎁 Objetos y recursos exclusivos\n` +
          `> 👑 Posibilidad de obtener un **Pokémon Legendario**\n` +
          `> ✨ Posibilidad de obtener un **Shiny Boost** — aumenta tus chances de encontrar shinys\n` +
          `> 🌍 Posibilidad de obtener un **Boost Global** — beneficia a **todo el servidor** a la vez\n\n` +

          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

          `## 🎖️ Rangos exclusivos\n` +
          `> Perks únicos, prefijos especiales y acceso a canales exclusivos.\n` +
          `> Cada compra ayuda a mantener el servidor en línea. ❤️\n\n` +

          `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

          `🤝 **Patrocinado por [AplaxyHosting](https://aplaxy.com)** — Hosting de confianza para servidores Minecraft.\n\n` +

          `🛒 **Visita la tienda →** https://cobbleversemmo.tebex.io`
        )
        .setImage('https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner_v2.png')
        .setFooter({ text: `${THEME.footer} • Pagos 100% seguros • Patrocinado por AplaxyHosting` })
        .setTimestamp();

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('🛒 Visitar Tienda')
          .setURL('https://cobbleversemmo.tebex.io')
          .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
          .setLabel('🤝 AplaxyHosting')
          .setURL('https://aplaxy.com')
          .setStyle(ButtonStyle.Link),
      );

      await channel.send({ embeds: [embed], components: [row] });
    } catch (err) {
      console.error('Error en anuncio de tienda:', err);
    }
  };

  // Espera 3h antes del primer anuncio para desfasarse del anuncio del servidor
  setTimeout(() => {
    announce();
    setInterval(announce, INTERVAL_HOURS * 60 * 60 * 1000);
  }, DELAY_HOURS * 60 * 60 * 1000);

  console.log(`🛒 Anuncios de tienda cada ${INTERVAL_HOURS}h (primer anuncio en ${DELAY_HOURS}h)`);
}

module.exports = { startStoreAnnounceTask };
