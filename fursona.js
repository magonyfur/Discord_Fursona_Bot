const config = require('./config.js');

// ============================================
// FURSONA GENERATION DATA & LOGIC
// ============================================

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
  'Dreamy', 'Pragmatic', 'Artistic', 'Analytical', 'Chaotic', 'Organized',
  'Loyal', 'Stubborn', 'Optimistic', 'Cynical', 'Romantic', 'Cynical'
];

const ACCESSORIES = [
  'Collar', 'Bandana', 'Bow tie', 'Scarf', 'Glasses', 'Sunglasses',
  'Hat', 'Beanie', 'Headphones', 'Choker', 'Pendant', 'Bracelet',
  'Anklet', 'Tail ring', 'Ear piercing', 'Nose ring', 'Wing clips',
  'Halo', 'Crown', 'Tiara', 'Hoodie', 'Jacket', 'Vest', 'Cape',
  'Wings', 'Prosthetic limb', 'Cyborg parts', 'Glitch effect', 'Aura',
  'Reading glasses', 'Monocle', 'Top hat', 'Wizard hat', 'Flower crown',
  'Bell collar', 'Spike collar', 'LED collar', 'Holographic tag'
];

const BACKSTORIES = [
  'A wandering traveler seeking adventure across the realms',
  'A guardian of an ancient forest, protecting its secrets',
  'A street-smart city dweller with connections everywhere',
  'A retired hero living quietly in a cozy cottage',
  'A magical familiar bound to a powerful wizard',
  'A scientist experimenting with transmutation magic',
  'A performer in a traveling circus of wonders',
  'A lost royal from a fallen kingdom seeking restoration',
  'A cybernetic being navigating a neon-drenched metropolis',
  'A spirit guardian of a sacred mountain spring',
  'A chef famous for dishes that grant temporary abilities',
  'A musician whose songs can influence emotions',
  'A librarian of forbidden knowledge in a hidden archive',
  'A pilot of a steam-powered airship exploring the skies',
  'A student at an academy for the magically gifted',
  'A relic hunter delving into ancient ruins',
  'A diplomat bridging conflicts between factions',
  'A dream walker who guards the realm of sleep',
  'A time-lost traveler from a forgotten era',
  'A shapeshifter hiding in plain sight among mortals'
];

const SPECIAL_TRAITS = [
  'Heterochromia', 'Glowing markings', 'Multiple tails', 'Wings', 'Horns',
  'Scales', 'Feathers', 'Bioluminescence', 'Shapeshifting', 'Telepathy',
  'Elemental affinity', 'Phasing', 'Invisibility', 'Regeneration',
  'Luck manipulation', 'Dream walking', 'Time perception', 'Sound vision',
  'Shadow melding', 'Light weaving', 'Storm calling', 'Earth shaping',
  'Memory eating', 'Fortune telling', 'Language of beasts', 'Soul sight'
];

// Name generation
const NAME_PREFIXES = [
  'Ash', 'Blaze', 'Cloud', 'Dawn', 'Echo', 'Frost', 'Gale', 'Haze', 
  'Iris', 'Jade', 'Kai', 'Luna', 'Mist', 'Nova', 'Onyx', 'Piper', 
  'Quinn', 'Raven', 'Sage', 'Tide', 'Umbra', 'Vale', 'Willow', 
  'Xen', 'Yuki', 'Zephyr', 'Aurora', 'Bramble', 'Cinder', 'Drift',
  'Ember', 'Flint', 'Glacier', 'Harmony', 'Ivy', 'Jasper', 'Kismet',
  'Lyric', 'Marlowe', 'Nimbus', 'Opal', 'Phoenix', 'Quill', 'Rune',
  'Solstice', 'Thistle', 'Vesper', 'Wren', 'Xanth', 'Yarrow', 'Zenith'
];

const NAME_SUFFIXES = [
  'paw', 'tail', 'fur', 'claw', 'fang', 'whisker', 'ear', 'nose', 
  'eye', 'heart', 'soul', 'spirit', 'wind', 'storm', 'flame', 'frost', 
  'shadow', 'light', 'star', 'moon', 'sun', 'sky', 'sea', 'earth', 
  'void', 'dream', 'song', 'dance', 'flight', 'roar', 'purr', 'howl',
  'glide', 'leap', 'bound', 'sprint', 'prowl', 'stalk', 'soar', 'drift',
  'bloom', 'wilt', 'spark', 'glow', 'shimmer', 'fade', 'rise', 'fall'
];

