const {
    prefix
} = require("../config.json");

module.exports = {
    name: "help",
    desc: "List all of my commands or info about a specific command.",
    aliases: ['commands'],
    usage: ` || ${prefix}help <command>`,
    cooldown: 5,
    execute(message, args) {
        const commandData = [];
        const { commands, secrets } = message.client;
        console.log(secrets)

        if (!args.length) {
            commandData.push('Here\'s a list of all my commands:');
            commandData.push(commands.filter(command => !command.secret || typeof (command.secret) === "undefined")
                .map(command => `${prefix}${command.name}`).join('\n'));
            commandData.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

            return message.author.send(commandData, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        const secret = secrets.get(name) || secrets.find(c => c.aliases && c.aliases.includes(name));

        if (!command && !secret) return message.reply('That\'s not a valid command!');

        if (secret) return message.reply("You just tried to look help to secret command");

        commandData.push(`**Name:** ${command.name}`);
        if (command.aliases) commandData.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) commandData.push(`**Description:** ${command.description}`);
        commandData.push(`**Usage:** ${prefix}${command.name} ${command.usage || ""}`);
        commandData.push(`**Cooldown:** ${command.cooldown || 2} second(s)`);
        if(command.guildOnly) commandData.push(`**Server only command**`);

        message.channel.send(commandData, { split: true });

    }
}