const axios = require('axios');
const Discord = require('discord.js');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "urban",
    desc: "Urban dictionary",
    usage: `, ${prefix}urban <word>`,
    cooldown: 5,
    async execute(message, args) {
        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
        const bold = (srt) => srt.split(/(?:\[|\])/).join(`**`);

        if (!args.length) {
            const [result] = await axios(`http://api.urbandictionary.com/v0/random`)
                .then(raw => raw.data.list)
                .catch(err => console.log(err));

            const embed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle(result.word)
                .setURL(result.permalink)
                .addField('Definition', trim(bold(result.definition), 1024))
                .addField('Example', trim(bold(result.example), 1024))
                .addField('Rating', `${result.thumbs_up} thumbs up. ${result.thumbs_down} thumbs down.`);

            return message.channel.send(embed);
        } else {
            const params = {
                term: args.join(" ")
            }

            const [result] = await axios(`https://api.urbandictionary.com/v0/define?`, { params: params })
                .then(raw => raw.data.list)
                .catch(err => console.log(err));

            if (typeof (result) === "undefined") return message.reply(`No results found for **${args.join(' ')}**`);

            const embed = new Discord.MessageEmbed()
                .setColor(getRandomColor())
                .setTitle(result.word)
                .setURL(result.permalink)
                .addField('Definition', trim(bold(result.definition), 1024))
                .addField('Example', trim(bold(result.example), 1024))
                .addField('Rating', `${result.thumbs_up} thumbs up. ${result.thumbs_down} thumbs down.`);

            return message.channel.send(embed);
        }

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
}