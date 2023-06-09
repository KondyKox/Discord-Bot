const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kopnij w dupe kogoś, żeby wyleciał z serwera')
        .addUserOption(option => option.setName('user').setDescription('Użytkownik do wyrzucenia').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Powód wyrzucenia').setRequired(false)),

    async execute(interaction) {
        const userToKick = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason' || 'nie podano');

        try {
            await userToKick.kick(reason);
            await interaction.reply({content: `Użytkownik ${userToKick} został wykopany z serwera z powodu: ${reason}`, ephemeral: true});
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Kurde, twardą ma dupe i nie mogę go wykopać`, ephemeral: true});
        }
    }
}