const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require('discord.js');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('decir')
    .setDescription('El bot envía un mensaje en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option
        .setName('mensaje')
        .setDescription('El mensaje que enviará el bot')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    const mensaje = interaction.options.getString('mensaje').replace(/\\n/g, '\n');

    await interaction.channel.send(mensaje);
    await interaction.reply({ content: '✅ Mensaje enviado.', ephemeral: true });
  },
};
