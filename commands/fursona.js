const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('✨ Your New Fursona ✨')
            .setDescription('Here is a unique, randomly generated fursona just for you!')
            .addFields(
                { name: 'Species', value: fursona.species, inline: true },
                { name: 'Personality', value: fursona.personality, inline: true },
                { name: 'Pattern', value: fursona.pattern, inline: true },
                { name: 'Primary Color', value: fursona.primaryColor, inline: true },
                { name: 'Secondary Color', value: fursona.secondaryColor, inline: true },
                { name: 'Eye Color', value: fursona.eyeColor, inline: true },
                { name: 'Quirk/Accessory', value: fursona.quirk, inline: false },
                { name: 'Hobby', value: fursona.hobby, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | Keep rolling for more!' });

        await interaction.reply({ embeds: [embed] });
    },
};
