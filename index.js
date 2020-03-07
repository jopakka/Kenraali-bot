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

client.secrets = new Discord.Collection();
const secretFiles = fs.readdirSync("./secrets").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of secretFiles) {
    const secret = require(`./secrets/${file}`);
    client.secrets.set(secret.name, secret);
}

client.login(process.env.BOT_TOKEN);