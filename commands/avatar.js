const {
    prefix
} = require(`../config.json`);

module.exports = {
    name: `avatar`,
    desc: `Show users avatar`,
    aliases: [`icon`, `pfp`],
    usage: `, ${prefix}avatar <user>`,
    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 })}`);
        }

        const avatars = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 })}`;
        });

        message.channel.send(avatars);
    }
}