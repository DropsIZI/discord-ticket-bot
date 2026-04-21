const { SlashCommandBuilder, AttachmentBuilder, PermissionFlagsBits } = require('discord.js');
const { generateWelcomeCard } = require('../utils/welcomeCard');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test-bienvenida')
    .setDescription('Previsualiza la tarjeta de bienvenida')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const buffer = await generateWelcomeCard(interaction.member);
    const attachment = new AttachmentBuilder(buffer, { name: 'bienvenida.png' });

    await interaction.editReply({ content: '👋 Así se verá la tarjeta de bienvenida:', files: [attachment] });
  },
};
