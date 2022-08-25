const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
require("dotenv").config();

const commands = [
    // new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    // new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    // new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder()
	.setName('summoner')
	.setDescription('Replies with a summoner\'s profile')
	.addStringOption(option =>
		option.setName('name')
			.setDescription('Summoner name to search for')
			.setRequired(true))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.VALORANT_GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);