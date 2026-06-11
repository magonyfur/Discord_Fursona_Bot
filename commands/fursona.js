const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0x00D4FF)
            .setTitle('🌟 The Zenith Fursona Synthesis 🌟')
            .setDescription('**An apex character entity has been manifested from the deep data-stream.**')
            .addFields(
                { name: '🧬 Identity & Social', value: `**Species:** ${fursona.species}\n**Social Class:** ${fursona.socialStatus}\n**Personality:** ${fursona.personality}`, inline: false },
                { name: '🎨 Visual Palette', value: `**Primary:** ${fursona.primaryColor}\n**Secondary:** ${fursona.secondaryColor}\n**Pattern:** ${fursona.pattern}\n**Texture:** ${fursona.texture}`, inline: true },
                { name: '📊 Character Stats', value: `**STR:** ${fursona.stats.STR} | **AGI:** ${fursona.stats.AGI} | **INT:** ${fursona.stats.INT}\n**CHA:** ${fursona.stats.CHA} | **LCK:** ${fursona.stats.LCK} | **FLF:** ${fursona.stats.FLF}`, inline: true },
                { name: '👗 Multi-Layer Wardrobe', value: `**Head:** ${fursona.head}\n**Neck:** ${fursona.neck}\n**Torso:** ${fursona.torso}\n**Legs:** ${fursona.legs}\n**Item:** ${fursona.accessory}`, inline: false },
                { name: '🧠 Psych & Lore', value: `**Motivation:** ${fursona.motivation}\n**Life Goal:** ${fursona.lifeGoal}`, inline: true },
                { name: '👂 Sensory & Verbal', value: `**Voice:** ${fursona.voice}\n**Speech:** ${fursona.speech}\n**Scent:** ${fursona.scent}`, inline: true },
                { name: '⭐ Unique Quirk', value: fursona.quirk, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | Apex Character Engine' });

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
