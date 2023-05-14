const {SlashCommandBuilder} = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Pokażę Ci swoje komendy kochaniutki ;)'),
    async execute(interaction) {
        const commands = [];

        interaction.client.commands.forEach(command => {
            commands.push(`/${command.data.name}`);
        });      

        await interaction.reply(`Oto moje komendy ziomek: \n\t${commands.join('\n\t')}`);
    }
}