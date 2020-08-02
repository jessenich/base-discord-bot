const Discord = require("discord.js")
const data = require('../data.js')
const fs = require('fs')

var guildConf = require('../data.json')
module.exports.run = async (client, receivedMessage) => {
    let fullCommand = receivedMessage.content.substring(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space

    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (arguments.length == 0) {
        var preds = guildConf[receivedMessage.guild.id].prefix
        let modules = client.commands.keyArray()
        let module_list = modules.join("\n>") + ``;
        let embed = new Discord.RichEmbed()
            .setTitle("Help | KPDEV Bot")
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription("Prefix : `" + preds + "`\nFor Help for a particular Module, Do `help <Module Name>` List of Modules :\n>" + module_list)
            .setColor("BLURPLE")
        receivedMessage.channel.send(embed)
    }
    if (arguments.length == 1) {
        var preds = guildConf[receivedMessage.guild.id].prefix
        let arg = arguments[0]
        if (client.commands.has(arg)) {
            command = client.commands.get(arg)
            let embed = new Discord.RichEmbed()
                .setTitle(command.config.name + " | KPDEV Bot")
                .setDescription(command.help.description)
                .addField('Usage :', "" + command.help.usage.replace('<Prefix>', preds) + "`")
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        }

    }
}
module.exports.config = {
    name: "help",
    aliases: [],
}
module.exports.help = {
    description: "Use this module to get info about other commands",
    usage: "`<Prefix>help \n <Prefix>help purge",
    user: "1"

}