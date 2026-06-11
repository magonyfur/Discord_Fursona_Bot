const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0xFF4488)
            .setTitle('🦊 The Ultimate Fursona Generator 🐉')
            .setDescription('**A deeply detailed character profile has been synthesized.**')
            .addFields(
                { name: '🧬 Basic Info', value: `**Species:** ${fursona.species}\n**Personality:** ${fursona.personality}\n**Aesthetic:** ${fursona.aesthetic}`, inline: false },
                { name: '🎨 Appearance', value: `**Pattern:** ${fursona.pattern}\n**Primary:** ${fursona.primaryColor}\n**Secondary:** ${fursona.secondaryColor}\n**Eyes:** ${fursona.eyeColor} (${fursona.pupils})`, inline: true },
                { name: '🦴 Physical Traits', value: `**Ears:** ${fursona.ears}\n**Tail:** ${fursona.tail}\n**Element:** ${fursona.element}`, inline: true },
                { name: '📜 Lore & Background', value: `**Occupation:** ${fursona.occupation}\n**Home:** ${fursona.habitat}`, inline: false },
                { name: '👂 Sensory Details', value: `**Voice:** ${fursona.voice}\n**Scent:** ${fursona.scent}`, inline: true },
                { name: '⭐ Unique Quirk', value: fursona.quirk, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | Infinite Possibilities' });

        const saveButton = new ButtonBuilder()
            .setCustomId('save_fursona')
            .setLabel('Save to Collection')
            .setStyle(ButtonStyle.Success)
            .setEmoji('💾');

        const row = new ActionRowBuilder()
            .addComponents(saveButton);

        await interaction.reply({ embeds: [embed], components: [row] });
    },
};
