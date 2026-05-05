const { SlashCommandBuilder } = require('discord.js');
const { streamLinks } = require('../utils/streamStore');

const STREAMER_ROLE = '1501077551311749161';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-stream')
    .setDescription('Guarda el link de uno de tus canales de stream')
    .addStringOption(option =>
      option
        .setName('plataforma')
        .setDescription('Plataforma donde streameas')
        .setRequired(true)
        .addChoices(
          { name: 'TikTok',  value: 'TikTok' },
          { name: 'Kick',    value: 'Kick' },
          { name: 'Twitch',  value: 'Twitch' },
          { name: 'YouTube', value: 'YouTube' },
        )
    )
    .addStringOption(option =>
      option
        .setName('link')
        .setDescription('Link de tu canal en esa plataforma')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.has(STREAMER_ROLE);
    if (!hasRole) {
      return interaction.reply({ content: '❌ Necesitas el rol de **Streamer** para usar este comando.', ephemeral: true });
    }

    const plataforma = interaction.options.getString('plataforma');
    const link = interaction.options.getString('link');

    if (!streamLinks.has(interaction.user.id)) {
      streamLinks.set(interaction.user.id, new Map());
    }
    streamLinks.get(interaction.user.id).set(plataforma, link);

    const todos = [...streamLinks.get(interaction.user.id).entries()]
      .map(([p, l]) => `**${p}:** ${l}`)
      .join('\n');

    await interaction.reply({
      content: `✅ Link de **${plataforma}** guardado.\n\n📋 Tus canales registrados:\n${todos}`,
      ephemeral: true,
    });
  },
};
