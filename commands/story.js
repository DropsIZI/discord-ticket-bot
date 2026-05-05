const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = [
  '1486544373297709077', // Dioses
  '1486545346757787688',
  '1500337427276103850',
  '1486544806250418346', // Mods
  '1495438511690485830', // Helper
  '1501077551311749161', // Streamer
];

const STORY_CHANNEL = '1486544373297709077';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('story')
    .setDescription('Publica una story de Instagram en el canal')
    .addStringOption(option =>
      option
        .setName('usuario')
        .setDescription('Nombre de usuario de Instagram')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('link')
        .setDescription('Link de la story o perfil de Instagram')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('descripcion')
        .setDescription('Descripción o mensaje adicional (opcional)')
        .setRequired(false)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    const usuario = interaction.options.getString('usuario');
    const link = interaction.options.getString('link');
    const descripcion = interaction.options.getString('descripcion');

    const channel = await interaction.guild.channels.fetch(STORY_CHANNEL).catch(() => null);
    if (!channel) {
      return interaction.reply({ content: '❌ No se encontró el canal.', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setTitle('📸  Nueva Story en Instagram')
      .setColor(0xE1306C)
      .setDescription(
        `### @${usuario} acaba de subir una story 🔥\n\n` +
        (descripcion ? `> ${descripcion}\n\n` : '') +
        `🔗 ${link}`
      )
      .setFooter({ text: `${THEME.footer} • Publicado por ${interaction.user.username}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: '✅ Story publicada.', ephemeral: true });
  },
};