// Rarity configuration
const SPECIES_RARITY = config.getSpeciesRarity();
const PATTERN_RARITY = config.getPatternRarity();
const TRAIT_RARITY = config.getTraitRarity();
const RARITY_WEIGHTS = config.getRarityWeights();
const COLORS_BY_RARITY = config.getColorsByRarity();

const RARITY_ORDER = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
const RARITY_COLORS = config.getRarityColors();
const RARITY_EMOJIS = config.getRarityEmojis();

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomElements(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

function weightedRandomRarity() {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let random = Math.random() * total;
  
  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    random -= weight;
    if (random <= 0) return rarity;
  }
  return 'common';
}

function getRarityForSpecies(species) {
  return SPECIES_RARITY[species] || 'common';
}

function getRarityForPattern(pattern) {
  return PATTERN_RARITY[pattern] || 'common';
}

function getRarityForTrait(trait) {
  return TRAIT_RARITY[trait] || 'common';
}

function getColorsByRarity(rarity) {
  return COLORS_BY_RARITY[rarity] || COLORS_BY_RARITY.common;
}

function getRandomColor(rarity = null) {
  if (rarity && COLORS_BY_RARITY[rarity] && COLORS_BY_RARITY[rarity].length > 0) {
    return getRandomElement(COLORS_BY_RARITY[rarity]);
  }
  // Fallback to all colors
  const allColors = Object.values(COLORS_BY_RARITY).flat();
  return getRandomElement(allColors.length > 0 ? allColors : ['#4ECDC4']);
}

// ============================================
// MAIN GENERATION FUNCTION
// ============================================

function generateFursona(options = {}) {
  const {
    customName,
    customSpecies,
    customPattern,
    forceRarity = null
  } = options;

  // Species selection with rarity
  let species = customSpecies;
  let speciesRarity = 'common';
  
  if (!species) {
    if (forceRarity) {
      // Filter species by rarity
      const speciesOfRarity = SPECIES.filter(s => SPECIES_RARITY[s] === forceRarity);
      species = speciesOfRarity.length > 0 ? getRandomElement(speciesOfRarity) : getRandomElement(SPECIES);
      speciesRarity = forceRarity;
    } else {
      species = getRandomElement(SPECIES);
      speciesRarity = getRarityForSpecies(species);
    }
  } else {
    speciesRarity = getRarityForSpecies(species);
  }

  // Pattern with rarity
  let pattern = customPattern || getRandomElement(PATTERNS);
  let patternRarity = getRarityForPattern(pattern);

  // Colors based on species rarity (higher rarity = chance for better colors)
  const colorRarityRoll = Math.random();
  let baseColorRarity = speciesRarity;
  if (colorRarityRoll < 0.1) baseColorRarity = RARITY_ORDER[Math.min(RARITY_ORDER.indexOf(speciesRarity) + 1, 4)];
  else if (colorRarityRoll < 0.02) baseColorRarity = RARITY_ORDER[Math.min(RARITY_ORDER.indexOf(speciesRarity) + 2, 4)];

  const baseColor = getRandomColor(baseColorRarity);
  const secondaryColor = getRandomColor(baseColorRarity);
  const accentColor = getRandomColor(baseColorRarity);
  const eyeColor = getRandomElement(EYE_COLORS);

  // Personality (3 traits)
  const personality = getRandomElements(PERSONALITIES, 3);

  // Accessories (1-4)
  const accessoryCount = Math.floor(Math.random() * 4) + 1;
  const accessories = getRandomElements(ACCESSORIES, accessoryCount);

  // Special traits based on rarity
  let traits = [];
  let traitRarities = [];
  
  const traitChance = {
    common: 0.1,
    uncommon: 0.25,
    rare: 0.4,
    epic: 0.6,
    legendary: 0.8
  };
  
  const maxTraits = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5
  }[speciesRarity] || 1;

  if (Math.random() < traitChance[speciesRarity]) {
    const traitCount = Math.floor(Math.random() * maxTraits) + 1;
    traits = getRandomElements(SPECIAL_TRAITS, traitCount);
    traitRarities = traits.map(t => getRarityForTrait(t));
  }

  // Name
  const name = customName || `${getRandomElement(NAME_PREFIXES)}${getRandomElement(NAME_SUFFIXES)}`;

  // Age (varies by species)
  const baseAge = {
    common: () => Math.floor(Math.random() * 80) + 18,
    uncommon: () => Math.floor(Math.random() * 150) + 20,
    rare: () => Math.floor(Math.random() * 300) + 25,
    epic: () => Math.floor(Math.random() * 500) + 50,
    legendary: () => Math.floor(Math.random() * 1000) + 100
  }[speciesRarity] || (() => Math.floor(Math.random() * 80) + 18);
  const age = baseAge();

  // Height/Weight (somewhat species-appropriate)
  const sizeMod = {
    'Mouse': 0.3, 'Rabbit': 0.5, 'Cat': 0.7, 'Fox': 0.8,
    'Wolf': 1.0, 'Dog': 1.0, 'Deer': 1.1, 'Horse': 1.5,
    'Bear': 1.3, 'Dragon': 2.0, 'Shark': 1.2
  };
  const mod = sizeMod[species] || 1.0;
  const heightCm = Math.floor((Math.random() * 100 + 100) * mod);
  const weightKg = Math.floor((Math.random() * 100 + 40) * mod);

  // Backstory
  const backstory = getRandomElement(BACKSTORIES);

  return {
    name,
    species,
    speciesRarity,
    age,
    heightCm,
    weightKg,
    baseColor,
    secondaryColor,
    accentColor,
    pattern,
    patternRarity,
    eyeColor,
    personality,
    accessories,
    traits,
    traitRarities,
    backstory
  };
}

