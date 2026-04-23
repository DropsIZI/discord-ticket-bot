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

  // Overlay degradado de izquierda a derecha
  const overlay = ctx.createLinearGradient(0, 0, canvas.width, 0);
  overlay.addColorStop(0, 'rgba(0,0,0,0.85)');
  overlay.addColorStop(0.6, 'rgba(0,0,0,0.55)');
  overlay.addColorStop(1, 'rgba(0,0,0,0.1)');
  ctx.fillStyle = overlay;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Avatar circular
  const avatarSize = 120;
  const centerY = canvas.height / 2;
  const avatarX = 40;
  const avatarY = centerY - avatarSize / 2;
  const avatarUrl = member.user.displayAvatarURL({ extension: 'png', size: 256 });

  // Glow dorado detrás del avatar
  ctx.shadowColor = '#F0B132';
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, centerY, avatarSize / 2 + 4, 0, Math.PI * 2);
  ctx.strokeStyle = '#F0B132';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, centerY, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  const avatar = await loadImage(avatarUrl);
  ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  const textX = avatarX + avatarSize + 28;

  // Línea decorativa dorada
  ctx.fillStyle = '#F0B132';
  ctx.fillRect(textX, 60, 3, 180);

  const textStart = textX + 16;

  // Texto superior pequeño
  ctx.font = '18px Roboto';
  ctx.fillStyle = '#F0B132';
  ctx.fillText('¡BIENVENIDO/A A COBBLEVERSEMMO!', textStart, 95);

  // Nombre del usuario grande
  ctx.font = 'bold 48px Roboto';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 8;
  ctx.fillText(member.user.username, textStart, 155);
  ctx.shadowBlur = 0;

  // Separador
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(textStart, 168, 420, 1);

  // Miembro número X
  ctx.font = '20px Roboto';
  ctx.fillStyle = '#CCCCCC';
  const memberCount = member.guild.memberCount;
  ctx.fillText(`Miembro #${memberCount}`, textStart, 200);

  // Tienda
  ctx.font = '18px Roboto';
  ctx.fillStyle = '#5BC8F5';
  ctx.fillText('🛒 cobbleversemmo.tebex.io', textStart, 230);

  return canvas.toBuffer('image/png');
}

module.exports = { generateWelcomeCard };
