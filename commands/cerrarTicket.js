const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cerrar-ticket')
    .setDescription('Cierra este ticket')
    .addStringOption(opt =>
      opt.setName('motivo')
        .setDescription('Motivo del cierre (opcional)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const channel = interaction.channel;

    if (!channel.name.startsWith('bug-') &&
        !channel.name.startsWith('soporte-') &&
        !channel.name.startsWith('compra-')) {
      return interaction.reply({
        content: '❌ Este comando solo puede usarse dentro de un canal de ticket.',
        ephemeral: true,
      });
    }

    const motivo = interaction.options.getString('motivo') || 'Sin motivo especificado';

    const embed = new EmbedBuilder()
      .setTitle('🔒 Cerrando Ticket')
      .setDescription(`Este ticket será cerrado por **${interaction.user.tag}**.\n**Motivo:** ${motivo}`)
      .setColor(0xFF4444)
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_confirm_close')
        .setLabel('Confirmar cierre')
        .setEmoji('🔒')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('ticket_cancel_close')
        .setLabel('Cancelar')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