// ============================================
// EMBED CREATION
// ============================================

function createFursonaEmbed(fursona, user, options = {}) {
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
  const { isSaved, showTradeButtons } = options;

  const rarityColor = RARITY_COLORS[fursona.speciesRarity] || config.get('EMBED_COLOR_DEFAULT', '#4ECDC4');
  const rarityEmoji = RARITY_EMOJIS[fursona.speciesRarity] || '';

  const embed = new EmbedBuilder()
    .setTitle(`${rarityEmoji} **${fursona.name}** ${rarityEmoji}`)
    .setColor(rarityColor)
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: '🐾 Species', value: `\`${fursona.species}\` ${rarityEmoji} **${capitalize(fursona.speciesRarity)}**`, inline: true },
      { name: '🎂 Age', value: `\`${fursona.age} years\``, inline: true },
      { name: '📏 Height', value: `\`${fursona.heightCm} cm\``, inline: true },
      { name: '⚖️ Weight', value: `\`${fursona.weightKg} kg\``, inline: true },
      { name: '🎨 Base Color', value: formatColor(fursona.baseColor), inline: true },
      { name: '🎨 Secondary', value: formatColor(fursona.secondaryColor), inline: true },
      { name: '🎨 Accent', value: formatColor(fursona.accentColor), inline: true },
      { name: '👁️ Eye Color', value: formatColor(fursona.eyeColor), inline: true },
      { name: '🌈 Pattern', value: `\`${fursona.pattern}\` ${RARITY_EMOJIS[fursona.patternRarity] || ''} **${capitalize(fursona.patternRarity)}**`, inline: true }
    );

  // Personality
  embed.addFields({ 
    name: '💫 Personality', 
    value: fursona.personality.map(p => `\`${p}\``).join(' • '), 
    inline: false 
  });

  // Accessories
  if (fursona.accessories.length > 0) {
    embed.addFields({ 
      name: '🎒 Accessories', 
      value: fursona.accessories.map(a => `\`${a}\``).join(', '), 
      inline: false 
    });
  }

  // Special traits
  if (fursona.traits.length > 0) {
    const traitDisplay = fursona.traits.map((t, i) => 
      `\`${t}\` ${RARITY_EMOJIS[fursona.traitRarities[i]] || ''} **${capitalize(fursona.traitRarities[i])}**`
    ).join('\n');
    embed.addFields({ name: '✨ Special Traits', value: traitDisplay, inline: false });
  }

  // Backstory
  embed.addFields({ name: '📖 Backstory', value: fursona.backstory, inline: false });

  // Footer
  const footerText = isSaved 
    ? `💾 Saved in collection • ${config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0')}`
    : `Generated for ${user.username} • ${config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0')}`;
  
  embed.setFooter({ text: footerText, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setTimestamp();

  // Color preview buttons (disabled, just for display)
  const colorRow = new ActionRowBuilder().addComponents(
    createColorButton('Base', fursona.baseColor),
    createColorButton('Secondary', fursona.secondaryColor),
    createColorButton('Accent', fursona.accentColor),
    createColorButton('Eyes', fursona.eyeColor)
  );

  // Action buttons
  const actionButtons = [];
  
  if (!isSaved) {
    actionButtons.push(
      new ButtonBuilder()
        .setCustomId('fursona_regenerate')
        .setLabel('🔄 Regenerate')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('fursona_save')
        .setLabel('💾 Save to Collection')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('fursona_share')
        .setLabel('📤 Share')
        .setStyle(ButtonStyle.Secondary)
    );
  } else {
    actionButtons.push(
      new ButtonBuilder()
        .setCustomId(`fursona_favorite_${fursona.id}`)
        .setLabel(fursona.isFavorite ? '💛 Favorited' : '🤍 Favorite')
        .setStyle(fursona.isFavorite ? ButtonStyle.Success : ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`fursona_rename_${fursona.id}`)
        .setLabel('✏️ Rename')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId(`fursona_delete_${fursona.id}`)
        .setLabel('🗑️ Delete')
        .setStyle(ButtonStyle.Danger)
    );
  }

  if (showTradeButtons && !isSaved) {
    actionButtons.push(
      new ButtonBuilder()
        .setCustomId('fursona_trade')
        .setLabel('🔄 Trade')
        .setStyle(ButtonStyle.Primary)
    );
  }

  const actionRow = new ActionRowBuilder().addComponents(actionButtons);

  // Custom creation button row
  const customRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('fursona_custom')
      .setLabel('✨ Custom Fursona')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('fursona_profile')
      .setLabel('👤 My Profile')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('fursona_collection')
      .setLabel('📚 Collection')
      .setStyle(ButtonStyle.Secondary)
  );

  const components = [colorRow, actionRow];
  if (!isSaved) components.push(customRow);

  return { embeds: [embed], components };
}

