const Discord = require('discord.js');
const client = new Discord.Client();
const data = require('./data.js');
const path = require('path');
const fs = require('fs');

var guildConf = require('./data.json')
fs.readdir("./events/", (err, files) => {
    if (err) {
        return console.error(err);
    }
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        return console.log("No Events !");
    }
    jsfile.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("No Commands !");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`)
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name);
        })
    });
});

client.on('guildCreate', (guild) => { // If the Bot was added on a server, proceed
    if (!guildConf[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
        guildConf[guild.id] = {
            prefix: data.Prefix
        }
    }
    fs.writeFile('./data.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err)
    })

    var cc = guildConf[guild.id].serverCount;
    var nc = cc + 1;
    guildConf[guild.id].serverCount = nc
    fs.writeFile('./data.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err)
    })
});


client.on('guildDelete', (guild) => { // If the Bot was removed on a server, proceed
    delete guildConf[guild.id]; // Deletes the Guild ID and Prefix
    fs.writeFile('./data.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err)
    })
    var cc = guildConf[guild.id].serverCount;
    var nc = cc - 1;
    guildConf[guild.id].serverCount = nc
    fs.writeFile('./data.json', JSON.stringify(guildConf, null, 2), (err) => {
        if (err) console.log(err)
    })
});


client.on('ready', () => {
    console.log(`Logged In Discord As : ${client.user.tag}!`);
});

client.login(data.DiscordToken);
module.exports.client = client;