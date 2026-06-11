// Fursona Generation Data
const SPECIES = [
  'Wolf', 'Fox', 'Cat', 'Dog', 'Rabbit', 'Dragon', 'Horse', 'Deer',
  'Bear', 'Raccoon', 'Otter', 'Squirrel', 'Bird', 'Lizard', 'Shark',
  'Hyena', 'Panther', 'Tiger', 'Lion', 'Cheetah', 'Leopard', 'Jaguar',
  'Coyote', 'Jackal', 'Dingo', 'Husky', 'Malamute', 'Akita', 'Shiba',
  'Border Collie', 'German Shepherd', 'Golden Retriever', 'Labrador',
  'Poodle', 'Corgi', 'Pug', 'Bulldog', 'Beagle', 'Dachshund',
  'Siamese', 'Maine Coon', 'Persian', 'Bengal', 'Sphynx', 'Ragdoll',
  'Red Panda', 'Giant Panda', 'Koala', 'Kangaroo', 'Platypus', 'Echidna',
  'Arctic Fox', 'Fennec Fox', 'Gray Fox', 'Kit Fox', 'Swift Fox'
];

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B500', '#00CED1',
  '#FF69B4', '#32CD32', '#FFD700', '#FF4500', '#9370DB', '#20B2AA',
  '#FF8C00', '#ADFF2F', '#DA70D6', '#00FA9A', '#F0E68C', '#E6E6FA'
];

const PATTERNS = [
  'Solid', 'Tabby', 'Calico', 'Tortoiseshell', 'Tuxedo', 'Spotted',
  'Striped', 'Marbled', 'Merle', 'Brindle', 'Roan', 'Appaloosa',
  'Piebald', 'Sable', 'Agouti', 'Pointed', 'Mitted', 'Bicolor',
  'Harlequin', 'Irish Spotting', 'Ticking', 'Countershading'
];

const EYE_COLORS = [
  '#8B4513', '#654321', '#2E8B57', '#4682B4', '#FFD700', '#FF6347',
  '#9370DB', '#00FF00', '#FF1493', '#00BFFF', '#8A2BE2', '#FF4500',
  '#20B2AA', '#DAA520', '#FF69B4', '#32CD32', '#FF8C00', '#DC143C'
];

const PERSONALITIES = [
  'Playful', 'Shy', 'Bold', 'Curious', 'Lazy', 'Energetic', 'Grumpy',
  'Friendly', 'Aloof', 'Mischievous', 'Serious', 'Goofy', 'Protective',
  'Independent', 'Clingy', 'Anxious', 'Confident', 'Gentle', 'Feisty',
  'Dreamy', 'Pragmatic', 'Artistic', 'Analytical', 'Chaotic', 'Organized'
];

const ACCESSORIES = [
  'Collar', 'Bandana', 'Bow tie', 'Scarf', 'Glasses', 'Sunglasses',
  'Hat', 'Beanie', 'Headphones', 'Choker', 'Pendant', 'Bracelet',
  'Anklet', 'Tail ring', 'Ear piercing', 'Nose ring', 'Wing clips',
  'Halo', 'Crown', 'Tiara', 'Hoodie', 'Jacket', 'Vest', 'Cape',
  'Wings', 'Prosthetic limb', 'Cyborg parts', 'Glitch effect', 'Aura'
];

