const request = require("request");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "animals",
    desc: "Get random picture of animal",
    aliases: ['meow', "woof"],
    cooldown: 10,
    execute(message) {
        const urls = [
            "https://aws.random.cat/meow",
            "https://random.dog/woof.json"
        ];

        const commandName = message.content.slice(prefix.length).toLowerCase();

        if (!this.aliases.includes(commandName)) return message.reply(`Not a valid animal`);

        const index = this.aliases.indexOf(commandName);

        request({ url: `${urls[index]}` }, (error, response, body) => {
            if (error) return console.error(error);
            const json = JSON.parse(body);

            if (index === 0) return message.channel.send({ files: [json[`file`]] });
            else if (index === 1) return message.channel.send({ files: [json[`url`]] });
        })
    }
}