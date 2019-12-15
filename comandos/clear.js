let disco = require('discord.js')
var moment = require('moment')
require('moment-duration-format')
module.exports.run = (bot, message, args) => {
    var desenvolvedores = ["524810997672968198"]
    if (!desenvolvedores.includes(message.author.id) & !message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("<:ERRADO:530808552575467528> **|** Você não tem permissão para executar o comando ``clear``");
    try {
    var canal = message.mentions.channels.first() || bot.channels.get(args[0]) || message.channel
    let role = message.member.highestRole;
    canal.bulkDelete(args[0])
    let embed = new disco.RichEmbed()
    .setDescription(`Foram apagadas as ${args[0]} últimas mensagens do canal ${canal} por ${message.author.tag}`)
    .setColor(role.hexColor)   
    .setFooter(`${moment(message.createdAt).format('LLL')}`)
    message.reply(embed)
} catch (error) {
 message.channel.send('<:ERRADO:530808552575467528> **|** Um erro inesperado aconteceu, tente executar o comando novamente, se o erro persistir tente seguir essas instruções:\n• Verificar se o bot tem permissão ``EMBED_LINKS``\n')
}
}