function createColorButton(label, color) {
  const { ButtonBuilder, ButtonStyle } = require('discord.js');
  return new ButtonBuilder()
    .setCustomId(`color_${label.toLowerCase()}`)
    .setLabel(`${label}: ${color}`)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
}

function formatColor(hex) {
  return `\`${hex}\` ${colorBlock(hex)}`;
}

function colorBlock(hex) {
  // Unicode block character for color preview
  return '████';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// PROFILE EMBED
// ============================================

function createProfileEmbed(user, stats, favoriteFursona, settings) {
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
  
  const embed = new EmbedBuilder()
    .setTitle(`👤 ${user.username}'s Profile`)
    .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'))
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }))
    .addFields(
      { name: '📊 Total Fursonas', value: `\`${stats.total_fursonas || 0}\``, inline: true },
      { name: '💛 Favorites', value: `\`${stats.favorites || 0}\``, inline: true },
      { name: '🐾 Unique Species', value: `\`${stats.unique_species || 0}\``, inline: true },
      { name: '🟡 Legendary', value: `\`${stats.legendaries || 0}\``, inline: true },
      { name: '🟣 Epic', value: `\`${stats.epics || 0}\``, inline: true },
      { name: '🔵 Rare', value: `\`${stats.rares || 0}\``, inline: true },
      { name: '🟢 Uncommon', value: `\`${stats.uncommons || 0}\``, inline: true },
      { name: '⚪ Common', value: `\`${stats.commons || 0}\``, inline: true }
    );

  if (favoriteFursona) {
    embed.addFields({ 
      name: '⭐ Favorite Fursona', 
      value: `**${favoriteFursona.name}** (${favoriteFursona.species}) ${RARITY_EMOJIS[favoriteFursona.speciesRarity] || ''}`,
      inline: false 
    });
  }

  embed.setFooter({ text: config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0') })
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('profile_collection')
      .setLabel('📚 View Collection')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('profile_leaderboard')
      .setLabel('🏆 Leaderboard')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('profile_settings')
      .setLabel('⚙️ Settings')
      .setStyle(ButtonStyle.Secondary)
  );

  return { embeds: [embed], components: [row] };
}

