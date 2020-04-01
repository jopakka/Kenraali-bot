module.exports = {
    name: "purge",
    desc: "Delete messages from chat",
    args: true,
    guildOnly: true,
    usage: `<amount 1-100>`,
    cooldown: 3,
    async execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You have no rights to do that!");

        const amount = parseInt(args[0]);
        if (amount < 1 || amount > 100 || isNaN(amount)) return message.reply("Give valid value between 2 and 100");

        const fetched = await message.channel.messages.fetch({
            limit: amount + 1
        });

        return message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
    }
};