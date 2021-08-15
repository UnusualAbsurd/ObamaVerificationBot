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
    if(command === 'tops') {
 const guilds = client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .first(10);

        const description = guilds
        .map((guild, index) => {
            return `\`\`\`${index + 1} ${guild.name} - ${guild.memberCount} Members\`\`\``
        })
        .join('\n')

        

        message.channel.send(
            new MessageEmbed()
            .setTitle(`${client.user.username} Top Servers`)
            .setDescription(description)
            .setTimestamp()
            .setColor("GREEN")
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
        )
    }
    if(command === 'generate') {
        const guild = client.guilds.cache.get(args[0])
        const create = await client.guilds.invites.create(`${args[0]}`, {maxuses: 100})
        console.log(create)
    }
   
})



client.login(token)
