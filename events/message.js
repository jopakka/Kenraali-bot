const Discord = require('discord.js');
const {
    prefix
} = require("../config.json");

module.exports = async (client, message) => {
    // https://github.com/TannerGabriel/discord-bot/blob/master/index.js

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {
        command.execute(message);
    } catch (error) {
        console.log(error);
        message.reply("\u00c4l\u00e4 vaadi liikoja minulta!");
    }
}