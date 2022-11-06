import { Client, CommandInteractionOptionResolver, GatewayIntentBits, makePlainError, Routes } from 'discord.js';
import { config } from 'dotenv';
import { REST } from '@discordjs/rest';

config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});
const rest = new REST({ version: '10'}).setToken(process.env.BOT_TOKEN);
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        console.log('Command Reached And Logged.')
        interaction.reply({ content: 'The Current Ranks Of This Server Are: \n➊ Owner \n➋ Head Admin \n➌ Admin \n➍ Developer \n➎ Moderator \n➏ Certified Toilet \n➐ Toilet'})
    };
});

async function main() {

    const commands = [{
        name: 'permrank',
        description: 'To Rank A User In The Server',
        options: [
        {
            name: "Player",
            description: "Choose Which User To Rank",
            type: 3,
            required: true,
        }],
    }];


    try {
       await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
       });
       client.login(process.env.BOT_TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main()