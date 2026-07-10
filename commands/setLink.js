const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getLinks, setLink } = require('../utils/linkStore');

const ALLOWED_ROLES = ['1486544373297709077', '1486544806250418346']; // Owner, Mods

const LABELS = {
  modpack: 'Modpack principal (Premium + Free)',
  lite:    'Modpack Lite (Bajos recursos)',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('set-link')
    .setDescription('Actualiza el link de descarga del modpack')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(o =>
      o.setName('tipo')
        .setDescription('¿Qué link actualizar?')
        .setRequired(true)
        .addChoices(
          { name: 'Modpack principal (Premium + Free)', value: 'modpack' },
          { name: 'Modpack Lite (Bajos recursos)',      value: 'lite'    },
        )
    )
    .addStringOption(o =>
      o.setName('link')
        .setDescription('Nuevo link de descarga')
        .setRequired(true)
    ),

  async execute(interaction) {
    const hasRole = interaction.member.roles.cache.some(r => ALLOWED_ROLES.includes(r.id));
    if (!hasRole) {
      return interaction.reply({ content: '❌ No tienes permiso para usar este comando.', ephemeral: true });
    }

    const tipo = interaction.options.getString('tipo');
    const link = interaction.options.getString('link');

    setLink(tipo, link);

    const todos = getLinks();
    const resumen = Object.entries(LABELS)
      .map(([k, label]) => `> **${label}:**\n> ${todos[k] || '_sin configurar_'}`)
      .join('\n\n');

    await interaction.reply({
      content: `✅ Link de **${LABELS[tipo]}** actualizado.\n\n📋 Links actuales:\n${resumen}\n\n💡 Vuelve a publicar la guía con \`/setup-instalacion\`, \`/setup-instalacion-free\` o \`/setup-instalacion-lite\` para que aparezca el nuevo link.`,
      ephemeral: true,
    });
  },
};
