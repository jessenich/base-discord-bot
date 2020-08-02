const Discord = require("discord.js")
const data = require('../data.js')
const guildConf = require('../data.json')
module.exports.run = async (client, receivedMessage) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Info")
        .addField("Details : ", "Add This Bot to Your Server, [Click Here to Add](https://discord.com/oauth2/authorize?client_id=fixme)")
        .addField("Server Count : `" + guildConf.serverCount + "`", "Support Server, [Join](https://discord.gg/fixme)")
        .setTimestamp()
        .setColor("BLURPLE")
    receivedMessage.channel.send(embed)
}
module.exports.config = {
    name: "info",
    aliases: ["i"],
}
module.exports.help = {
    description: "Info Of Bot",
    usage: "`<Prefix>info",
    user: "1"
}