const Discord = require("discord.js")
const data = require('../data.js')
const fs = require('fs')

var guildConf = require('../data.json')
module.exports.run = async(client, receivedMessage) => {
    if (receivedMessage.member.hasPermission('ADMINISTRATOR')) {
        let fullCommand = receivedMessage.content.substring(1);
        let splitCommand = fullCommand.split(" ");
        let arguments = splitCommand.slice(1)
        if (arguments.length > 1) {
            let embed = new Discord.RichEmbed()
                .setTitle("Prefix" + " | KPDEV Bot")
                .setDescription("Prefix Can't have Spaces")
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        } else if (arguments.length == 0) {
            let embed = new Discord.RichEmbed()
                .setTitle("Prefix" + " | KPDEV Bot")
                .setDescription("You Need a Prefix to Set")
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        } else {
            guildConf[receivedMessage.guild.id].prefix = arguments[0];
            fs.writeFile('./data.json', JSON.stringify(guildConf, null, 2), (err) => {
                if (err) console.log(err)
            })
            let embed = new Discord.RichEmbed()
                .setTitle("Prefix" + " | KPDEV Bot")
                .setDescription("Set the Prefix to : " + arguments[0])
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        }
    } else {
        let embed = new Discord.RichEmbed()
            .setTitle("Prefix" + " | KPDEV Bot")
            .setDescription("You Need Admin Permissions to Set Prefix")
            .setTimestamp()
            .setColor("BLURPLE")

        receivedMessage.channel.send(embed)
    }
}
module.exports.config = {
    name: "prefix",
    aliases: [],
}
module.exports.help = {
    description: "Set / Get Prefix of Bot",
    usage: "`<Prefix>prefix <Prefix>",
    user: ""
}