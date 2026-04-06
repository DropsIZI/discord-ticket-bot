const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');
const { TICKET_TYPES } = require('../utils/ticketManager');
const THEME = require('../utils/theme');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-tickets')
    .setDescription('Publica el panel de soporte en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('🎫  Panel de Soporte')
      .setDescription(
        `Bienvenido al sistema de tickets de **${THEME.name}**.\n` +
        `Estamos aquí para ayudarte con cualquier consulta o problema que puedas tener.\n\n` +
        `**📂 Categorías Disponibles**\n\n` +
        `🐛 **Bugs** — ¿Encontraste un bug? Selecciona para reportarlo.\n` +
        `🎧 **Soporte** — ¿Necesitas ayuda? Selecciona soporte general.\n` +
        `🛒 **Compras** — ¿Necesitas ayuda con una compra? Selecciona soporte de compras.\n\n` +
        `✅ Selecciona la **categoría correcta** para recibir ayuda más rápido.\n` +
        `📋 Proporciona **información detallada** al crear tu ticket.\n` +
        `🚫 **No abras múltiples tickets** para el mismo asunto.`
      )
      .setColor(THEME.colors.primary)
      .setFooter({ text: `Copyright © ${new Date().getFullYear()} | Soporte ${THEME.name}` })
      .setTimestamp();

    if (THEME.logo) embed.setThumbnail(THEME.logo);

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_open_soporte')
        .setLabel('Soporte')
        .setEmoji('🎧')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ticket_open_bug')
        .setLabel('Bugs')
        .setEmoji('🐛')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('ticket_open_compras')
        .setLabel('Compras')
        .setEmoji('🛒')
        .setStyle(ButtonStyle.Success),
    );

    await interaction.channel.send({ embeds: [embed], components: [row] });
    await interaction.editReply({ content: '✅ Panel de soporte publicado.' });
  },
};
