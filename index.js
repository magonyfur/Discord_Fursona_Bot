require('dotenv').config();
const { Client, GatewayIntentBits, Collection, REST, Routes, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

client.once('ready', () => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

const { saveToUser } = require('./utils/storage');

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	} else if (interaction.isButton()) {
		if (interaction.customId === 'save_fursona') {
			const embed = interaction.message.embeds[0];
			if (!embed) return;

			// Extract data from embed fields
			const fields = embed.fields;
			const fursonaData = {
				species: fields[0].value.split('\n')[0].replace('**Species:** ', ''),
				socialStatus: fields[0].value.split('\n')[1].replace('**Social Class:** ', ''),
				personality: fields[0].value.split('\n')[2].replace('**Personality:** ', ''),
				
				primaryColor: fields[1].value.split('\n')[0].replace('**Primary:** ', ''),
				secondaryColor: fields[1].value.split('\n')[1].replace('**Secondary:** ', ''),
				pattern: fields[1].value.split('\n')[2].replace('**Pattern:** ', ''),
				texture: fields[1].value.split('\n')[3].replace('**Texture:** ', ''),
				
				stats: fields[2].value, // Save raw stats string
				
				head: fields[3].value.split('\n')[0].replace('**Head:** ', ''),
				neck: fields[3].value.split('\n')[1].replace('**Neck:** ', ''),
				torso: fields[3].value.split('\n')[2].replace('**Torso:** ', ''),
				legs: fields[3].value.split('\n')[3].replace('**Legs:** ', ''),
				accessory: fields[3].value.split('\n')[4].replace('**Item:** ', ''),
				
				motivation: fields[4].value.split('\n')[0].replace('**Motivation:** ', ''),
				lifeGoal: fields[4].value.split('\n')[1].replace('**Life Goal:** ', ''),
				
				voice: fields[5].value.split('\n')[0].replace('**Voice:** ', ''),
				speech: fields[5].value.split('\n')[1].replace('**Speech:** ', ''),
				scent: fields[5].value.split('\n')[2].replace('**Scent:** ', ''),
				
				quirk: fields[6].value
			};

			const success = saveToUser(interaction.user.id, fursonaData);

			if (success) {
				await interaction.reply({ content: '✅ Fursona saved to your collection!', ephemeral: true });
				// Optionally disable the button after saving
				const disabledButton = ButtonBuilder.from(interaction.component).setDisabled(true);
				const row = new ActionRowBuilder().addComponents(disabledButton);
				await interaction.message.edit({ components: [row] });
			} else {
				await interaction.reply({ content: '❌ Failed to save fursona. Please try again.', ephemeral: true });
			}
		}
	}
});

client.login(process.env.DISCORD_TOKEN);
