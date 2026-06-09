const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} = require('discord.js');
const { TICKET_TYPES, addTicket, removeTicket, getTicketCount } = require('../utils/ticketManager');
const THEME = require('../utils/theme');
const { CATEGORIAS } = require('../utils/reglasData');

const MAX_TICKETS = parseInt(process.env.MAX_TICKETS_PER_USER || '3');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    // ── Slash commands ──────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        const msg = { content: '❌ Ocurrió un error al ejecutar el comando.', ephemeral: true };
        interaction.replied ? interaction.followUp(msg) : interaction.reply(msg);
      }
      return;
    }

    if (!interaction.isButton()) return;
    const { customId, guild, user } = interaction;

    // ── Abrir ticket ────────────────────────────────────────────
    if (customId.startsWith('ticket_open_')) {
      const type = customId.replace('ticket_open_', '');
      const ticketConfig = TICKET_TYPES[type];
      if (!ticketConfig) return;

      if (getTicketCount(user.id) >= MAX_TICKETS) {
        return interaction.reply({
          content: `❌ Ya tienes **${MAX_TICKETS}** tickets abiertos. Cierra uno antes de abrir otro.`,
          ephemeral: true,
        });
      }

      await interaction.deferReply({ ephemeral: true });

      try {
        const OWNER_ROLE_ID = '1486544373297709077';
        const isQueja = type === 'queja';

        // Categoría de Discord — separada para quejas
        const categoryName = isQueja
          ? `🔒 Quejas al Staff — ${THEME.name}`
          : `🎫 Tickets — ${THEME.name}`;

        const categoryPerms = isQueja
          ? [
              { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
              { id: OWNER_ROLE_ID, allow: [PermissionFlagsBits.ViewChannel] },
            ]
          : undefined;

        let category = guild.channels.cache.find(
          c => c.type === ChannelType.GuildCategory && c.name === categoryName
        );
        if (!category) {
          category = await guild.channels.create({
            name: categoryName,
            type: ChannelType.GuildCategory,
            ...(categoryPerms && { permissionOverwrites: categoryPerms }),
          });
        }

        const supportRoleId = process.env.SUPPORT_ROLE_ID;
        const channelName = `${ticketConfig.prefix}-${user.username.toLowerCase().replace(/\s+/g, '-')}`;

        const permissionOverwrites = [
          { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
          {
            id: user.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.EmbedLinks,
            ],
          },
          {
            id: OWNER_ROLE_ID,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ManageMessages,
              PermissionFlagsBits.AttachFiles,
            ],
          },
        ];

        if (!isQueja) {
          if (supportRoleId) {
            permissionOverwrites.push({
              id: supportRoleId,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ManageMessages,
                PermissionFlagsBits.AttachFiles,
              ],
            });
          }

          permissionOverwrites.push({
            id: '1495438511690485830', // Helper
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
            ],
          });
        }

        const ticketChannel = await guild.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          parent: category.id,
          permissionOverwrites,
        });

        addTicket(user.id, ticketChannel.id);

        const welcomeEmbed = new EmbedBuilder()
          .setTitle(`${ticketConfig.emoji}  Ticket de ${ticketConfig.label}`)
          .setDescription(
            `Hola ${user}, gracias por contactar al soporte de **${THEME.name}**.\n\n` +
            `Por favor responde las siguientes preguntas:\n\n` +
            ticketConfig.questions.map(q => `> ${q}`).join('\n\n') +
            `\n\n✅ Un agente revisará tu ticket en breve.`
          )
          .setColor(ticketConfig.color)
          .setFooter({ text: `${THEME.footer} • Ticket de ${user.username}` })
          .setTimestamp();

        if (THEME.logo) welcomeEmbed.setThumbnail(THEME.logo);

        const closeRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('ticket_confirm_close')
            .setLabel('Cerrar ticket')
            .setEmoji('🔒')
            .setStyle(ButtonStyle.Danger)
        );

        const pingRoles = {
          soporte: '1495438511690485830', // Helper
          bug:     '1486544806250418346', // Mods
          compras: '1486544373297709077', // Dioses (Owner)
          queja:   '1486544373297709077', // Dioses (Owner) — solo ellos ven las quejas
        };
        const pingRole = pingRoles[type];

        await ticketChannel.send({
          content: `${user}${pingRole ? ` | <@&${pingRole}>` : ''}`,
          embeds: [welcomeEmbed],
          components: [closeRow],
        });

        await interaction.editReply({ content: `✅ Tu ticket fue creado: ${ticketChannel}` });
      } catch (err) {
        console.error('[ticket_open]', err);
        await interaction.editReply({ content: '❌ Ocurrió un error al crear el ticket. Inténtalo de nuevo.' }).catch(() => {});
      }
    }

    // ── Reglas del servidor (ver todas las reglas) ─────────────
    if (customId === 'reglas_ver_todas') {
      await interaction.deferReply({ ephemeral: true });
      try {
        const allEmbed = new EmbedBuilder()
          .setTitle(`📖  Todas las reglas de ${THEME.name}`)
          .setColor(THEME.colors.secondary)
          .setDescription(
            CATEGORIAS.map((c, ci) => `**${ci + 1}. ${c.emoji} ${c.titulo}**\n${c.reglas.map(r => `• ${r}`).join('\n')}`).join('\n\n')
          )
          .setFooter({ text: `Copyright © ${new Date().getFullYear()} | ${THEME.name}` });

        return interaction.editReply({ embeds: [allEmbed] });
      } catch (err) {
        console.error('[reglas_ver_todas]', err);
        await interaction.editReply({ content: '❌ Error al mostrar las reglas.' }).catch(() => {});
      }
    }

    // ── Confirmar cierre ────────────────────────────────────────
    if (customId === 'ticket_confirm_close') {
      await interaction.deferUpdate();
      try {
        const channel = interaction.channel;

        const closingEmbed = new EmbedBuilder()
          .setTitle('🔒  Ticket Cerrado')
          .setDescription(
            `Este ticket fue cerrado por **${user.username}**.\n` +
            `El canal se eliminará en **5 segundos**.`
          )
          .setColor(THEME.colors.danger)
          .setFooter({ text: THEME.footer })
          .setTimestamp();

        await channel.send({ embeds: [closingEmbed] });

        const overwrites = channel.permissionOverwrites.cache;
        for (const [id] of overwrites) removeTicket(id, channel.id);

        setTimeout(() => channel.delete().catch(console.error), 5000);
      } catch (err) {
        console.error('[ticket_confirm_close]', err);
      }
    }

    // ── Cancelar cierre ─────────────────────────────────────────
    if (customId === 'ticket_cancel_close') {
      try {
        await interaction.update({ components: [] });
        await interaction.followUp({ content: '✅ Cierre cancelado.', ephemeral: true });
      } catch (err) {
        console.error('[ticket_cancel_close]', err);
      }
    }
  },
};
