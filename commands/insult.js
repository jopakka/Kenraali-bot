const request = require("request");

module.exports = {
    name: "insult",
    desc: "Insult your friends",
    usage: '<user>',
    cooldown: 5,
    args: true,
    guildOnly: true,
    execute(message, args) {
        if (!message.mentions.users.size) return message.reply("No valid user mentioned.");

        request({ url: `https://evilinsult.com/generate_insult.php?lang=en&type=json` }, (error, response, body) => {
            if (error) return console.error(error);
            const insult = JSON.parse(body).insult;

            const member = message.mentions.members.first();
            message.channel.send(`${member}, ${insult}`)
        })
    }
}