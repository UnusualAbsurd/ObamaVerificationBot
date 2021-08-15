const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('../reconDB');

module.exports = {
    name: 'verify',
    Permission: 'SEND_MESSAGES',
    description: 'Verifys the user by giving the user the servers verified role',
    usage: 'v!verify',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(db.has(`role-${message.guild.id}`)){
         
           const rolefetch = await db.get(`role-${message.guild.id}`)
           const rolefind = message.guild.roles.cache.get(rolefetch);
           if(!rolefind) return message.reply(`<:idlefalse:869218432044920902> Error finding verification role \`v!help\` , make sure to setup the verification role or make sure it's not delete`);
           if(message.member.roles.cache.has(rolefind)) return message.reply('<:idlefalse:869218432044920902> You are already verified in this server!');
           if(rolefind) {
              const vmessage = await message.channel.send('<a:idleload:870226406704041985> Verifying......')
               setTimeout(async() => {
                  const messagetosend = await db.get(`msg-${message.guild.id}`) || `<:idletrue:869218417754906635> Congratulations! You are now verified at **${message.guild.name}**`
                  message.member.roles.add(rolefind);
                  message.delete();
                  vmessage.delete();
                  const embed = new MessageEmbed()
                  .setColor(0x2C2F33)
                  .setDescription(messagetosend)
                  .setThumbnail(message.guild.iconURL())
                  message.author.send({embeds: [embed]})
               }, 4500)
               
           }

        } else {
            message.reply('<:idlefalse:869218432044920902> The server does not a verified role setup! `v!help`')
        }


    }
}