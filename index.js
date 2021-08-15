const { Discord, Client, Collection, Intents, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
require('dotenv').config();
const token = process.env.TOKEN;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    setInterval(async() => {
       client.user.setActivity(`v!help | Verifying ${client.users.cache.size} users!`, 
     {
         type: 'PLAYING'
     }
    )
    }, 15000)
})


module.exports = client;



client.commands = new Collection();
const fs = require('fs')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command)
}

client.on('messageCreate', async(message) => {
    const prefix = "v!";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    if(!message.content.startsWith(prefix)) return;
  
    const command = args.shift().toLowerCase();
    if(command === 'setrole') {
        client.commands.get('setrole').run(client, message, args);
    } 
    if(command === 'verify') {
        client.commands.get('verify').run(client, message, args);
    }
    if(command === 'setembed') {
        client.commands.get('embed').run(client, message, args);
    }
    if(command === 'help') {
        client.commands.get('help').run(client, message, args);
    }
    if(command === 'stats') {
        client.commands.get('stats').run(client, message, args);
    }
})



client.login(token)
