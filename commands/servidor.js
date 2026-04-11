const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { getServerStatus, MC_IP } = require('../utils/minecraftStatus');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

const THUMBNAIL = 'https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/ball.png';
const BANNER    = 'https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner.png';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servidor')
    .setDescription('Publica el estado actual del servidor de Minecraft')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const s = await getServerStatus();
    const hours = parseFloat(process.env.MC_ANNOUNCE_INTERVAL_HOURS || '6');

    const embed = new EmbedBuilder()
      .setTitle(`🌍  CobbleverseMMO — Servidor Cobblemon`)
      .setColor(s.online ? THEME.colors.primary : THEME.colors.danger)
      .setDescription(
        s.online
          ? `### ¡El servidor está **en línea**! ⚡\n> Únete a la aventura Pokémon y atrapa, entrena y combate con tus Pokémon favoritos.`
          : `### El servidor está **fuera de línea** 😴\n> Vuelve pronto, ¡la aventura te espera!`
      )
      .addFields(
        { name: '🌐 Dirección IP', value: `\`\`\`${MC_IP}\`\`\``, inline: false },
        { name: '📶 Estado', value: s.online ? '🟢 En línea' : '🔴 Fuera de línea', inline: true },
      )
      .setThumbnail(THUMBNAIL)
      .setImage(BANNER)
      .setFooter({ text: `${THEME.footer} • Próximo anuncio en ~${hours}h` })
      .setTimestamp();

    if (s.online) {
      embed.addFields(
        { name: '👥 Jugadores', value: `**${s.players}** / ${s.maxPlayers}`, inline: true },
        { name: '🎮 Versión', value: s.version, inline: true },
      );
    }

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply({ content: '✅ Estado del servidor publicado.' });
  },
};
