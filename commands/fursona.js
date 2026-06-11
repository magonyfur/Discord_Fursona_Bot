const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0x00FF88)
            .setTitle('🐾 Your Ultimate Fursona 🐾')
            .setDescription('A masterfully crafted, one-of-a-kind character description.')
            .addFields(
                { name: '🧬 Species', value: fursona.species, inline: true },
                { name: '⚖️ Body Type', value: fursona.bodyType, inline: true },
                { name: '✨ Aesthetic', value: fursona.aesthetic, inline: true },
                { name: '🎭 Personality', value: fursona.personality, inline: true },
                { name: '🔮 Element', value: fursona.element, inline: true },
                { name: '👗 Clothing', value: fursona.clothing, inline: true },
                { name: '🎨 Pattern', value: fursona.pattern, inline: true },
                { name: '🌈 Primary Color', value: fursona.primaryColor, inline: true },
                { name: '🌈 Secondary', value: fursona.secondaryColor, inline: true },
                { name: '👁️ Eye Color', value: fursona.eyeColor, inline: true },
                { name: '⭐ Special Quirk', value: fursona.quirk, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | Endlessly Expandable' });

        await interaction.reply({ embeds: [embed] });
    },
};
