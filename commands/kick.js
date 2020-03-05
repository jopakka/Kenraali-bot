    module.exports = {
    name: "kick",
    desc: "Kick a user from the server.",
    args: true,
    usage: "<user>",
    guildOnly: true,
    execute(message, args) {
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
            .catch(error => {
                console.log(error);
                message.reply("Sorry, an error occured.");
            });
    }
}