// ============================================
// COLLECTION EMBED
// ============================================

function createCollectionEmbed(user, fursonas, page = 0, pageSize = 10) {
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
  
  const totalPages = Math.ceil(fursonas.length / pageSize);
  const start = page * pageSize;
  const end = Math.min(start + pageSize, fursonas.length);
  const pageFursonas = fursonas.slice(start, end);

  const embed = new EmbedBuilder()
    .setTitle(`📚 ${user.username}'s Collection (${fursonas.length} total)`)
    .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'))
    .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 256 }));

  if (pageFursonas.length === 0) {
    embed.setDescription('Your collection is empty! Use `/fursona` to generate your first fursona.');
  } else {
    const fields = pageFursonas.map((f, i) => ({
      name: `${start + i + 1}. ${f.name} ${RARITY_EMOJIS[f.speciesRarity] || ''}`,
      value: `**${f.species}** • ${capitalize(f.speciesRarity)} • ${f.age}yrs • ${f.isFavorite ? '💛' : '🤍'}`,
      inline: true
    }));
    embed.addFields(...fields);
    embed.setFooter({ 
      text: `Page ${page + 1} of ${totalPages} • ${config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0')}`,
      iconURL: user.displayAvatarURL({ dynamic: true })
    });
  }

  const components = [];
  if (totalPages > 1) {
    const navRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`collection_page_${page - 1}`)
        .setLabel('◀ Previous')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page === 0),
      new ButtonBuilder()
        .setCustomId(`collection_page_${page + 1}`)
        .setLabel('Next ▶')
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(page >= totalPages - 1),
      new ButtonBuilder()
        .setCustomId('collection_view')
        .setLabel('🔍 View Details')
        .setStyle(ButtonStyle.Primary)
    );
    components.push(navRow);
  }

  const actionRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('fursona_generate')
      .setLabel('🎲 Generate New')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('fursona_profile')
      .setLabel('👤 Profile')
      .setStyle(ButtonStyle.Secondary)
  );
  components.push(actionRow);

  return { embeds: [embed], components };
}

// ============================================
// LEADERBOARD EMBED
// ============================================

