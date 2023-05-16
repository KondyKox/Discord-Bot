const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Pokażę Ci swoje komendy kochaniutki ;)'),
    async execute(interaction) {
        const commands = [];

        interaction.client.commands.forEach(command => {
            commands.push(`/${command.data.name}`);
        });
        
        // embed po to żeby fajnie wyglądała wiadomość w takim 'okienku'
        const embed = new EmbedBuilder()
            .setTitle('Oto moje komendy ziomek:')
            .setDescription(`\n\t${commands.join('\n\t')}`)
            .setColor('Random')
            .setTimestamp()

        await interaction.reply({embeds: [embed]});
    }
}