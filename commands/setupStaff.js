const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Owner, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-staff')
    .setDescription('Publica las instrucciones del staff en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('📋  Instrucciones del Staff — CobbleverseMMO')
      .setColor(THEME.colors.primary)
      .setDescription(
        `Bienvenido al equipo de **CobbleverseMMO**. Aquí encontrarás todo lo que necesitas saber para gestionar el servidor correctamente.\n\n` +

        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

        `## 🔗 Actualizar links de descarga del modpack\n\n` +
        `Cuando el modpack se actualice y cambie el link de descarga, sigue estos pasos:\n\n` +
        `**1.** Usa el comando:\n` +
        `> \`/set-link tipo: link:\`\n` +
        `> — Elige **Modpack principal** si cambia el link del modpack normal (Premium y Free usan el mismo).\n` +
        `> — Elige **Modpack Lite** si cambia el link de la versión para bajos recursos.\n\n` +
        `**2.** Ve al canal de instalación correspondiente y **borra el mensaje antiguo** de la guía.\n\n` +
        `**3.** Publica la guía actualizada con el comando correcto:\n` +
        `> \`/setup-instalacion\` → Guía Premium (Modrinth)\n` +
        `> \`/setup-instalacion-free\` → Guía Free (SKLauncher)\n` +
        `> \`/setup-instalacion-lite\` → Guía Lite (Bajos recursos)\n\n` +
        `> ⚠️ **Importante:** los links se guardan en el servidor. Si el bot se redespliega desde cero, vuelve a ejecutar \`/set-link\` con el link actual antes de publicar las guías.\n\n` +

        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

        `## 🎫 Sistema de tickets\n\n` +
        `Los tickets se crean automáticamente cuando un usuario pulsa un botón en el panel de soporte.\n\n` +
        `**Tipos de ticket y quién recibe el ping:**\n` +
        `> 🎧 **Soporte** — se notifica a los **Helpers**\n` +
        `> 🐛 **Bug** — se notifica a los **Mods y Admins**\n` +
        `> 🛒 **Compras** — se notifica a los **Owners**\n` +
        `> 📢 **Quejas al Staff** — se notifica a los **Owners** únicamente (canal privado, solo Owners lo ven)\n\n` +
        `**Acceso a los canales de ticket:**\n` +
        `> Todos los roles del staff (Helper, Mod, Admin, Owner) pueden **ver y escribir** en todos los tickets normales.\n` +
        `> Los tickets de **Quejas al Staff** solo los pueden ver los **Owners** y el usuario que lo abrió.\n\n` +
        `**Para cerrar un ticket:**\n` +
        `> Pulsa el botón 🔒 **Cerrar ticket** dentro del canal. El canal se eliminará automáticamente a los 5 segundos.\n\n` +

        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +

        `## 📢 Comandos útiles del staff\n\n` +
        `> \`/decir\` — El bot envía un mensaje en el canal actual (solo Owners y Mods)\n` +
        `> \`/set-link\` — Actualiza el link de descarga del modpack\n` +
        `> \`/setup-tickets\` — Publica el panel de soporte\n` +
        `> \`/setup-reglas\` — Publica las reglas del servidor\n` +
        `> \`/setup-tienda\` — Publica el panel de la tienda\n` +
        `> \`/setup-instalacion\` — Publica la guía de instalación Premium\n` +
        `> \`/setup-instalacion-free\` — Publica la guía Free\n` +
        `> \`/setup-instalacion-lite\` — Publica la guía Lite\n` +
        `> \`/servidor\` — Muestra el estado actual del servidor Minecraft`
      )
      .setFooter({ text: `${THEME.footer} • Solo visible para el staff` })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply({ content: '✅ Instrucciones del staff publicadas.' });
  },
};
