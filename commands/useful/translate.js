const { SlashCommandBuilder } = require('discord.js');
const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Tłumaczę podany tekst na wybrany język')
        .addStringOption(option => option.setName('text').setDescription('Tekst do tłumaczenia').setRequired(true))
        .addStringOption(option => option.setName('language').setDescription('Język, na który mam tłumaczyć').setRequired(false)),

    async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language') || 'pl';

        try {
            const result = await translate(text, { to: language });
            const translatedText = result.text;

            await interaction.reply(`**"${text}"**\n\tprzetłumaczone na język ${language}: \n**"${translatedText}"**`);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'Czekaj, uczę się języka. Spróbuj zaraz', ephemeral: true });
        }
    },
};