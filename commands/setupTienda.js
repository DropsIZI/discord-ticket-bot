const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-tienda')
    .setDescription('Publica el mensaje de la tienda en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('🏆  Tienda Oficial — CobbleverseMMO')
      .setColor(THEME.colors.primary)
      .setDescription(
        `## ⚡ ¿Quieres ser el mejor Entrenador de CobbleverseMMO?\n` +
        `> Obtén rangos exclusivos con beneficios únicos y apoya el crecimiento del servidor.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎖️ Rangos Disponibles\n\n` +
        `> 🟡 **Entrenador** — \`$9.99\`\n` +
        `> 🟠 **Criador** — \`$19.99\`\n` +
        `> 🔵 **Investigador** — \`$29.99\`\n` +
        `> 🟢 **Ranger** — \`$39.99\`\n` +
        `> 🔴 **Líder** — \`$49.99\`\n` +
        `> 👑 **Alto Mando** — \`$99.99\`\n` +
        `> ✨ *¡Y muchos más esperándote en la tienda!*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ✨ Beneficios de tener un rango\n\n` +
        `> 🌟 Apoya el servidor y mantén el proyecto vivo\n` +
        `> 🎨 Prefijos y colores exclusivos en el chat\n` +
        `> 🎁 Permisos y beneficios especiales en el juego\n` +
        `> 👑 Acceso a canales y eventos exclusivos\n` +
        `> 🚀 Destaca entre todos los jugadores\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎉 OFERTA DE LANZAMIENTO\n` +
        `> ⏳ **¡Primer mes todo a mitad de precio!**\n` +
        `> No dejes pasar esta oportunidad exclusiva por tiempo limitado.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `🛒 **Tienda →** https://cobbleversemmo.tebex.io\n` +
        `🎵 **TikTok →** https://www.tiktok.com/@cobbleversemmo.net\n\n` +
        `> ❤️ Cada compra contribuye directamente al crecimiento de **CobbleverseMMO**.`
      )
      .setImage('https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner_v2.png')
      .setFooter({ text: `${THEME.footer} • Pagos 100% seguros` })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('🛒 Ir a la Tienda')
        .setURL('https://cobbleversemmo.tebex.io')
        .setStyle(ButtonStyle.Link),
      new ButtonBuilder()
        .setLabel('🎵 TikTok')
        .setURL('https://www.tiktok.com/@cobbleversemmo.net')
        .setStyle(ButtonStyle.Link)
    );

    await interaction.channel.send({ embeds: [embed], components: [row] });
    await interaction.editReply({ content: '✅ Mensaje de tienda publicado.' });
  },
};
