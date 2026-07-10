const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');
const { getLinks } = require('../utils/linkStore');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-instalacion-lite')
    .setDescription('Publica la guía de instalación para usuarios de bajos recursos')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const { lite: link } = getLinks();

    const embed = new EmbedBuilder()
      .setTitle('💡 COBBLEVERSE MMO — GUÍA PARA BAJOS RECURSOS')
      .setColor(THEME.colors.success)
      .setDescription(
        `> Esta guía es para jugadores con computadoras de **bajos recursos**.\n` +
        `> Usa una versión más liviana del modpack para que el juego corra mejor. ✅\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📥 PASO 1 — Descarga SKLauncher\n` +
        `> Es el programa que necesitas para abrir el juego.\n` +
        `> Descárgalo aquí: **https://skmedix.pl/downloads**\n` +
        `> ⚠️ **Si tienes AdBlock activo, desactívalo para poder descargar.**\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📦 PASO 2 — Descarga el Modpack Lite\n` +
        `> Este modpack es más liviano y está optimizado para que el juego vaya fluido.\n` +
        `> ${link || '_Link no configurado — usa /set-link_'}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ⚙️ PASO 3 — Abre SKLauncher\n` +
        `> Abre el programa que descargaste.\n` +
        `> Pon tu **Nickname** (el nombre con el que quieres jugar).\n` +
        `> Selecciona **Modo sin Conexión**.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🛠️ PASO 4 — Importa el Modpack\n` +
        `> Dentro del programa busca **Administrador de Instalación**.\n` +
        `> Haz clic en **Importar Modpack**.\n` +
        `> Selecciona el archivo que descargaste en el Paso 2.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 🎮 PASO 5 — Selecciona la versión\n` +
        `> Busca la versión que se instaló **(Cobbleverse)** y selecciónala.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ✅ PASO 6 — ¡Entra al servidor!\n` +
        `> Agrega la IP: **\`cobbleversemmo.net\`** y presiona **PLAY**.\n` +
        `> ¡Listo, ya estás jugando! 🎉\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `💡 **CONSEJO** — Pon al menos **4 GB de RAM** en el launcher para mejor rendimiento.\n` +
        `❓ ¿Tienes problemas? Abre un ticket en <#1486773607542554864>`
      )
      .setFooter({ text: `${THEME.footer}` })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply({ content: '✅ Guía para bajos recursos publicada.' });
  },
};
