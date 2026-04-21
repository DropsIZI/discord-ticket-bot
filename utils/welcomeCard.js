const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const path = require('path');
const fs = require('fs');

const BG_PATH = path.join(__dirname, '../assets/welcome-bg.png');
const FONT_PATH = path.join(__dirname, '../assets/font-bold.ttf');

GlobalFonts.register(fs.readFileSync(FONT_PATH), 'Roboto');

async function generateWelcomeCard(member) {
  const canvas = createCanvas(800, 300);
  const ctx = canvas.getContext('2d');

  // Fondo
  try {
    const bg = await loadImage(BG_PATH);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  } catch {
    // Fondo degradado si no hay imagen
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#1a1a2e');
    grad.addColorStop(1, '#16213e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Overlay oscuro semitransparente
  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Avatar circular
  const avatarSize = 130;
  const avatarX = 80;
  const avatarY = canvas.height / 2 - avatarSize / 2;
  const avatarUrl = member.user.displayAvatarURL({ extension: 'png', size: 256 });

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const avatar = await loadImage(avatarUrl);
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  // Borde del avatar
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2 + 3, 0, Math.PI * 2);
  ctx.strokeStyle = '#F0B132';
  ctx.lineWidth = 4;
  ctx.stroke();

  const textX = avatarX + avatarSize + 30;

  // Texto "¡Bienvenido/a!"
  ctx.font = 'bold 28px Roboto';
  ctx.fillStyle = '#F0B132';
  ctx.fillText('¡Bienvenido/a a CobbleverseMMO!', textX, 110);

  // Nombre del usuario
  ctx.font = 'bold 42px Roboto';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(member.user.username, textX, 165);

  // Miembro número X
  ctx.font = '22px Roboto';
  ctx.fillStyle = '#AAAAAA';
  const memberCount = member.guild.memberCount;
  ctx.fillText(`Eres el miembro #${memberCount} del servidor`, textX, 210);

  // Tienda
  ctx.font = '18px Roboto';
  ctx.fillStyle = '#5BC8F5';
  ctx.fillText('🛒 cobbleversemmo.tebex.io', textX, 248);

  return canvas.toBuffer('image/png');
}

module.exports = { generateWelcomeCard };
