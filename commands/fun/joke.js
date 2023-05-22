const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Żarcik Ci opowiem (ale tylko o Chuck Norris (i po angielsku), bo z neta je biorę)'),

    async execute(interaction) {
        try {
            const fetch = await import('node-fetch')

            const response = await fetch.default('https://api.chucknorris.io/jokes/random');
            const jokeData = await response.json();
            const joke = jokeData.value;

            await interaction.reply(joke);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Poczekaj chwilkę, szukam żartów.', ephemeral: true});
        }
    }
}