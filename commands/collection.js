const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getUserSaves } = require('../utils/storage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('collection')
        .setDescription('View your collection of saved fursonas!'),
    async execute(interaction) {
        const saves = getUserSaves(interaction.user.id);

        if (saves.length === 0) {
            return await interaction.reply({ content: 'You haven\'t saved any fursonas yet! Use `/fursona` and click "Save" to start your collection.', ephemeral: true });
        }

        let currentIndex = saves.length - 1; // Show latest first

        const createEmbed = (index) => {
            const fursona = saves[index];
            return new EmbedBuilder()
                .setColor(0x55FF55)
                .setTitle(`Saved Fursona #${index + 1}`)
                .setDescription(`**Saved on:** ${new Date(fursona.savedAt).toLocaleDateString()}`)
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
                .setFooter({ text: `Page ${index + 1} of ${saves.length} | Your Collection` });
        };

        const createButtons = (index) => {
            const row = new ActionRowBuilder();
            
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('prev_fursona')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(index === 0),
                new ButtonBuilder()
                    .setCustomId('next_fursona')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(index === saves.length - 1)
            );

            return row;
        };

        const response = await interaction.reply({
            embeds: [createEmbed(currentIndex)],
            components: [createButtons(currentIndex)],
            ephemeral: true
        });

        // Simple collector for pagination
        const collector = response.createMessageComponentCollector({ time: 600000 });

        collector.on('collect', async i => {
            if (i.customId === 'prev_fursona') {
                currentIndex--;
            } else if (i.customId === 'next_fursona') {
                currentIndex++;
            }

            await i.update({
                embeds: [createEmbed(currentIndex)],
                components: [createButtons(currentIndex)]
            });
        });

        collector.on('end', () => {
            interaction.editReply({ components: [] }).catch(() => {});
        });
    },
};
