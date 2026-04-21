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
        `### ¿Quieres destacar en tu aventura Pokémon? ⚡\n` +
        `> Obtén rangos exclusivos y beneficios únicos que mejorarán tu experiencia en **CobbleverseMMO**.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎖️ Rangos Disponibles\n\n` +
        `🟡 **Entrenador** — $9.99\n` +
        `> El inicio de toda gran aventura Pokémon.\n\n` +
        `🟠 **Criador** — $19.99\n` +
        `> Para quienes dominan la cría y el cuidado de Pokémon.\n\n` +
        `🔵 **Investigador** — $29.99\n` +
        `> Explora y descubre los secretos del mundo Cobblemon.\n\n` +
        `🟢 **Ranger** — $39.99\n` +
        `> Protege y domina las rutas del servidor.\n\n` +
        `🔴 **Líder** — $49.99\n` +
        `> Lidera con poder y prestigio en CobbleverseMMO.\n\n` +
        `👑 **Alto Mando** — $99.99\n` +
        `> El rango más exclusivo. Solo para los verdaderos Campeones.\n\n` +
        `> ✨ *¡Y muchos rangos más esperándote en la tienda!*\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎉 OFERTA DE LANZAMIENTO — ¡Primer mes todo a mitad de precio!\n` +
        `> Aprovecha esta oferta exclusiva por tiempo limitado. ⏳\n` +
        `> Usa el código o accede directo desde el botón para obtener tu descuento.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ✨ ¿Por qué comprar un rango?\n\n` +
        `🌟 Apoya el servidor y mantén el proyecto vivo\n` +
        `🎨 Prefijos y colores exclusivos en el chat\n` +
        `🎁 Beneficios y permisos especiales en el juego\n` +
        `👑 Acceso a canales y eventos exclusivos\n` +
        `🚀 Destaca entre todos los jugadores\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `> 🛒 Visita nuestra tienda y elige tu rango favorito.\n` +
        `> Cada compra contribuye directamente al crecimiento de **CobbleverseMMO**. ❤️\n\n` +
        `🔗 **https://cobbleversemmo.tebex.io**`
      )
      .setImage('https://raw.githubusercontent.com/DropsIZI/discord-ticket-bot/master/assets/banner_v2.png')
      .setFooter({ text: `${THEME.footer} • Pagos 100% seguros` })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('🛒 Ir a la Tienda')
        .setURL('https://cobbleversemmo.tebex.io')
        .setStyle(ButtonStyle.Link)
    );

    await interaction.channel.send({ embeds: [embed], components: [row] });
    await interaction.editReply({ content: '✅ Mensaje de tienda publicado.' });
  },
};
