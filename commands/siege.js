const Discord = require('discord.js');
const axios = require('axios');
const siegePlayer = require("../classes/SiegePlayer");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "siege",
    desc: "Inform other to come play Rainbow six: Siege",
    usage: `, ${prefix}siege <command> , ${prefix}siege <platform> <player>`,
    cooldown: 5,
    async execute(message, args) {
        if (!args.length) {
            const time = new Date();
            const minutes = time.getMinutes();

            if (minutes < 45 && minutes > 15) {
                return message.channel.send("Tasalt siege?");
            } else if (minutes >= 45 || minutes <= 15) {
                return message.channel.send("Puolelt siege?");
            }
        } else if (args[0] === "now") {
            return message.channel.send("Nyt siege!", { tts: true });
        } else if (args.length === 2) {
            const services = ["uplay", "psn", "xbl"];
            const url = "https://r6.apitab.com/";
            const dmChannel = await message.author.createDM();

            if (services.indexOf(args[0]) === -1) return message.reply("Possible services: uplay, psn ja xbl");

            const results = await axios(`${url}search/${args[0]}/${args[1]}`)
                .then(raw => Object.keys(raw.data.players))
                .catch(err => console.log(err));

            if (results.length === 0) return message.reply("No users found.");
            else if (results.length > 1) message.reply(`I send results to your DM`);

            for (const result of Object.values(results)) {
                const json = await axios(`${url}player/${result}`)
                    .then(raw => raw.data)
                    .catch(err => console.log(err));

                const player = new siegePlayer(json);

                const stats = new Discord.MessageEmbed()
                    .setColor(player.color)
                    .setTitle(player.name)
                    .setThumbnail(`https://ubisoft-avatars.akamaized.net/${result}/default_256_256.png`)
                    .addField('Level', player.level, true)
                    .addField('Current MMR', `${player.currentmmr}\n${player.rankName}`, true)
                    .addField('Seasons max MMR', `${player.maxmmr}\n${player.maxRankName}`, true)
                    .addField('\u200b', '\u200b', false)
                    .addField("Favorite attacker", player.favattacker, true)
                    .addField("Favorite defender", player.favdefender, true)
                    .addField('\u200b', '\u200b', false)
                    .addField("Ranked K/D", player.rankedKD, true)
                    .addField("Ranked kills", player.rankedKills, true)
                    .addField("Ranked deaths", player.rankedDeaths, true)
                    .addField('\u200b', '\u200b', false)
                    .addField("Ranked W/L", player.rankedWL, true)
                    .addField("Ranked wins", player.rankedWins, true)
                    .addField("Ranked losses", player.rankedLosses, true)

                if (results.length > 1) {
                    dmChannel.send(stats)
                }
                else message.channel.send(stats);
            }
        }
    }
};