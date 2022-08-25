require("dotenv").config();
const axios = require('axios');
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', (message) => {
    if(message.content === 'test') {
        message.reply({
            content:"Yessir!"
        })
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'summoner') {

        const summoner = options.getString('name');

        await axios.get(`http://www.enemygosky.com/api/summoner/${summoner}/update`)
        .then(response => {
            console.log(response.data);
            returnSummoner(response.data, interaction);
        })
        .catch(err => {
            if(err.response.data.error) {
                //if(err.response.data.error === "No Summoner Found") {
                    axios.get(`http://www.enemygosky.com/api/summoner/${summoner}`)
                    .then(response => {
                        returnSummoner(response.data, interaction)
                    })
                    .catch(err => {
                        interaction.reply({
                            content: "Error finding summoner " + summoner
                        })
                    })
                //} else if (err.response.data.error === "Updated too recently") {
                    // interaction.reply({
                    //     content: "Updated too recently, try again later"
                    // })
                //}
            }
            
        })
    }
});

function returnSummoner(summonerData, interaction){
    interaction.reply({
        content: "Summoner Name = " + summonerData.summonerName + "\n" +
            "Rank = " + summonerData.tier + " " + summonerData.rank + ", " + summonerData.leaguePoints + " LP\n" +
            "Wins = " + summonerData.wins + "\n" +
            "Losses = " + summonerData.losses,
    
    })
}

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);