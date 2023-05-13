require('dotenv').config();

// Tworzenie klienta Discord.js
const { Client, GatewayIntentBits, ActivityType, Collection } = require('discord.js');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Tokeny do bota z pliku .env
const bot_token = process.env.DISCORD_TOKEN;

// Odczytywanie komend z plików
client.commands = new Collection();

for (const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.set(command.data.name, command);
    }
}

// To się dzieje po włączeniu bota
client.once('ready', () => {
    console.log('Bot wstał');

    client.user.setPresence({ activities: [{name: 'Kondi to koks', type: ActivityType.Streaming}] })
})

// Powitanie członków
client.on('guildMemberAdd', member => {
    const embed = new EmbedBuilder()
    .setTitle('Nowy debil!')
    .setDescription(`Siema **<@${member.user.id}>**, nikt cie tu nie chce!`)
    .setColor('Aqua')
    .setFooter({text: member.user.username, iconURL: member.user.avatarURL({dynamic: true})})
    .setTimestamp();

    // Wysyła wiadomość powitalną na kanał (id kanału tu jest podane)
    member.client.channels.cache.get('1077702973649600667').send({embeds: [embed]});
});

// Odpala komendę
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command)
        return console.error('Nie ma takiej komendy ziomek!');
    
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Coś nie działa", ephemeral: true });
    }
});

// Event po wpisaniu słowa 'król' lub tym podobne
const king_words = ['krol', 'king', 'król', 'konrad', 'kondi', 'kondy', 'kondrad'];

client.on('message', message => {
    for (let i = 0; i < king_words.length; i++) {
        if (message.content.includes(king_words[i]).toLowerCase()) {
            message.channel.send({files: [{attachment: './src/king.png'}]});
            break;
        }
    }
});

// Loguje bota
client.login(bot_token);