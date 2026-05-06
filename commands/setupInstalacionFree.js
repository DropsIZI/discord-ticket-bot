const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-instalacion-free')
    .setDescription('Publica la guía de instalación para no premium en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('💎 COBBLEVERSE MMO — GUÍA PARA NO PREMIUM')
      .setColor(THEME.colors.secondary)
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📥 PASO 1 — Descarga SKLauncher\n` +
        `> Descarga el launcher desde: **https://skmedix.pl/downloads**\n` +
        `> ⚠️ **Si tienes AdBlock activado, la página no te dejará descargar.** Desactívalo temporalmente.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📦 PASO 2 — Descarga el Modpack de Cobbleverse\n` +
        `> https://drive.google.com/file/d/1h4yuDkA2qGS0ym_mc8U0WuoMu-kd10Nv/view?usp=sharing\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ⚙️ PASO 3 — Configura SKLauncher\n` +
        `> Abre **SKLauncher** y añade tu **Nickname**.\n` +
        `> Recuerda seleccionar **Modo sin Conexión**.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🛠️ PASO 4 — Importa el Modpack\n` +
        `> Ve al **Administrador de Instalación** y haz clic en **Importar Modpack**.\n` +
        `> Selecciona el archivo del modpack de Cobbleverse descargado antes.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎮 PASO 5 — Selecciona la versión\n` +
        `> Selecciona la versión instalada **(Cobbleverse)** en el launcher.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ✅ PASO 6 — ¡Conéctate y juega!\n` +
        `> Añade la IP del servidor: **\`cobbleversemmo.net\`** y presiona **PLAY**.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💎 **NOTA** — Configura al menos **6 GB de RAM** en el launcher.\n` +
        `Algunas versiones de los mods pueden variar con las actualizaciones.\n` +
        `❓ ¿Tienes problemas? Abre un ticket en <#1486773607542554864>`
      )
      .setFooter({ text: `${THEME.footer}` })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply({ content: '✅ Guía para no premium publicada.' });
  },
};
