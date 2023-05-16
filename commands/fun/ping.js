const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Oznacz frajera ile tylko chcesz')
        .addUserOption(option => option.setName('user').setDescription('Użytkownik do pingowania').setRequired(true))
        .addIntegerOption(option => option.setName('amount').setDescription('Ilość pingów').setRequired(true)),

    async execute(interaction) {
        const userToPing = interaction.options.getUser('user');
        const amountOfPing = interaction.options.getInteger('amount');

        // Pingowanie użytkownika
        try {
            for (let i = 0; i < amountOfPing; i++) {
                await interaction.channel.send(`${userToPing}`);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply('Nie mogę pingować. Spróbuj za chwilę');
        }
    }
}