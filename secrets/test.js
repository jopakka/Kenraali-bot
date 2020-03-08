const request = require("request");

module.exports = {
    name: "test",
    desc: "just test",
    async execute(message, args) {
        if (message.author.id !== "352478941891788800") return;

        const author = message.author;
        const originalChannel = message.channel;
        const dmChannel = await author.createDM();

        const firstReply = `Look your DM`;
        const secondReply = `Message in your DM`;
        const thirdReply = `Reply to original channel`;

        const filter = reply => reply.author.id === message.author.id;

        await dmChannel.send(secondReply).then(async () => {
            if (originalChannel.type === "dm") return;
            await originalChannel.send(firstReply);
        }).then(async () => {
            await dmChannel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: [`time`] })
                .then(async collected => {
                    const msg = collected.values().next().value.content;
                    console.log(msg);
                    await originalChannel.send(thirdReply)
                }).catch(error => {
                    console.log(error);
                })
        });

        console.log("uu baby");
    }
};