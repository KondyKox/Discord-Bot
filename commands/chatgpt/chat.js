require('dotenv').config({path: '../../.env'});

const {SlashCommandBuilder} = require('discord.js');
const {Configuration, OpenAIApi} = require('openai');

// Konfiguracja OpenAI
//openai.apiKey = process.env.OPENAI_KEY;
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Działam jak ChatGPT, daj pytanie - ja odpowiem')
        .addStringOption(option => option.setName('text').setDescription('Twoje żądanie').setRequired(true)),

    async execute(interaction) {
        const text = interaction.options.getString('text');

        try {
            // Wywołanie API OpenAI
            const response = await openai.createCompletion({
                engine: 'text-davinci-003',
                prompt: `${text}\n\nJa:`,
                maxTokens: 150,
                n: 1,
                stop: '\n\n',
                temperature: 0.7
            })

            const generatedText = response.data.choices[0].text.trim();
            await interaction.reply(generatedText);
            
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'Na razie nie działam. Spróbuj później.', ephemeral: true});
        }
    }
}