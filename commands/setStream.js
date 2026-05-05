const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const STREAMER_ROLE = '1501077551311749161';

// Almacena links de streamers en memoria: userId -> url
const streamLinks = new Map();
module.exports.streamLinks = streamLinks;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-stream')
    .setDescription('Guarda el link de tu canal de stream')
    .addStringOption(option =>
      option
        .setName('link')
        .setDescription('Link de tu canal (Twitch, YouTube, TikTok, etc.)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.has(STREAMER_ROLE);
    if (!hasRole) {
      return interaction.reply({ content: '❌ Necesitas el rol de **Streamer** para usar este comando.', ephemeral: true });
    }

    const link = interaction.options.getString('link');
    streamLinks.set(interaction.user.id, link);

    await interaction.reply({
      content: `✅ Tu link de stream fue guardado: **${link}**\nAhora puedes usar \`/en-vivo\` para notificar que estás en directo.`,
      ephemeral: true,
    });
  },
};
