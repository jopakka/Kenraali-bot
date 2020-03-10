const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
const makingMeme = new Discord.Collection();
const {
    prefix
} = require("../config.json");

module.exports = async (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        || client.games.get(commandName)
        || client.games.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        || client.secrets.get(commandName)
        || client.secrets.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // meme checker starts

    if (message.content.startsWith(prefix) && makingMeme.get(message.author.id)) return;
    if (makingMeme.has(message.author.id)) setTimeout(() => makingMeme.delete(message.author.id), 2 * 60 * 1000);

    // meme checker ends

    if (typeof (command) === "undefined") return message.reply("Sorry I don't know that one");

    // Cooldown starts

    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Cooldown ends
    // GuildOnly starts

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply("I can't execute that command inside DMs!");
    }

    // GuildOnly ends
    // Args stars

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // Args ends

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.reply("Cannot execute that command!");
    }
}

module.exports.makingMeme = makingMeme;