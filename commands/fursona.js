const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0xAA00FF)
            .setTitle('💎 The Infinite Fursona Synthesis 💎')
            .setDescription('**A high-fidelity character profile has been generated from the digital ether.**')
            .addFields(
                { name: '🧬 Basic Info', value: `**Species:** ${fursona.species}\n**Personality:** ${fursona.personality}\n**Home:** ${fursona.habitat}`, inline: false },
                { name: '🎨 Appearance', value: `**Pattern:** ${fursona.pattern}\n**Primary:** ${fursona.primaryColor}\n**Secondary:** ${fursona.secondaryColor}\n**Eyes:** ${fursona.eyeColor}`, inline: true },
                { name: '🦴 Physical Nuances', value: `**Height:** ${fursona.height}\n**Texture:** ${fursona.texture}\n**Marking:** ${fursona.scar}`, inline: true },
                { name: '🧠 Psychology', value: `**Motivation:** ${fursona.motivation}\n**Flaw:** ${fursona.flaw}\n**Fear:** ${fursona.fear}`, inline: false },
                { name: '⚔️ Abilities & Skills', value: `**Power:** ${fursona.power}\n**Talent:** ${fursona.skill}`, inline: true },
                { name: '👂 Sensory', value: `**Voice:** ${fursona.voice}\n**Scent:** ${fursona.scent}`, inline: true },
                { name: '📜 Deep Lore', value: `**Secret:** ${fursona.secret}\n**Signature Item:** ${fursona.item}`, inline: false },
                { name: '⭐ Unique Quirk', value: fursona.quirk, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | The Ultimate Character Engine' });

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
