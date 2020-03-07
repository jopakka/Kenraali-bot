module.exports = {
    name: "purge",
    desc: "Delete messages from chat",
    args: true,
    usage: `<amount 2-100>`,
    cooldown: 3,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You have no rights to do that!")
        if (typeof (args) !== "number" || args[0] < 2 || args[0] > 100) return message.reply("Give valid value between 2 and 100");

        const fetched = await message.channel.fetchMessages({
            limit: args[0]
        });

        return message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
};