const BACKSTORIES = [
  'A wandering traveler seeking adventure',
  'A guardian of an ancient forest',
  'A street-smart city dweller',
  'A retired hero living quietly',
  'A magical familiar to a wizard',
  'A scientist experimenting with transformation',
  'A performer in a traveling circus',
  'A lost royal from a fallen kingdom',
  'A cybernetic being in a neon city',
  'A spirit guardian of a sacred spring',
  'A chef famous for exotic cuisine',
  'A musician in an underground band',
  'A librarian of forbidden knowledge',
  'A pilot of a steam-powered airship',
  'A student at a academy for the gifted'
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateFursona() {
  const species = getRandomElement(SPECIES);
  const baseColor = getRandomElement(COLORS);
  const secondaryColor = getRandomElement(COLORS.filter(c => c !== baseColor));
  const accentColor = getRandomElement(COLORS.filter(c => c !== baseColor && c !== secondaryColor));
  const pattern = getRandomElement(PATTERNS);
  const eyeColor = getRandomElement(EYE_COLORS);
  const personality = getRandomElements(PERSONALITIES, 3);
  const accessories = getRandomElements(ACCESSORIES, Math.floor(Math.random() * 3) + 1);
  const backstory = getRandomElement(BACKSTORIES);

  // Generate name
  const prefixes = ['Ash', 'Blaze', 'Cloud', 'Dawn', 'Echo', 'Frost', 'Gale', 'Haze', 'Iris', 'Jade', 'Kai', 'Luna', 'Mist', 'Nova', 'Onyx', 'Piper', 'Quinn', 'Raven', 'Sage', 'Tide', 'Umbra', 'Vale', 'Willow', 'Xen', 'Yuki', 'Zephyr'];
  const suffixes = ['paw', 'tail', 'fur', 'claw', 'fang', 'whisker', 'ear', 'nose', 'eye', 'heart', 'soul', 'spirit', 'wind', 'storm', 'flame', 'frost', 'shadow', 'light', 'star', 'moon', 'sun', 'sky', 'sea', 'earth', 'void', 'dream'];
  const name = getRandomElement(prefixes) + getRandomElement(suffixes);

  // Generate age
  const age = Math.floor(Math.random() * 500) + 18;

  // Generate height/weight
  const heightCm = Math.floor(Math.random() * 100) + 100;
  const weightKg = Math.floor(Math.random() * 100) + 40;

  // Special traits
  const specialTraits = [
    'Heterochromia', 'Glowing markings', 'Multiple tails', 'Wings', 'Horns',
    'Scales', 'Feathers', 'Bioluminescence', 'Shapeshifting', 'Telepathy',
    'Elemental affinity', 'Phasing', 'Invisibility', 'Regeneration',
    'Luck manipulation', 'Dream walking', 'Time perception', 'Sound vision'
  ];
  const numTraits = Math.floor(Math.random() * 3);
  const traits = getRandomElements(specialTraits, numTraits);

  return {
    name,
    species,
    age,
    heightCm,
    weightKg,
    baseColor,
    secondaryColor,
    accentColor,
    pattern,
    eyeColor,
    personality,
    accessories,
    traits,
    backstory
  };
}

function createFursonaEmbed(fursona, user) {
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

  const embed = new EmbedBuilder()
    .setTitle(`🎨 Your Fursona: ${fursona.name}`)
    .setColor(fursona.baseColor)
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: '🐾 Species', value: fursona.species, inline: true },
      { name: '🎂 Age', value: `${fursona.age} years`, inline: true },
      { name: '📏 Height', value: `${fursona.heightCm} cm`, inline: true },
      { name: '⚖️ Weight', value: `${fursona.weightKg} kg`, inline: true },
      { name: '🎨 Base Color', value: `\`${fursona.baseColor}\``, inline: true },
      { name: '🎨 Secondary', value: `\`${fursona.secondaryColor}\``, inline: true },
      { name: '🎨 Accent', value: `\`${fursona.accentColor}\``, inline: true },
      { name: '👁️ Eye Color', value: `\`${fursona.eyeColor}\``, inline: true },
      { name: '🌈 Pattern', value: fursona.pattern, inline: true },
      { name: '💫 Personality', value: fursona.personality.join(', '), inline: false },
      { name: '🎒 Accessories', value: fursona.accessories.join(', ') || 'None', inline: false }
    );

  if (fursona.traits.length > 0) {
    embed.addFields({ name: '✨ Special Traits', value: fursona.traits.join(', '), inline: false });
  }

  embed.addFields({ name: '📖 Backstory', value: fursona.backstory, inline: false })
    .setFooter({ text: `Generated for ${user.username}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp();

  // Color preview row
  const colorRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('color_base')
      .setLabel('Base')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId('color_secondary')
      .setLabel('Secondary')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId('color_accent')
      .setLabel('Accent')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId('color_eyes')
      .setLabel('Eyes')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true)
  );

  // Action buttons
  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('regenerate')
      .setLabel('🔄 Regenerate')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('save')
      .setLabel('💾 Save')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('share')
      .setLabel('📤 Share')
      .setStyle(ButtonStyle.Secondary)
  );

  return { embeds: [embed], components: [colorRow, actionRow] };
}

module.exports = { generateFursona, createFursonaEmbed, SPECIES, COLORS, PATTERNS, EYE_COLORS, PERSONALITIES, ACCESSORIES, BACKSTORIES };