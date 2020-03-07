    module.exports = {
    name: "kick",
    desc: "Kick a user from the server.",
    args: true,
    usage: "<user>",
    guildOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply("No valid user mentioned.");
        }

        const member = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("You don't have rights to kick peoples.")
        }

        if (!member.kickable) {
            return message.reply(`I can't kick ${member.username}`);
        }

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason provided";

        return member.kick(reason)
            .then(() => message.reply(`${member.user.tag} was kicked.`))
            .catch(error => message.reply(`I couldn't kick ${member} because ${error}`);
    }
}