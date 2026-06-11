require('dotenv').config();
const config = require('./config.js');
const db = require('./database.js');
const {
  generateFursona,
  createFursonaEmbed,
  createProfileEmbed,
  createCollectionEmbed,
  createLeaderboardEmbed,
  createTradeProposeEmbed,
  createTradePendingEmbed,
  createCustomFursonaModal,
  createRenameModal,
  checkCooldown,
  clearCooldown,
  SPECIES,
  RARITY_EMOJIS
} = require('./fursona.js');

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  REST,
  Routes
} = require('discord.js');

// ============================================
// CLIENT SETUP
// ============================================

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Active fursonas for button interactions (non-saved)
const activeFursonas = new Map();

// Pending trades
const pendingTrades = new Map();

// ============================================
// HELPER FUNCTIONS
// ============================================

function getUserFursonasKey(userId) {
  return `fursonas_${userId}`;
}

async function handleError(interaction, error, context = '') {
  console.error(`❌ Error${context ? ` in ${context}` : ''}:`, error);
  
  const errorMsg = config.get('DEBUG_MODE') 
    ? `\`\`\`${error.message}\`\`\``
    : 'An error occurred. Please try again later.';
  
  const content = `❌ **Error**${context ? ` (${context})` : ''}\n${errorMsg}`;
  
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({ content, ephemeral: true }).catch(() => {});
  } else {
    await interaction.reply({ content, ephemeral: true }).catch(() => {});
  }
}

