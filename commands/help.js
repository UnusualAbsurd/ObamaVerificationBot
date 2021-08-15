const { Client, Message, MessageEmbed } = require('discord.js');
const { commands } = require('..');
const db = require('../reconDB')

module.exports = {
    name: 'help',
    Permission: 'SEND_MESSAGES',
    description: 'Sends an embed containing the help commands',
    usage: 'v!help',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        const owner = client.users.cache.get('746721583804055634')
        
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} Commands`)
        .setURL('https://discord.com/oauth2/authorize?client_id=849183029531246613&scope=bot&permissions=1544023104')
        .setDescription('```Use v!help <command name> to get more information about the commands```')
        .addField('**Commands**', '`v!verify`\n`v!setrole`\n`v!setembed`\n`v!help`')
        .setFooter(owner.tag, owner.displayAvatarURL({dynamic: true}))
        .setColor(0x2C2F33)

        if(!args[0]) {
            message.channel.send({embeds: [embed]})
        }

        if(args[0]) {


            let findCommands = client.commands.get(args[0]) 
            if(!findCommands) message.reply('<:idlefalse:869218432044920902> That command does not exist')

            const main = new MessageEmbed()
            .setTitle(`${client.user.username} | ${args[0]} Command`)
            .addFields(
                {name: '**Command Name**', value: findCommands.name || "None Provided"},
                {name: '**Description**', value: findCommands.description || "None Provided"},
                {name: '**Permissions**', value: commands.Permission || "None Provided"},
                {name: '**Usage**', value: findCommands.usage || "None Provided"}
            )
                    .setFooter(owner.tag, owner.displayAvatarURL({dynamic: true}))
            .setColor(0x2C2F33)
            .setTimestamp()

            message.channel.send({embeds: [main]})
        }
    }
}
