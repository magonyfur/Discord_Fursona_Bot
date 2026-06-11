const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { generateFursona } = require('../utils/generator');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fursona')
        .setDescription('Generates a random fursona description!'),
    async execute(interaction) {
        const fursona = generateFursona();

        const embed = new EmbedBuilder()
            .setColor(0x000000)
            .setTitle('🌌 Multiverse Character Architect 🌌')
            .setDescription('**A sentient entity has been synthesized from across the dimensions.**')
            .addFields(
                { name: '🌐 Origin & Moral Code', value: `**Home World:** ${fursona.origin}\n**Alignment:** ${fursona.alignment}\n**Reputation:** ${fursona.reputation}`, inline: false },
                { name: '🧬 Biological Essence', value: `**Species:** ${fursona.species}\n**Personality:** ${fursona.personality}\n**Element:** ${fursona.element}`, inline: true },
                { name: '🦴 Advanced Physiology', value: `**Blood:** ${fursona.blood}\n**Source:** ${fursona.source}\n**Height:** ${fursona.height}`, inline: true },
                { name: '🎨 Visual Matrix', value: `**Primary:** ${fursona.primaryColor}\n**Secondary:** ${fursona.secondaryColor}\n**Pattern:** ${fursona.pattern}`, inline: true },
                { name: '📊 Multiverse Stats', value: `**STR:** ${fursona.stats.STR} | **AGI:** ${fursona.stats.AGI} | **INT:** ${fursona.stats.INT}\n**CHA:** ${fursona.stats.CHA} | **LCK:** ${fursona.stats.LCK} | **PWR:** ${fursona.stats.PWR}`, inline: false },
                { name: '📜 Defining Life Event', value: fursona.lifeEvent, inline: false },
                { name: '👂 Sensory Signature', value: `**Voice:** ${fursona.voice}\n**Scent:** ${fursona.scent}`, inline: true },
                { name: '⭐ Singular Quirk', value: fursona.quirk, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'Fursona Generator Bot | Dimensional Architect Engine' });

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
