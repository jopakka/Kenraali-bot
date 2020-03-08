module.exports = {
    name: "punish",
    desc: "Punish your friends",
    usage: '<user>',
    cooldown: 5,
    args: true,
    guildOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply("No valid user mentioned.");
        }

        const member = message.mentions.members.first();
        message.channel.send(`${member} you have been warned:exclamation::exclamation: :angry:`);
    }
}