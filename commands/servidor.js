const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getServerStatus, MC_IP, MC_PORT } = require('../utils/minecraftStatus');
const THEME = require('../utils/theme');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servidor')
    .setDescription('Muestra la IP y estado actual del servidor de Minecraft'),

  async execute(interaction) {
    await interaction.deferReply();

    const s = await getServerStatus();

    const embed = new EmbedBuilder()
      .setTitle(`⛏️  ${THEME.name} — Estado del Servidor`)
      .setColor(s.online ? THEME.colors.primary : THEME.colors.danger)
      .addFields(
        { name: '🌐 IP del Servidor', value: `\`\`\`${MC_IP}\`\`\``, inline: false },
        { name: '🔌 Puerto', value: `\`${MC_PORT}\``, inline: true },
        { name: '📶 Estado', value: s.online ? '🟢 En línea' : '🔴 Fuera de línea', inline: true },
      )
      .setFooter({ text: THEME.footer })
      .setTimestamp();

    if (THEME.logo) embed.setThumbnail(THEME.logo);

    if (s.online) {
      embed.addFields(
        { name: '👥 Jugadores conectados', value: `**${s.players}** / ${s.maxPlayers}`, inline: true },
        { name: '🎮 Versión', value: s.version, inline: true },
      );
      if (s.motd) embed.setDescription(`> ${s.motd}`);
    } else {
      embed.setDescription('El servidor no responde en este momento. Intenta más tarde.');
    }

    await interaction.editReply({ embeds: [embed] });
  },
};