async function deferOrReply(interaction, options = {}) {
  if (interaction.replied || interaction.deferred) return;
  if (options.ephemeral) {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
  } else {
    await interaction.deferReply().catch(() => {});
  }
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================
// COMMAND HANDLERS
// ============================================

async function handleFursonaCommand(interaction) {
  const user = interaction.user;
  const cooldown = checkCooldown(user.id, 'fursona', config.get('COOLDOWN_GENERATE', 10));
  
  if (cooldown.onCooldown) {
    return interaction.reply({ 
      content: `⏳ Please wait ${cooldown.remaining}s before generating another fursona!`, 
      ephemeral: true 
    });
  }

  await deferOrReply(interaction);
  
  try {
    // Get or create user in database
    const dbUser = db.getOrCreateUser(user);
    
    // Check collection limit
    const count = db.statements.getUserFursonaCount.get(user.id);
    if (count.count >= config.get('MAX_FURSONAS_PER_USER', 200)) {
      clearCooldown(user.id, 'fursona');
      return interaction.editReply({ 
        content: `❌ You've reached the maximum of ${config.get('MAX_FURSONAS_PER_USER', 200)} fursonas! Delete some to make room.` 
      });
    }

    const fursona = generateFursona();
    activeFursonas.set(user.id, fursona);
    
    const { embeds, components } = createFursonaEmbed(fursona, user);
    await interaction.editReply({ embeds, components });
  } catch (error) {
    await handleError(interaction, error, 'fursona');
  }
}

async function handleFursonaCustomCommand(interaction) {
  const user = interaction.user;
  const cooldown = checkCooldown(user.id, 'fursona_custom', config.get('COOLDOWN_CUSTOM', 30));
  
  if (cooldown.onCooldown) {
    return interaction.reply({ 
      content: `⏳ Please wait ${cooldown.remaining}s before creating a custom fursona!`, 
      ephemeral: true 
    });
  }

  const modal = createCustomFursonaModal();
  await interaction.showModal(modal);
}

async function handleCustomFursonaModal(interaction) {
  await deferOrReply(interaction);
  
  try {
    const name = interaction.fields.getTextInputValue('custom_name') || null;
    const species = interaction.fields.getTextInputValue('custom_species') || null;
    const pattern = interaction.fields.getTextInputValue('custom_pattern') || null;
    const backstory = interaction.fields.getTextInputValue('custom_backstory') || null;

    // Validate species if provided
    let validSpecies = null;
    if (species) {
      const match = SPECIES.find(s => s.toLowerCase() === species.toLowerCase());
      if (!match) {
        return interaction.editReply({ 
          content: `❌ Unknown species: **${species}**\nUse \`/fursona-species\` to see available species.`, 
          ephemeral: true 
        });
      }
      validSpecies = match;
    }

    // Validate pattern if provided
    const { PATTERNS } = require('./fursona.js');
    let validPattern = null;
    if (pattern) {
      const match = PATTERNS.find(p => p.toLowerCase() === pattern.toLowerCase());
      if (!match) {
        return interaction.editReply({ 
          content: `❌ Unknown pattern: **${pattern}**`, 
          ephemeral: true 
        });
      }
      validPattern = match;
    }

    const fursona = generateFursona({
      customName: name,
      customSpecies: validSpecies,
      customPattern: validPattern
    });

    if (backstory) fursona.backstory = backstory;

    db.saveFursona(interaction.user.id, fursona);
    
    const { embeds, components } = createFursonaEmbed(fursona, interaction.user, { isSaved: true });
    await interaction.editReply({ 
      content: '✨ Custom fursona created and saved to your collection!', 
      embeds, 
      components 
    });
  } catch (error) {
    await handleError(interaction, error, 'custom fursona modal');
  }
}

async function handleProfileCommand(interaction) {
  const targetUser = interaction.options.getUser('user') || interaction.user;
  const cooldown = checkCooldown(interaction.user.id, 'profile', config.get('COOLDOWN_PROFILE', 5));
  
  if (cooldown.onCooldown && targetUser.id === interaction.user.id) {
    return interaction.reply({ 
      content: `⏳ Please wait ${cooldown.remaining}s before checking profile again!`, 
      ephemeral: true 
    });
  }

  await deferOrReply(interaction, { ephemeral: targetUser.id !== interaction.user.id });
  
  try {
    const dbUser = db.getOrCreateUser(targetUser);
    const stats = db.getStats(targetUser.id);
    const favoriteFursona = db.statements.getFavoriteFursona.get(targetUser.id);
    const settings = db.getUserSettings(targetUser.id);
    
    const favFursona = favoriteFursona ? {
      ...favoriteFursona,
      speciesRarity: favoriteFursona.species_rarity
    } : null;
    
    const { embeds, components } = createProfileEmbed(targetUser, stats, favFursona, settings);
    await interaction.editReply({ embeds, components });
  } catch (error) {
    await handleError(interaction, error, 'profile');
  }
}

async function handleCollectionCommand(interaction) {
  const targetUser = interaction.options.getUser('user') || interaction.user;
  const page = interaction.options.getInteger('page') || 1;
  
  await deferOrReply(interaction, { ephemeral: targetUser.id !== interaction.user.id });
  
  try {
    const fursonas = db.getFursonas(targetUser.id, 500);
    const { embeds, components } = createCollectionEmbed(targetUser, fursonas, page - 1);
    await interaction.editReply({ embeds, components });
  } catch (error) {
    await handleError(interaction, error, 'collection');
  }
}

async function handleLeaderboardCommand(interaction) {
  const page = interaction.options.getInteger('page') || 1;
  
  await deferOrReply(interaction);
  
  try {
    const leaderboard = db.getLeaderboard(25);
    const { embeds } = createLeaderboardEmbed(leaderboard, interaction.user.id);
    await interaction.editReply({ embeds });
  } catch (error) {
    await handleError(interaction, error, 'leaderboard');
  }
}

async function handleSpeciesCommand(interaction) {
  await deferOrReply(interaction, { ephemeral: true });
  
  try {
    const speciesRarity = require('./fursona.js').SPECIES_RARITY;
    
    // Group by rarity
    const byRarity = {};
    for (const species of SPECIES) {
      const rarity = speciesRarity[species] || 'common';
      if (!byRarity[rarity]) byRarity[rarity] = [];
      byRarity[rarity].push(species);
    }
    
    const embed = new EmbedBuilder()
      .setTitle('🐾 Available Species by Rarity')
      .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'))
      .setDescription(`Total: ${SPECIES.length} species`);
    
    const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common'];
    for (const rarity of rarityOrder) {
      if (byRarity[rarity] && byRarity[rarity].length > 0) {
        const emoji = RARITY_EMOJIS[rarity] || '';
        embed.addFields({ 
          name: `${emoji} ${capitalize(rarity)} (${byRarity[rarity].length})`, 
          value: byRarity[rarity].join(', '), 
          inline: false 
        });
      }
    }
    
    embed.setFooter({ text: config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0') })
      .setTimestamp();
    
    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    await handleError(interaction, error, 'species');
  }
}

async function handleHelpCommand(interaction) {
  await deferOrReply(interaction, { ephemeral: true });
  
  const embed = new EmbedBuilder()
    .setTitle('🐾 Fursona Bot v2.0 - Help')
    .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'))
    .setDescription('Generate, collect, and trade unique fursonas with rarity system!')
    .addFields(
      { name: '🎲 Generation', value: '`/fursona` - Random fursona\n`/fursona custom` - Create custom fursona (modal)', inline: true },
      { name: '👤 Profile & Collection', value: '`/fursona profile [user]` - View profile\n`/fursona collection [user] [page]` - Browse collection', inline: true },
      { name: '🏆 Social', value: '`/fursona leaderboard` - Top collectors\n`/fursona trade <user> [your_fursona] [their_fursona]` - Propose trade', inline: true },
      { name: 'ℹ️ Info', value: '`/fursona species` - List all species by rarity\n`/fursona help` - This message', inline: true },
      { name: '🎨 Rarity System', value: '⚪ Common • 🟢 Uncommon • 🔵 Rare • 🟣 Epic • 🟡 Legendary\nHigher rarity = better colors, more traits, unique species!', inline: false },
      { name: '💾 Collection', value: 'Save fursonas to your permanent collection\nFavorite up to 5 • Rename • Delete • Trade with others', inline: false }
    )
    .setFooter({ text: config.get('EMBED_FOOTER_TEXT', 'FursonaBot v2.0') })
    .setTimestamp();
  
  await interaction.editReply({ embeds: [embed] });
}

async function handleTradeCommand(interaction) {
  if (!config.get('ENABLE_TRADING', true)) {
    return interaction.reply({ content: '❌ Trading is currently disabled.', ephemeral: true });
  }

  const targetUser = interaction.options.getUser('user');
  const yourFursonaId = interaction.options.getInteger('your_fursona');
  const theirFursonaId = interaction.options.getInteger('their_fursona');

  if (targetUser.id === interaction.user.id) {
    return interaction.reply({ content: '❌ You cannot trade with yourself!', ephemeral: true });
  }

  if (targetUser.bot) {
    return interaction.reply({ content: '❌ You cannot trade with bots!', ephemeral: true });
  }

  const cooldown = checkCooldown(interaction.user.id, 'trade', config.get('COOLDOWN_TRADE', 60));
  if (cooldown.onCooldown) {
    return interaction.reply({ 
      content: `⏳ Please wait ${cooldown.remaining}s before proposing another trade!`, 
      ephemeral: true 
    });
  }

  await deferOrReply(interaction);
  
  try {
    // Get both users' fursonas
    const yourFursonas = db.getFursonas(interaction.user.id);
    const theirFursonas = db.getFursonas(targetUser.id);
    
    if (yourFursonas.length === 0) {
      return interaction.editReply({ content: '❌ You have no fursonas to trade!' });
    }
    if (theirFursonas.length === 0) {
      return interaction.editReply({ content: `❌ ${targetUser.username} has no fursonas to trade!` });
    }

    let yourFursona = null;
    let theirFursona = null;

    if (yourFursonaId) {
      yourFursona = yourFursonas.find(f => f.id === yourFursonaId);
      if (!yourFursona) {
        return interaction.editReply({ content: '❌ Invalid fursona ID for your offer!' });
      }
    } else {
      // Show selection menu
      return interaction.editReply({ 
        content: 'Please specify a fursona ID to offer. Use `/fursona collection` to see IDs.',
        ephemeral: true 
      });
    }

    if (theirFursonaId) {
      theirFursona = theirFursonas.find(f => f.id === theirFursonaId);
      if (!theirFursona) {
        return interaction.editReply({ content: '❌ Invalid fursona ID for their offer!' });
      }
    }

    // Check trade limits
    const pendingCount = db.statements.getPendingTrades.all(targetUser.id).length;
    if (pendingCount >= config.get('MAX_TRADES_PER_USER', 5)) {
      return interaction.editReply({ content: `❌ ${targetUser.username} has too many pending trades!` });
    }

    // Create trade in database
    const tradeResult = db.createTrade(
      interaction.user.id,
      targetUser.id,
      yourFursona.id,
      theirFursona?.id || null
    );
    
    const tradeId = tradeResult.lastInsertRowid;
    
    // Store pending trade for button handling
    pendingTrades.set(tradeId, {
      tradeId,
      initiatorId: interaction.user.id,
      targetId: targetUser.id,
      yourFursona,
      theirFursona
    });

    const { embeds, components } = createTradeProposeEmbed(
      interaction.user, targetUser, yourFursona, theirFursona
    );
    
    const reply = await interaction.editReply({ 
      content: `${targetUser}, you have a trade proposal!`,
      embeds, 
      components 
    });
    
    // Auto-cancel after 5 minutes
    setTimeout(() => {
      if (pendingTrades.has(tradeId)) {
        db.updateTrade(tradeId, 'cancelled');
        pendingTrades.delete(tradeId);
        // Try to update message
        reply.fetch().then(msg => {
          const embed = new EmbedBuilder()
            .setTitle('🔄 Trade Expired')
            .setDescription('This trade proposal has expired.')
            .setColor('#95A5A6');
          msg.edit({ embeds: [embed], components: [] }).catch(() => {});
        }).catch(() => {});
      }
    }, 5 * 60 * 1000);
    
  } catch (error) {
    await handleError(interaction, error, 'trade');
  }
}

async function handleTradeButton(interaction) {
  const customId = interaction.customId;
  
  if (customId === 'trade_accept' || customId === 'trade_decline' || customId === 'trade_cancel') {
    // Extract trade ID from message (we need to store it differently)
    // For now, we'll find the pending trade between these users
    const trades = db.getPendingTrades(interaction.user.id);
    if (trades.length === 0) {
      return interaction.reply({ content: '❌ No pending trade found!', ephemeral: true });
    }
    
    const trade = trades[0];
    
    if (customId === 'trade_cancel' && trade.initiator_id !== interaction.user.id) {
      return interaction.reply({ content: '❌ Only the initiator can cancel!', ephemeral: true });
    }
    
    if (customId === 'trade_decline' && trade.target_id !== interaction.user.id) {
      return interaction.reply({ content: '❌ Only the target can decline!', ephemeral: true });
    }
    
    if (customId === 'trade_accept' && trade.target_id !== interaction.user.id) {
      return interaction.reply({ content: '❌ Only the target can accept!', ephemeral: true });
    }

    await interaction.deferUpdate();
    
    if (customId === 'trade_accept') {
      // Complete the trade
      db.completeTrade(
        trade.id,
        trade.initiator_id,
        trade.target_id,
        trade.initiator_fursona_id,
        trade.target_fursona_id
      );
      
      const embed = new EmbedBuilder()
        .setTitle('✅ Trade Completed!')
        .setDescription('The trade has been successfully completed.')
        .setColor('#2ECC71')
        .setTimestamp();
      
      await interaction.editReply({ embeds: [embed], components: [] });
    } else {
      // Cancel/decline
      db.updateTrade(trade.id, customId === 'trade_cancel' ? 'cancelled' : 'declined');
      
      const embed = new EmbedBuilder()
        .setTitle(customId === 'trade_cancel' ? '🚫 Trade Cancelled' : '❌ Trade Declined')
        .setDescription(customId === 'trade_cancel' ? 'The trade was cancelled by the initiator.' : 'The trade was declined.')
        .setColor('#E74C3C')
        .setTimestamp();
      
      await interaction.editReply({ embeds: [embed], components: [] });
    }
    
    pendingTrades.delete(trade.id);
  }
}

async function handleFursonaButtons(interaction) {
  const customId = interaction.customId;
  const user = interaction.user;
  
  await interaction.deferUpdate();
  
  try {
    if (customId === 'fursona_regenerate') {
      const cooldown = checkCooldown(user.id, 'fursona', config.get('COOLDOWN_GENERATE', 10));
      if (cooldown.onCooldown) {
        return interaction.followUp({ 
          content: `⏳ Please wait ${cooldown.remaining}s before regenerating!`, 
          ephemeral: true 
        });
      }
      
      const fursona = generateFursona();
      activeFursonas.set(user.id, fursona);
      const { embeds, components } = createFursonaEmbed(fursona, user);
      await interaction.editReply({ embeds, components });
      
    } else if (customId === 'fursona_save') {
      const fursona = activeFursonas.get(user.id);
      if (!fursona) {
        return interaction.followUp({ content: '❌ No fursona to save!', ephemeral: true });
      }
      
      // Check limit
      const count = db.statements.getUserFursonaCount.get(user.id);
      if (count.count >= config.get('MAX_FURSONAS_PER_USER', 200)) {
        return interaction.followUp({ 
          content: `❌ Collection full! Max ${config.get('MAX_FURSONAS_PER_USER', 200)} fursonas.`, 
          ephemeral: true 
        });
      }
      
      const saved = db.saveFursona(user.id, fursona);
      activeFursonas.delete(user.id);
      
      const { embeds, components } = createFursonaEmbed(saved, user, { isSaved: true });
      await interaction.editReply({ 
        content: '✅ Fursona saved to your collection!', 
        embeds, 
        components 
      });
      
    } else if (customId === 'fursona_share') {
      const fursona = activeFursonas.get(user.id);
      if (!fursona) {
        return interaction.followUp({ content: '❌ No fursona to share!', ephemeral: true });
      }
      
      const { embeds } = createFursonaEmbed(fursona, user);
      await interaction.editReply({ 
        content: `${user} shared their fursona!`, 
        embeds, 
        components: [] 
      });
      
    } else if (customId === 'fursona_favorite') {
      const fursonaId = customId.split('_')[2];
      
    } else if (customId.startsWith('fursona_favorite_')) {
      const fursonaId = customId.split('_')[2];
      db.toggleFavorite(fursonaId, user.id);
      const fursona = db.getFursona(fursonaId);
      if (fursona) {
        const { embeds, components } = createFursonaEmbed(fursona, user, { isSaved: true });
        await interaction.editReply({ embeds, components });
      }
      
    } else if (customId.startsWith('fursona_rename_')) {
      const fursonaId = customId.split('_')[2];
      const fursona = db.getFursona(fursonaId);
      if (fursona && fursona.user_id === user.id) {
        const modal = createRenameModal(fursonaId, fursona.name);
        await interaction.showModal(modal);
      }
      
    } else if (customId.startsWith('fursona_delete_')) {
      const fursonaId = customId.split('_')[2];
      const fursona = db.getFursona(fursonaId);
      if (fursona && fursona.user_id === user.id) {
        // Confirm deletion
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
        const embed = new EmbedBuilder()
          .setTitle('🗑️ Confirm Deletion')
          .setDescription(`Are you sure you want to delete **${fursona.name}** (${fursona.species})?\nThis action cannot be undone!`)
          .setColor('#E74C3C');
        
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`confirm_delete_${fursonaId}`)
            .setLabel('Yes, Delete')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('cancel_delete')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary)
        );
        
        await interaction.editReply({ embeds: [embed], components: [row] });
      }
      
    } else if (customId.startsWith('confirm_delete_')) {
      const fursonaId = customId.split('_')[2];
      db.deleteFursona(fursonaId, user.id);
      
      const embed = new EmbedBuilder()
        .setTitle('🗑️ Deleted')
        .setDescription('Fursona has been permanently deleted.')
        .setColor('#95A5A6');
      
      await interaction.editReply({ embeds: [embed], components: [] });
      
    } else if (customId === 'cancel_delete') {
      // Go back to fursona view
      const fursonas = db.getFursonas(user.id);
      if (fursonas.length > 0) {
        const { embeds, components } = createFursonaEmbed(fursonas[0], user, { isSaved: true });
        await interaction.editReply({ embeds, components });
      }
      
    } else if (customId === 'fursona_custom') {
      const modal = createCustomFursonaModal();
      await interaction.showModal(modal);
      
    } else if (customId === 'fursona_profile') {
      const stats = db.getStats(user.id);
      const favoriteFursona = db.statements.getFavoriteFursona.get(user.id);
      const settings = db.getUserSettings(user.id);
      const { embeds, components } = createProfileEmbed(user, stats, favoriteFursona, settings);
      await interaction.editReply({ embeds, components });
      
    } else if (customId === 'fursona_collection') {
      const fursonas = db.getFursonas(user.id);
      const { embeds, components } = createCollectionEmbed(user, fursonas, 0);
      await interaction.editReply({ embeds, components });
      
    } else if (customId.startsWith('collection_page_')) {
      const page = parseInt(customId.split('_')[2]);
      const fursonas = db.getFursonas(user.id);
      const { embeds, components } = createCollectionEmbed(user, fursonas, page);
      await interaction.editReply({ embeds, components });
      
    } else if (customId === 'collection_view') {
      // Show a select menu for viewing details
      const fursonas = db.getFursonas(user.id).slice(0, 25);
      if (fursonas.length === 0) return;
      
      const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
      const select = new StringSelectMenuBuilder()
        .setCustomId('collection_select')
        .setPlaceholder('Select a fursona to view...')
        .addOptions(fursonas.map((f, i) => ({
          label: `${i + 1}. ${f.name} (${f.species})`,
          description: `${capitalize(f.speciesRarity)} • ${f.age}yrs • ${f.isFavorite ? '💛 Fav' : ''}`,
          value: f.id.toString()
        })));
      
      const row = new ActionRowBuilder().addComponents(select);
      await interaction.editReply({ components: [row] });
      
    } else if (customId === 'fursona_generate') {
      const cooldown = checkCooldown(user.id, 'fursona', config.get('COOLDOWN_GENERATE', 10));
      if (cooldown.onCooldown) {
        return interaction.followUp({ 
          content: `⏳ Please wait ${cooldown.remaining}s!`, 
          ephemeral: true 
        });
      }
      
      const fursona = generateFursona();
      activeFursonas.set(user.id, fursona);
      const { embeds, components } = createFursonaEmbed(fursona, user);
      await interaction.editReply({ embeds, components });
      
    } else if (customId === 'profile_collection') {
      const fursonas = db.getFursonas(user.id);
      const { embeds, components } = createCollectionEmbed(user, fursonas, 0);
      await interaction.editReply({ embeds, components });
      
    } else if (customId === 'profile_leaderboard') {
      const leaderboard = db.getLeaderboard(10);
      const { embeds } = createLeaderboardEmbed(leaderboard, user.id);
      await interaction.editReply({ embeds, components: [] });
      
    } else if (customId === 'profile_settings') {
      const embed = new EmbedBuilder()
        .setTitle('⚙️ Settings')
        .setDescription('Settings panel coming soon!')
        .setColor(config.get('EMBED_COLOR_DEFAULT', '#4ECDC4'));
      await interaction.editReply({ embeds: [embed], components: [] });
    }
  } catch (error) {
    console.error('Button error:', error);
    await interaction.followUp({ content: '❌ An error occurred!', ephemeral: true });
  }
}

