const Discord = require("discord.js");
const data = require("../data.js");
const fs = require('fs')

var guildConf = require('../data.json')
module.exports = async (client, message) => {
    if (!message.guild || message.channel.type === "dm" || message.author.bot) return;
    commandhandler(client, message)
};

function commandhandler(client, receivedMessage) {
    if (receivedMessage.content.startsWith(guildConf[receivedMessage.guild.id].prefix)) {
        const prefixless = receivedMessage.content.substring(guildConf[receivedMessage.guild.id].prefix.length)
        const command = prefixless.split(" ")[0]
        console.log("Command Received : " + command)
        if (command) {
            let commandfile = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (commandfile) {
                commandfile.run(client, receivedMessage);
                return true
            }
        } else return false
    }
    return false
}