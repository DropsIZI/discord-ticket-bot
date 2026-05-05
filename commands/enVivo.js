const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { streamLinks } = require('../utils/streamStore');
const THEME = require('../utils/theme');

const STREAMER_ROLE = '1501077551311749161';
const PING_ROLE    = '1501077830719635537';
const STREAM_CHANNEL = '1501082116723572827';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('en-vivo')
    .setDescription('Notifica que estás en stream en vivo')
    .addStringOption(option =>
      option
        .setName('titulo')
        .setDescription('Título o descripción del stream')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.has(STREAMER_ROLE);
    if (!hasRole) {
      return interaction.reply({ content: '❌ Necesitas el rol de **Streamer** para usar este comando.', ephemeral: true });
    }

    const links = streamLinks.get(interaction.user.id);
    if (!links || links.size === 0) {
      return interaction.reply({
        content: '❌ Primero configura tus links con `/set-stream`.',
        ephemeral: true,
      });
    }

    const titulo = interaction.options.getString('titulo');
    const channel = await interaction.guild.channels.fetch(STREAM_CHANNEL).catch(() => null);
    if (!channel) {
      return interaction.reply({ content: '❌ No se encontró el canal de streams.', ephemeral: true });
    }

    const linksText = [...links.entries()]
      .map(([plataforma, link]) => `> 🔗 **${plataforma}:** ${link}`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('🔴  ¡STREAM EN VIVO!')
      .setColor(0xFF0000)
      .setDescription(
        `### ${interaction.user.username} está transmitiendo ahora 🎮\n\n` +
        `> 📺 **${titulo}**\n\n` +
        `${linksText}`
      )
      .setThumbnail(interaction.user.displayAvatarURL({ extension: 'png', size: 256 }))
      .setFooter({ text: `${THEME.footer} • ¡No te lo pierdas!` })
      .setTimestamp();

    await channel.send({
      content: `🔴 ¡<@&${PING_ROLE}>, **${interaction.user.username}** está en vivo!`,
      embeds: [embed],
    });

    await interaction.reply({ content: '✅ ¡Notificación enviada! Que disfruten el stream. 🎉', ephemeral: true });
  },
};
