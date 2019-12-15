let disco = require('discord.js')
var moment = require('moment')
require('moment-duration-format')
moment.locale('pt-PT')
module.exports.run = (bot, message, args) => {
    try {
    let member = message.mentions.users.first() || bot.users.get(args[0]) || message.author;
    let avatar = member.displayAvatarURL;
    let role = message.member.highestRole;
    if (avatar.endsWith(".gif")) {
        avatar = `${member.displayAvatarURL}?size=2048`
    }
    let embed = new disco.RichEmbed()
    .setAuthor(`${member.username}`, `${avatar}`)
    .setImage(`${avatar}`)
    .setDescription(`[Clique](${avatar})`)
    .setColor(role.hexColor)   
    .setFooter(`${moment(message.createdAt).format('LLL')}`)
    message.reply(embed)
} catch (error) {
 message.channel.send(`<:erro:652606136649908238> **|** Não foi possível completar a ação devido ao erro ${error}`)
}
}