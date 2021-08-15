const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../reconDB');

module.exports = {
    name: 'setrole',
    Permission: 'ADMINISTRATOR',
    description: 'Sets the role that will be given when the member uses the verify command',
    usage: 'v!serole <@role>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        
        if(!message.member.permissions.has("ADMINISTRATOR")) return;


        const roletoverify = message.mentions.roles.first();
        if(!roletoverify) return message.channel.send('<:idlefalse:869218432044920902> Please mention a role for me to save!');
        await db.set(`role-${message.guild.id}`, roletoverify.id);
        message.channel.send('<:idletrue:869218417754906635> **Sucessfully saved the role as the server verified role**\n***MAKE SURE MY ROLE IS ABOVE VERIFICATION ROLE**')

    }
}