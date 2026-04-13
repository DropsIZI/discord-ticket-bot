const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getServerStatus, MC_IP } = require('../utils/minecraftStatus');
const THEME = require('../utils/theme');

const THUMBNAIL = 'https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/lujo.png';
const BANNER    = 'https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner_v2.png';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servidor')
    .setDescription('Muestra el estado actual del servidor de Minecraft'),

  async execute(interaction) {
    await interaction.deferReply();

    const s = await getServerStatus();
    const hours = parseFloat(process.env.MC_ANNOUNCE_INTERVAL_HOURS || '6');

    const embed = new EmbedBuilder()
      .setTitle(`🌍  CobbleverseMMO — Servidor Cobblemon`)
      .setColor(s.online ? THEME.colors.primary : THEME.colors.danger)
      .setDescription(
        s.online
          ? `### ¡El servidor está **en línea**! ⚡\n> Únete a la aventura Pokémon y atrapa, entrena y combate con tus Pokémon favoritos.`
          : `### El servidor está **fuera de línea** 😴\n> Vuelve pronto, ¡la aventura te espera!`
      )
      .addFields(
        { name: '🌐 Dirección IP', value: `\`\`\`${MC_IP}\`\`\``, inline: false },
        { name: '📶 Estado', value: s.online ? '🟢 En línea' : '🔴 Fuera de línea', inline: true },
      )
      .setThumbnail(THUMBNAIL)
      .setImage(BANNER)
      .setFooter({ text: `${THEME.footer} • Próximo anuncio en ~${hours}h` })
      .setTimestamp();

    if (s.online) {
      embed.addFields(
        { name: '👥 Jugadores', value: `**${s.players}** / ${s.maxPlayers}`, inline: true },
        { name: '🎮 Versión', value: s.version, inline: true },
      );
    }

    await interaction.editReply({ embeds: [embed] });
  },
};
