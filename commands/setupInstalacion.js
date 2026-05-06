const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');
const THEME = require('../utils/theme');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Dioses, Mods

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-instalacion')
    .setDescription('Publica la guía de instalación del modpack en este canal')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    await interaction.deferReply({ ephemeral: true });

    const embed = new EmbedBuilder()
      .setTitle('🌌 BIENVENIDO A COBBLEVERSE MMO — GUÍA DE INSTALACIÓN')
      .setColor(THEME.colors.primary)
      .setDescription(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📥 PASO 1 — Descarga el archivo\n` +
        `> Descarga el archivo que se encuentra **justo abajo de este mensaje** y guárdalo en tu computadora.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📦 PASO 2 — Descomprime el archivo\n` +
        `> Una vez descargado, **haz clic derecho** sobre el archivo y selecciona **"Extraer aquí"** o **"Descomprimir"**.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ⚙️ PASO 3 — Instala el modpack\n` +
        `> Dentro de la carpeta descomprimida encontrarás un archivo de **Modrinth**.\n` +
        `> **Haz doble clic** sobre él y se instalará automáticamente en tu launcher de Modrinth.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## ✅ PASO 4 — ¡Listo para jugar!\n` +
        `> Abre **Modrinth**, busca el perfil instalado y presiona **PLAY**.\n` +
        `> Conéctate al servidor con la IP: **\`cobbleversemmo.net\`**\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `⚠️ **IMPORTANTE** — Necesitas tener **Modrinth Launcher** instalado para que funcione.\n` +
        `Descárgalo en: https://modrinth.com/app\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `## 📥 Link de descarga del Modpack (Premium)\n` +
        `> https://drive.google.com/file/d/1h4yuDkA2qGS0ym_mc8U0WuoMu-kd10Nv/view?usp=sharing\n\n` +
        `❓ ¿Tienes problemas? Abre un ticket en <#1486773607542554864>`
      )
      .setFooter({ text: `${THEME.footer}` })
      .setTimestamp();

    await interaction.channel.send({ embeds: [embed] });
    await interaction.editReply({ content: '✅ Guía de instalación publicada.' });
  },
};
