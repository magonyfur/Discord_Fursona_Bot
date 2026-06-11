require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('fursona')
    .setDescription('Generate and manage fursonas')
    .addSubcommand(sub => 
      sub.setName('generate')
        .setDescription('Generate a random fursona')
    )
    .addSubcommand(sub => 
      sub.setName('custom')
        .setDescription('Create a custom fursona with modal')
    ),
    
  new SlashCommandBuilder()
    .setName('fursona-profile')
    .setDescription('View your or another user\'s fursona profile')
    .addUserOption(opt => 
      opt.setName('user')
        .setDescription('User to view (defaults to you)')
        .setRequired(false)
    ),
    
  new SlashCommandBuilder()
    .setName('fursona-collection')
    .setDescription('Browse your or another user\'s fursona collection')
    .addUserOption(opt => 
      opt.setName('user')
        .setDescription('User to view (defaults to you)')
        .setRequired(false)
    )
    .addIntegerOption(opt => 
      opt.setName('page')
        .setDescription('Page number')
        .setMinValue(1)
        .setRequired(false)
    ),
    
  new SlashCommandBuilder()
    .setName('fursona-leaderboard')
    .setDescription('View the top fursona collectors')
    .addIntegerOption(opt => 
      opt.setName('page')
        .setDescription('Page number')
        .setMinValue(1)
        .setRequired(false)
    ),
    
  new SlashCommandBuilder()
    .setName('fursona-species')
    .setDescription('List all available fursona species by rarity'),
    
  new SlashCommandBuilder()
    .setName('fursona-trade')
    .setDescription('Propose a fursona trade with another user')
    .addUserOption(opt => 
      opt.setName('user')
        .setDescription('User to trade with')
        .setRequired(true)
    )
    .addIntegerOption(opt => 
      opt.setName('your_fursona')
        .setDescription('Your fursona ID to offer (from /fursona-collection)')
        .setRequired(true)
    )
    .addIntegerOption(opt => 
      opt.setName('their_fursona')
        .setDescription('Their fursona ID to request (optional for gifts)')
        .setRequired(false)
    ),
    
  new SlashCommandBuilder()
    .setName('fursona-help')
    .setDescription('Show help and command information for the fursona bot')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
  try {
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    
    if (!clientId) {
      console.error('❌ CLIENT_ID not found in .env');
      process.exit(1);
    }
    
    console.log(`🔄 Deploying ${commands.length} slash commands...`);
    console.log(`📋 Commands: ${commands.map(c => c.name).join(', ')}`);
    
    let data;
    if (guildId) {
      // Guild-specific deployment (instant updates, good for development)
      data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
      console.log(`✅ Successfully deployed commands to guild ${guildId}`);
    } else {
      // Global deployment (takes up to 1 hour to propagate)
      data = await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands }
      );
      console.log('✅ Successfully deployed global commands');
    }
    
    console.log(`📋 Registered commands: ${data.map(c => c.name).join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error deploying commands:', error);
    process.exit(1);
  }
}

deployCommands();