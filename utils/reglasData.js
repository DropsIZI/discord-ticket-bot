const CATEGORIAS = [
  {
    emoji: '💎',
    titulo: 'Reglas Generales',
    reglas: [
      'Trata a todos con respeto. No se toleran insultos, discriminación ni acoso.',
      'Sigue las instrucciones del staff en todo momento.',
      'Nombres de usuario y skins deben ser apropiados.',
      'El idioma principal del servidor es el español.',
    ],
  },
  {
    emoji: '⚔️',
    titulo: 'Reglas de Jugabilidad',
    reglas: [
      'No se permite el PvP no consensuado fuera de zonas habilitadas.',
      'Respetar las zonas protegidas y propiedades de otros jugadores.',
      'No explotar mecánicas del juego para obtener ventajas injustas.',
    ],
  },
  {
    emoji: '🚫',
    titulo: 'Reglas AntiTrampas',
    reglas: [
      'El uso de hacks, cheats o cualquier mod que dé ventaja está prohibido.',
      'No se permite el uso de X-Ray ni recursos packs similares.',
      'Los exploits de bugs deben reportarse, no explotarse.',
    ],
  },
  {
    emoji: '🏗️',
    titulo: 'Construcciones y Mundo',
    reglas: [
      'No destruir construcciones ajenas (griefing).',
      'No robar ítems o recursos de otros jugadores.',
      'Mantén tu área de juego ordenada y sin lag machines.',
    ],
  },
  {
    emoji: '💬',
    titulo: 'Chat y Comunicación',
    reglas: [
      'No spam ni flood en ningún canal.',
      'No publicitar otros servidores.',
      'Evita escribir en mayúsculas excesivas.',
    ],
  },
  {
    emoji: '💰',
    titulo: 'Economía y Comercio',
    reglas: [
      'Todas las transacciones deben ser justas y transparentes.',
      'Las estafas están prohibidas y serán sancionadas.',
      'Reporta cualquier problema económico al Moderador disponible.',
    ],
  },
  {
    emoji: '🏛️',           // ← corregido (estaba corrupto: '🏛️')
    titulo: 'Reglas Específicas del Servidor',
    reglas: [
      'No está permitido el comercio real (comprar o vender Pokémon, objetos del juego, monedas o transacciones similares por dinero real).',
      'El uso de cuentas alternativas para obtener ventaja está prohibido y llevará a baneo. Puedes jugar en otra cuenta separada solo si NO transfieres cosas entre ellas.',
      'Macros o cualquier automatización con software externo o mods no está permitido.',
      'No bloquear el acceso a tus reclamos en Ultra Space.',
      'No se permiten casinos gestionados por jugadores.',
      'No hagas múltiples warps al mismo lugar y no crees nombres de warp de jugador similares a los warps del servidor.',
      'Debes esperar 5 minutos entre cada publicidad de tu tienda en el chat.',
      'Solo puedes tener 1 warp por tienda.',
      'No se permiten warps en los apodos.',
      'No renombres Pokémon y los listes en GTS para publicitar warps.',
      'El win trading/tirar partidas en ranked resulta en ban permanente.',
      'Para cualquier venta/publicidad/tienda en el juego, debes usar /ad antes del mensaje (los jugadores pueden activar/desactivar con /ad).',
    ],
  },
  {
    emoji: '📜',           // ← corregido (estaba corrupto: '📜')
    titulo: 'Disposiciones Finales',
    reglas: [
      'El Moderador tiene la última palabra en cualquier conflicto.',
      'El desconocimiento de las reglas no exime de su cumplimiento.',
      'Las sanciones van desde advertencias hasta bans permanentes.',
    ],
  },
];

module.exports = { CATEGORIAS };