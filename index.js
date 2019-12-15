//Evento ON
require('http').createServer().listen(4000)
const { Client, RichEmbed, Collection } = require('discord.js');
const config = require('./config.json');
const bot = new Client({
    autoReconnect: true,
    messageCacheMaxSize: 4048,
    fetchAllMembers: true,
    messageCacheLifetime: 1680,
    setMaxListeners: 1,
})
// Exportações
var moment = require('moment')
require('moment-duration-format')
moment.locale('pt-BR')
var fs = require('fs');
var file = fs.readdirSync('./comandos')
var comandos = file.length
//Evento Ready
bot.login(config.token)
bot.on('ready', () => {
    console.log(`|| Online!\nServidores: ${bot.guilds.size}\nUsuários: ${bot.users.size}\nCanais: ${bot.channels.size}\nEmojis: ${bot.emojis.size}\n${bot.user.username} online com sucesso! ||`);
    bot.user.setPresence({ game: { name: 'Informações e Segurança', type: 1, url: 'https://www.twitch.tv/teletraanone'} });
    //bot.user.setStatus('online')
})
//Evento Msg
bot.on('message', message => {

    if(message.channel.id == `654861454830207018`){
      message.react('652606136649908238')
      message.react('652355231660900362')
    }
  
      if(message.author.bot) return;
      if(message.channel.type === "dm") return;
      if(!message.content.startsWith(config.prefix )) return;
  
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      var comando = args.shift().toLowerCase();
    try { 
      delete require.cache[require.resolve(`./comandos/${comando}.js`)]
      var commandFile = require(`./comandos/${comando}.js`); 
      commandFile.run(bot, message, args);
    } catch (err) { 
      console.error(err); 
    }
  })
// Bem vindo
bot.on('guildMemberAdd', member => {
    let welcome = new RichEmbed()
    .setColor('da4f4e ')
    .setTitle(`👋 | Bem vindo`)
    .setDescription(`Seja bem vindo ao servidor ${member}, com você temos ${member.guild.members.size} membros no servidor\n\nLeia nossas <#654845754501758986> e <#654847376925786113> para não ter nenhum problema!\n\nQualquer dúvida poste-a em <#654861633721466951> e aguarde algum <@&654885636637196297> responder!!`)
    .setThumbnail(member.user.avatarURL)
    bot.channels.get('654848053953560576').send(member, welcome)
})
// Evento de tópico
var traduzir = n => `${n}`.split('').map(e => e + '\u20E3').join('')
bot.on('guildMemberAdd', member => {

  let msg = `<:sugooi:652355231635734528> Usuários: ${traduzir(member.guild.members.size)}`
  let canal = '655451209045508096'
  if(member.guild.channels.get(canal)) {
  bot.guilds.get(member.guild.id).channels.get(canal).setTopic(`**${msg}**`.replace(/{totalmembros}/g, `${traduzir(member.guild.members.size)} `))
  }
})
bot.on('guildMemberRemove', member => {

  let msg = `<:sugooi:652355231635734528> Usuários: ${traduzir(member.guild.members.size)}`
  let canal = '655451209045508096'
  if(member.guild.channels.get(canal)) {
  bot.guilds.get(member.guild.id).channels.get(canal).setTopic(`**${msg}**`.replace(/{totalmembros}/g, `${traduzir(member.guild.members.size)} `))
  }
})
//Auto kick
bot.on("guildMemberAdd", member => {

  let criou = member.user.createdAt
  let criou_em = moment().diff(member.user.createdAt, 'days')
  
  console.log(criou)
  if(criou_em < 2) member.kick()
  let mtv = '\`\`\`Conta criada a menos 2 (dois) dias.\`\`\`'
  let msg = new RichEmbed()
  .setTitle('<:staff:650468878220001280> **|** Punição automática')
  .setDescription(`**Teletraan I** para equipe <@&654885406654857236>, o usuário **${member.user.tag}** **(${member.user.id})** foi expulso automaticamente.\n\nMotivo: ${mtv}`)
  .setColor('RED')
  bot.channels.get('654852888073469965').send(msg);
})