async function handleCollectionSelect(interaction) {
  const fursonaId = parseInt(interaction.values[0]);
  const fursona = db.getFursona(fursonaId);
  
  if (fursona && fursona.user_id === interaction.user.id) {
    await interaction.deferUpdate();
    const { embeds, components } = createFursonaEmbed(fursona, interaction.user, { isSaved: true });
    await interaction.editReply({ embeds, components });
  }
}

async function handleRenameModal(interaction) {
  const customId = interaction.customId; // modal_rename_123
  const fursonaId = customId.split('_')[2];
  const newName = interaction.fields.getTextInputValue('new_name');
  
  await interaction.deferUpdate();
  
  try {
    const fursona = db.getFursona(fursonaId);
    if (!fursona || fursona.user_id !== interaction.user.id) {
      return interaction.followUp({ content: '❌ Fursona not found!', ephemeral: true });
    }
    
    if (newName.length > 32) {
      return interaction.followUp({ content: '❌ Name too long! Max 32 characters.', ephemeral: true });
    }
    
    db.updateFursona(fursonaId, interaction.user.id, newName, fursona.is_favorite, fursona.is_public);
    
    const updated = db.getFursona(fursonaId);
    const { embeds, components } = createFursonaEmbed(updated, interaction.user, { isSaved: true });
    await interaction.editReply({ 
      content: `✅ Renamed to **${newName}**!`, 
      embeds, 
      components 
    });
  } catch (error) {
    await handleError(interaction, error, 'rename modal');
  }
}

