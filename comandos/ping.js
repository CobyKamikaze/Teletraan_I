module.exports.run = async (bot, message, args) => {
    let shard = '<a:pingAnimated:655173642212212747><a:pingAnimated:655173642212212747>'
    const a = await message.channel.send(`Ping: Calculando... | Websocket: Calculando...| Shard: Calculando...`);
    a.edit(`Ping: ${Math.round(bot.ping)}ms | Websocket: ${a.createdTimestamp - message.createdTimestamp}ms | Shard: ${shard}`)
} 
