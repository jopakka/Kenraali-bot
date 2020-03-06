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
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.filter(command => !command.hidden || typeof (command.hidden) === "undefined").map(command => `${prefix}${command.name}`).join('\n'));
            data.push(`\nYou can send \`${prefix}help <command name>\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
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

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        if (command.secret) return message.reply("You just tried to look help to secret command");

        data.push(`**Name:** ${command.name}`);
        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        data.push(`**Usage:** ${prefix}${command.name} ${command.usage || ""}`);
        data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);
        if(command.guildOnly) data.push(`**Server only command**`);

        message.channel.send(data, { split: true });

    }
}