require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { generateFursona, createFursonaEmbed } = require('./fursona.js');

// Create client with necessary intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Store active fursonas for regeneration/saving
const activeFursonas = new Map();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Logged in as ${readyClient.user.tag}`);
  console.log(`📊 Serving ${readyClient.guilds.cache.size} guilds`);
  
  // Set bot status
  readyClient.user.setActivity('generating fursonas 🎨', { type: 3 }); // WATCHING
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() && !interaction.isButton()) return;

  // Handle slash commands
  if (interaction.isChatInputCommand()) {
    const { commandName } = interaction;

    if (commandName === 'fursona') {
      await handleFursonaCommand(interaction);
    } else if (commandName === 'fursona-help') {
      await handleHelpCommand(interaction);
    } else if (commandName === 'fursona-species') {
      await handleSpeciesCommand(interaction);
    }
  }

  // Handle button interactions
  if (interaction.isButton()) {
    await handleButtonInteraction(interaction);
  }
});

async function handleFursonaCommand(interaction) {
  const user = interaction.user;
  const fursona = generateFursona();
  
  // Store for button interactions
  activeFursonas.set(user.id, fursona);
  
  const { embeds, components } = createFursonaEmbed(fursona, user);
  
  await interaction.reply({ embeds, components });
}

async function handleHelpCommand(interaction) {
  const embed = new EmbedBuilder()
    .setTitle('🐾 Fursona Bot Help')
    .setColor('#4ECDC4')
    .setDescription('Generate unique fursonas with species, colors, personalities, and backstories!')
    .addFields(
      { name: '/fursona', value: 'Generate a new random fursona', inline: false },
      { name: '/fursona-species', value: 'List all available species', inline: false },
      { name: '/fursona-help', value: 'Show this help message', inline: false },
      { name: '🔄 Regenerate', value: 'Create a completely new fursona', inline: true },
      { name: '💾 Save', value: 'Save the current fursona to your DMs', inline: true },
      { name: '📤 Share', value: 'Share the fursona in the current channel', inline: true }
    )
    .setFooter({ text: 'Have fun creating your character!' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}

async function handleSpeciesCommand(interaction) {
  const { SPECIES } = require('./fursona.js');
  
  // Split species into chunks for embed fields
  const chunks = [];
  for (let i = 0; i < SPECIES.length; i += 10) {
    chunks.push(SPECIES.slice(i, i + 10).join(', '));
  }
  
  const embed = new EmbedBuilder()
    .setTitle('🐾 Available Species')
    .setColor('#45B7D1')
    .setDescription(`Total: ${SPECIES.length} species`)
    .setTimestamp();
  
  chunks.forEach((chunk, i) => {
    embed.addFields({ name: `Species ${i + 1}`, value: chunk, inline: false });
  });
  
  await interaction.reply({ embeds: [embed], ephemeral: true });
}

async function handleButtonInteraction(interaction) {
  const user = interaction.user;
  const customId = interaction.customId;
  
  // Check if user has an active fursona
  let fursona = activeFursonas.get(user.id);
  
  if (!fursona && customId !== 'regenerate') {
    await interaction.reply({ content: '❌ No active fursona found. Use `/fursona` to generate one first!', ephemeral: true });
    return;
  }
  
  switch (customId) {
    case 'regenerate': {
      fursona = generateFursona();
      activeFursonas.set(user.id, fursona);
      const { embeds, components } = createFursonaEmbed(fursona, user);
      await interaction.update({ embeds, components });
      break;
    }
    
    case 'save': {
      const { embeds } = createFursonaEmbed(fursona, user);
      try {
        await user.send({ embeds, content: '💾 Here\'s your saved fursona!' });
        await interaction.reply({ content: '✅ Fursona saved to your DMs!', ephemeral: true });
      } catch (error) {
        await interaction.reply({ content: '❌ Could not send DM. Please enable DMs from server members.', ephemeral: true });
      }
      break;
    }
    
    case 'share': {
      const { embeds } = createFursonaEmbed(fursona, user);
      await interaction.reply({ embeds, content: `${user} shared their fursona!` });
      break;
    }
    
    default:
      await interaction.reply({ content: '❓ Unknown button action', ephemeral: true });
  }
}

// Error handling
client.on(Events.Error, (error) => {
  console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Login
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('❌ DISCORD_TOKEN not found in environment variables!');
  console.error('Please create a .env file with your bot token.');
  process.exit(1);
}

client.login(token);