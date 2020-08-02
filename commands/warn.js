const Discord = require("discord.js")
const data = require('../data.js')
module.exports.run = async(client, receivedMessage) => {
    if (receivedMessage.member.hasPermission("KICK_MEMBERS")) {
        if (receivedMessage.mentions.members.first()) {
            if (receivedMessage.mentions.members.first().hasPermission("KICK_MEMBERS")) {
                let embed = new Discord.RichEmbed()
                    .setTitle("Warn" + " | KPDEV Bot")
                    .setDescription("I Don't Have Permission to Warn : " + receivedMessage.mentions.members.first())
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
                        let embed = new Discord.RichEmbed()
                            .setTitle("Warn" + " | KPDEV Bot")
                            .setDescription("You Are Warned in " + receivedMessage.guild.name + "\nReason : " + reason)
                            .setTimestamp()
                            .setColor("BLURPLE")

                        DMChannel.send(embed).then(() => {
                            let embed = new Discord.RichEmbed()
                                .setTitle("Warn" + " | KPDEV Bot")
                                .setDescription("Warned " + receivedMessage.mentions.members.first() + "\nReason : " + reason)
                                .setTimestamp()
                                .setColor("BLURPLE")

                            receivedMessage.channel.send(embed)
                        })
                    })
                } else {
                    receivedMessage.mentions.members.first().createDM().then((DMChannel) => {
                        let embed = new Discord.RichEmbed()
                            .setTitle("Warn" + " | KPDEV Bot")
                            .setDescription("You Are Warned in " + receivedMessage.guild.name + "\nReason : Unspecified")
                            .setTimestamp()
                            .setColor("BLURPLE")

                        DMChannel.send(embed).then(() => {
                            let embed = new Discord.RichEmbed()
                                .setTitle("Warn" + " | KPDEV Bot")
                                .setDescription("Warned " + receivedMessage.mentions.members.first() + "\nReason : Unspecified")
                                .setTimestamp()
                                .setColor("BLURPLE")

                            receivedMessage.channel.send(embed)
                        })
                    })

                }
            }
        } else {
            let embed = new Discord.RichEmbed()
                .setTitle("Warn" + " | KPDEV Bot")
                .setDescription("You Need to Mention Someone in Order to Warn")
                .setTimestamp()
                .setColor("BLURPLE")

            receivedMessage.channel.send(embed)
        }
    } else {
        let embed = new Discord.RichEmbed()
            .setTitle("Warn" + " | KPDEV Bot")
            .setDescription("You Don't Have Permission to Warn : " + receivedMessage.mentions.members.first())
            .setTimestamp()
            .setColor("BLURPLE")

        receivedMessage.channel.send(embed)
    }
}
module.exports.config = {
    name: "warn",
    aliases: [],
}
module.exports.help = {
    description: "Warn a User",
    usage: "`<Prefix>warn <User> Reason",
    user: ""
}