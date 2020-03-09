const {
    prefix
} = require("../config.json");

module.exports = {
    name: "avatar",
    desc: "Show users avatar",
    aliases: ["icon", "pfp"],
    usage: ` | ${prefix} <user>`,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL()}`);
        }

        const avatars = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
        });

        message.channel.send(avatars);
    }
}