function createLeaderboardEmbed(leaderboard, userId) {
  const { EmbedBuilder } = require('discord.js');
  
  const embed = new EmbedBuilder()
    .setTitle('🏆 Fursona Leaderboard')
    .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'))
    .setDescription('Top collectors by total fursonas');

  const medals = ['🥇', '🥈', '🥉'];
  
  leaderboard.forEach((entry, i) => {
    const medal = medals[i] || `${i + 1}.`;
    const isUser = entry.user_id === userId;
    const name = isUser ? `**${entry.username} (You)**` : entry.username;
    
    embed.addFields({
      name: `${medal} ${name}`,
      value: `${entry.total_fursonas} fursonas • ${entry.unique_species} species • ${entry.legendaries}🟡 ${entry.epics}🟣 ${entry.rares}🔵`,
      inline: false
    });
  });

  embed.setFooter({ text: config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0') })
    .setTimestamp();

  return { embeds: [embed] };
}

// ============================================
// TRADE EMBEDS
// ============================================

function createTradeProposeEmbed(initiator, target, initiatorFursona, targetFursona) {
  const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
  
  const embed = new EmbedBuilder()
    .setTitle('🔄 Trade Proposal')
    .setColor('#F39C12')
    .setDescription(`${initiator.username} wants to trade with ${target.username}!`)
    .addFields(
      { name: `${initiator.username} offers:`, value: `**${initiatorFursona.name}** (${initiatorFursona.species}) ${RARITY_EMOJIS[initiatorFursona.speciesRarity] || ''}`, inline: true },
      { name: `${target.username} offers:`, value: targetFursona ? `**${targetFursona.name}** (${targetFursona.species}) ${RARITY_EMOJIS[targetFursona.speciesRarity] || ''}` : '*Nothing (Gift)*', inline: true }
    )
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('trade_accept')
      .setLabel('✅ Accept')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('trade_decline')
      .setLabel('❌ Decline')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId('trade_cancel')
      .setLabel('🚫 Cancel')
      .setStyle(ButtonStyle.Secondary)
  );

  return { embeds: [embed], components: [row] };
}

function createTradePendingEmbed(trades) {
  const { EmbedBuilder } = require('discord.js');
  
  const embed = new EmbedBuilder()
    .setTitle('📨 Pending Trades')
    .setColor('#F39C12');

  if (trades.length === 0) {
    embed.setDescription('No pending trades.');
  } else {
    trades.forEach(trade => {
      embed.addFields({
        name: `Trade #${trade.id}`,
        value: `From: <@${trade.initiator_id}>\nStatus: ${trade.status}\nCreated: <t:${Math.floor(trade.created_at / 1000)}:R>`,
        inline: true
      });
    });
  }

  return { embeds: [embed] };
}

// ============================================
// MODAL COMPONENTS
// ============================================

function createCustomFursonaModal() {
  const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
  
  const modal = new ModalBuilder()
    .setCustomId('modal_custom_fursona')
    .setTitle('✨ Create Custom Fursona');

  const nameInput = new TextInputBuilder()
    .setCustomId('custom_name')
    .setLabel('Name (optional)')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Leave blank for random name')
    .setRequired(false)
    .setMaxLength(32);

  const speciesInput = new TextInputBuilder()
    .setCustomId('custom_species')
    .setLabel('Species (optional)')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Wolf, Fox, Dragon, etc. Leave blank for random')
    .setRequired(false)
    .setMaxLength(32);

  const patternInput = new TextInputBuilder()
    .setCustomId('custom_pattern')
    .setLabel('Pattern (optional)')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Solid, Tabby, Merle, etc. Leave blank for random')
    .setRequired(false)
    .setMaxLength(32);

  const backstoryInput = new TextInputBuilder()
    .setCustomId('custom_backstory')
    .setLabel('Custom Backstory (optional)')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Write your own backstory...')
    .setRequired(false)
    .setMaxLength(500);

  modal.addComponents(
    new ActionRowBuilder().addComponents(nameInput),
    new ActionRowBuilder().addComponents(speciesInput),
    new ActionRowBuilder().addComponents(patternInput),
    new ActionRowBuilder().addComponents(backstoryInput)
  );

  return modal;
}

function createRenameModal(fursonaId, currentName) {
  const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
  
  const modal = new ModalBuilder()
    .setCustomId(`modal_rename_${fursonaId}`)
    .setTitle('✏️ Rename Fursona');

  const nameInput = new TextInputBuilder()
    .setCustomId('new_name')
    .setLabel('New Name')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder(currentName)
    .setRequired(true)
    .setMaxLength(32);

  modal.addComponents(new ActionRowBuilder().addComponents(nameInput));

  return modal;
}

// ============================================
// COOLDOWN MANAGEMENT
// ============================================

const cooldowns = new Map();

function checkCooldown(userId, command, cooldownSeconds) {
  const key = `${userId}:${command}`;
  const now = Date.now();
  const lastUsed = cooldowns.get(key) || 0;
  
  if (now - lastUsed < cooldownSeconds * 1000) {
    const remaining = Math.ceil((cooldownSeconds * 1000 - (now - lastUsed)) / 1000);
    return { onCooldown: true, remaining };
  }
  
  cooldowns.set(key, now);
  return { onCooldown: false };
}

function clearCooldown(userId, command) {
  cooldowns.delete(`${userId}:${command}`);
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  // Data
  SPECIES,
  PATTERNS,
  EYE_COLORS,
  PERSONALITIES,
  ACCESSORIES,
  BACKSTORIES,
  SPECIAL_TRAITS,
  NAME_PREFIXES,
  NAME_SUFFIXES,
  SPECIES_RARITY,
  PATTERN_RARITY,
  TRAIT_RARITY,
  RARITY_WEIGHTS,
  COLORS_BY_RARITY,
  RARITY_COLORS,
  RARITY_EMOJIS,
  
  // Generation
  generateFursona,
  getRandomElement,
  getRandomElements,
  getRarityForSpecies,
  getRarityForPattern,
  getRarityForTrait,
  weightedRandomRarity,
  
  // Embeds
  createFursonaEmbed,
  createProfileEmbed,
  createCollectionEmbed,
  createLeaderboardEmbed,
  createTradeProposeEmbed,
  createTradePendingEmbed,
  
  // Modals
  createCustomFursonaModal,
  createRenameModal,
  
  // Cooldowns
  checkCooldown,
  clearCooldown
};