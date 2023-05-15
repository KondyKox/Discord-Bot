const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje frajera')
        .addUserOption(option => option.setName('user').setDescription('Frajer do zbanowania').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Powód bana').setRequired(false)),
    
    async execute(interaction) {
        const userToBan = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'nie podano';

        const memberToBan = interaction.guild.members.cache.get(userToBan.id);

        if (!memberToBan.bannable)
            return await interaction.reply({content: 'Nie mogę go zbanować. Za mocarny!', ephemeral: true});

        try {
            await memberToBan.ban({reason: reason});
            await interaction.reply({content: `${userToBan.tag} został zbanowany za: ${reason}`, ephemeral: true});
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `Jakiś błąd przy banowaniu`, ephemeral: true});
        }
    }
}