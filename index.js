const fs = require('fs');
require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();

fs.readdir('./events/', (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventHandler(client, ...args));
    });
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const testFiles = fs.readdirSync("./test").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of testFiles) {
    const command = require(`./test/${file}`);
    client.commands.set(command.name, command);
}

client.login(process.env.BOT_TOKEN);