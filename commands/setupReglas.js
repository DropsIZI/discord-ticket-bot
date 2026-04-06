const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');
const { CATEGORIAS } = require('../utils/reglasData');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-reglas')
    .setDescription('Publica las reglas del servidor en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const header = new EmbedBuilder()
      .setTitle(`📖  Reglas del Servidor`)
      .setDescription(
        `Bienvenido al reglamento de **${THEME.name}**.\n` +
        `Lee atentamente estas reglas para disfrutar de una experiencia de juego óptima.\n\n` +
        `Pulsa el botón de abajo para ver todas las reglas.`
      )
      .setColor(THEME.colors.primary)
      .setFooter({ text: `Copyright © ${new Date().getFullYear()} | ${THEME.name}` })
      .setTimestamp();

    if (THEME.logo) header.setThumbnail(THEME.logo);

    const footer = new EmbedBuilder()
      .setDescription(
        `✅ Al jugar en **${THEME.name}** aceptas todas las reglas anteriores.\n` +
        `¿Tienes dudas o problemas? Abre un ticket en el canal de soporte.`
      )
      .setColor(THEME.colors.primary)
      .setFooter({ text: `Copyright © ${new Date().getFullYear()} | ${THEME.name}` });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('reglas_ver_todas')
        .setLabel('Ver todas las reglas')
        .setStyle(ButtonStyle.Success)
        .setEmoji('📜')
    );

    await interaction.channel.send({ embeds: [header, footer], components: [row] });
    await interaction.editReply({ content: '✅ Reglas publicadas correctamente.' });
  },
};
