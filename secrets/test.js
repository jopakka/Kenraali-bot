module.exports = {
    name: "test",
    desc: "just test",
    async execute(message, args) {
        if (message.author.id !== "352478941891788800") return;

        const fetched = await message.channel.fetchMessages({
            limit: 5,
        });
        message.channel.bulkDelete(fetched)
            .catch(error => console.log(`Couldn't delete messages because of: ${error}`));
    }
};