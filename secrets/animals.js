const axios = require('axios');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "animals",
    desc: "Get random picture of animal",
    aliases: ['meow', "woof"],
    cooldown: 10,
    async execute(message) {
        const urls = [
            "https://aws.random.cat/meow",
            "https://random.dog/woof.json"
        ];

        const commandName = message.content.slice(prefix.length).toLowerCase();

        if (!this.aliases.includes(commandName)) return message.reply(`Not a valid animal`);

        const index = this.aliases.indexOf(commandName);

        const json = await axios(`${urls[index]}`)
            .then(raw => raw.data)
            .catch(err => console.log(err));

        if (index === 0) return message.channel.send(json[`file`]);
        else if (index === 1) return message.channel.send(json[`url`]);
    }
}