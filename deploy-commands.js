require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('fursona')
    .setDescription('Generate a random fursona with species, colors, personality & backstory'),
    
  new SlashCommandBuilder()
    .setName('fursona-help')
    .setDescription('Show help and command information for the fursona bot'),
    
  new SlashCommandBuilder()
    .setName('fursona-species')
    .setDescription('List all available fursona species')
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