// ============================================
// EVENT HANDLERS
// ============================================

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Logged in as ${readyClient.user.tag}`);
  console.log(`📊 Serving ${readyClient.guilds.cache.size} guilds`);
  console.log(`🔧 Config loaded: ${Object.keys(config.config).length} settings`);
  
  readyClient.user.setActivity('generating fursonas 🎨', { type: 3 });
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    // Slash commands
    if (interaction.isChatInputCommand()) {
      const { commandName, options } = interaction;
      
      if (commandName === 'fursona') {
        const subcommand = options.getSubcommand();
        if (subcommand === 'generate') {
          await handleFursonaCommand(interaction);
        } else if (subcommand === 'custom') {
          await handleFursonaCustomCommand(interaction);
        }
      } else if (commandName === 'fursona-profile') {
        await handleProfileCommand(interaction);
      } else if (commandName === 'fursona-collection') {
        await handleCollectionCommand(interaction);
      } else if (commandName === 'fursona-leaderboard') {
        await handleLeaderboardCommand(interaction);
      } else if (commandName === 'fursona-species') {
        await handleSpeciesCommand(interaction);
      } else if (commandName === 'fursona-trade') {
        await handleTradeCommand(interaction);
      } else if (commandName === 'fursona-help') {
        await handleHelpCommand(interaction);
      }
    }
    
    // Buttons
    else if (interaction.isButton()) {
      const customId = interaction.customId;
      
      if (customId.startsWith('fursona_') || customId === 'cancel_delete' || 
          customId === 'fursona_generate' || customId === 'fursona_custom' ||
          customId === 'fursona_profile' || customId === 'fursona_collection' ||
          customId === 'collection_page_' || customId === 'collection_view' ||
          customId === 'profile_collection' || customId === 'profile_leaderboard' ||
          customId === 'profile_settings') {
        await handleFursonaButtons(interaction);
      } else if (customId.startsWith('trade_') || customId.startsWith('confirm_')) {
        await handleTradeButton(interaction);
      }
    }
    
    // Modals
    else if (interaction.isModalSubmit()) {
      const customId = interaction.customId;
      
      if (customId === 'modal_custom_fursona') {
        await handleCustomFursonaModal(interaction);
      } else if (customId.startsWith('modal_rename_')) {
        await handleRenameModal(interaction);
      }
    }
    
    // Select menus
    else if (interaction.isStringSelectMenu()) {
      if (interaction.customId === 'collection_select') {
        await handleCollectionSelect(interaction);
      }
    }
  } catch (error) {
    console.error('Interaction error:', error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: '❌ An unexpected error occurred!', ephemeral: true }).catch(() => {});
    }
  }
});

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  db.close();
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  db.close();
  client.destroy();
  process.exit(0);
});

// ============================================
// LOGIN
// ============================================

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('❌ DISCORD_TOKEN not found in environment variables!');
  console.error('Please create a .env file with your bot token.');
  process.exit(1);
}

client.login(token);