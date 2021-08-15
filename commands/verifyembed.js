const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../reconDB')

module.exports = {
    name: 'embed',
    Permissions: 'ADMINISTRATOR',
    description: 'Sets the verified message in an embed',
    usage: 'v!setembed <Verified Message>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        if(!message.member.permissions.has("ADMINISTRATOR")) return;

        const messagetosend = args.slice(0).join(" ");
        if(!messagetosend) return message.reply('<:idlefalse:869218432044920902> What is the verified message you want me to save?');
        if(messagetosend) {
            await db.set(`msg-${message.guild.id}`, messagetosend);
            message.channel.send('<:idletrue:869218417754906635> **Sucessfully saved the message**');
        }

    }
}