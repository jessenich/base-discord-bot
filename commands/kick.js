const Discord = require("discord.js")
const data = require('../data.js')
module.exports.run = async(client, receivedMessage) => {
    if (receivedMessage.member.hasPermission("KICK_MEMBERS")) {
        if (receivedMessage.mentions.members.first()) {
            if (receivedMessage.mentions.members.first().hasPermission("BAN_MEMBERS")) {
                let embed = new Discord.RichEmbed()
                    .setTitle("Kick" + " | KPDEV Bot")
                    .setDescription("I Don't Have Permission to Kick : " + receivedMessage.mentions.members.first())
                    .setTimestamp()
                    .setColor("BLURPLE")

                receivedMessage.channel.send(embed)
            } else {
                let fullCommand = receivedMessage.content.substring(1);
                let splitCommand = fullCommand.split(" ");

                let arguments = splitCommand.slice(2)
                let reason = arguments.join(' ');

                if (reason) {
                    receivedMessage.mentions.members.first().createDM().then((DMChannel) => {
                        DMChannel.send('You are Kicked from ' + receivedMessage.guild.name + "\nReason : " + reason).then(() => {
                            receivedMessage.mentions.members.first().kick();
                            let embed = new Discord.RichEmbed()
                                .setTitle("Kick" + " | KPDEV Bot")
                                .setDescription("Kicked " + receivedMessage.mentions.members.first() + "\nReason : " + reason)
                                .setTimestamp()
                                .setColor("BLURPLE")

                            receivedMessage.channel.send(embed)
                        })
                    })

                } else {
                    receivedMessage.mentions.members.first().createDM().then((DMChannel) => {
                        DMChannel.send('You are Kicked from ' + receivedMessage.guild.name + "\nReason : Unspecified").then(() => {
                            receivedMessage.mentions.members.first().kick();
                            let embed = new Discord.RichEmbed()
                                .setTitle("Kick" + " | KPDEV Bot")
                                .setDescription("Kicked " + receivedMessage.mentions.members.first() + "\nReason : Unspecified")
                                .setTimestamp()
                                .setColor("BLURPLE")

                            receivedMessage.channel.send(embed)
                        })
                    })

                }
            }

        } else {
            let embed = new Discord.RichEmbed()
                .setTitle("Kick" + " | KPDEV Bot")
                .setDescription("You Need to Mention Someone in Order to Kick")
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        }
    } else {
        let embed = new Discord.RichEmbed()
            .setTitle("Kick" + " | KPDEV Bot")
            .setDescription("You Don't Have Permission to Kick : " + receivedMessage.mentions.members.first())
            .setTimestamp()
            .setColor("BLURPLE")

        receivedMessage.channel.send(embed)
    }
}
module.exports.config = {
    name: "kick",
    aliases: [],
}
module.exports.help = {
    description: "Kick a User",
    usage: "`<Prefix>kick <User>",
    user: ""
}