const fs = require('fs')
require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.sign = "!";

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});

client.login(process.env.BOT_TOKEN);