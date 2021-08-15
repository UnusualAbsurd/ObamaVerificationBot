module.exports = {
  name: 'stats',
  run: async(client, message, args) => {

     message.channel.send(`Guilds : **${client.guilds.cache.size}**`)

     const channel = client.guilds.cache.get('871555130347106314').channels.cache.get('871555130888187916')

      await channel.send(client.guilds.cache.map(guild => guild.name))

  } 
}
