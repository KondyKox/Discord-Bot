const {SlashCommandBuilder} = require('discord.js');
const {joinVoiceChannel, createAudioPlayer, createAudioResource} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Gram muzyczkę mordeczko')
        .addStringOption(option => 
            option.setName('url')
            .setDescription('Szukaj muzyki z YT')
            .setRequired(true)    
        ),

    async execute(interaction) {
        const url = interaction.options.getString('url');

        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel)
            return await interaction.reply({content: 'Gdzie ja ci mam wbić debilu!?', ephemeral: true});

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        try {
            const player = createAudioPlayer();
            const resource = createAudioResource(url);

            player.play(resource);
            connection.subscribe(player);

            await interaction.reply({content: 'Gramy muzyczkę wariaty!', ephemeral: true});

            player.on('error', error => {
                console.error(error);
                player.stop();
                connection.destroy();
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'No coś nie działa', ephemeral: true});
            connection.destroy();
        }
    }
}