require('dotenv').config();

const {REST, Routes} = require('discord.js');
const fs = require('fs');

// Tokeny do bota z pliku .env
const bot_token = process.env.DISCORD_TOKEN;
const client_id = process.env.CLIENT_ID;

// Odczutyje komendy z plików
const commands = [];

for (const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        commands.push(command.data.toJSON());
    }
}

// Aktualizacja komend
const rest = new REST({version: '10'}).setToken(bot_token);

(async () => {
    try {
        console.log('Aktualizuję komendy...');

        const data = await rest.put(Routes.applicationCommands(client_id), {body: commands});

        console.log('Komendy zaktualizowane.');
    } catch (error) {
        console.error(error);
    }
})();