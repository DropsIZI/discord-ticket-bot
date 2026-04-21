const { AttachmentBuilder } = require('discord.js');
const { generateWelcomeCard } = require('../utils/welcomeCard');

const WELCOME_CHANNEL_ID = '1495394965684092990';

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const channel = await member.guild.channels.fetch(WELCOME_CHANNEL_ID).catch(() => null);
      if (!channel) return;

      const buffer = await generateWelcomeCard(member);
      const attachment = new AttachmentBuilder(buffer, { name: 'bienvenida.png' });

      await channel.send({
        content: `¡Hola ${member}! Bienvenido/a al servidor. 🎉`,
        files: [attachment],
      });
    } catch (err) {
      console.error('Error al generar tarjeta de bienvenida:', err);
    }
  },
};
