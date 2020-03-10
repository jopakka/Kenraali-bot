const Discord = require('discord.js');
const request = require("request");
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

            if (services.indexOf(args[0]) === -1) return message.reply("Possible services: uplay, psn ja xbl");

            const url = "https://r6tab.com/api/";

            request({ url: `${url}search.php?platform=${args[0]}&search=${args[1]}` }, (sError, sResponse, sBody) => {
                if (sError) return console.error(sError);

                const searchJson = JSON.parse(sBody).results;
                if (typeof searchJson === "undefined") return message.reply("No users found.");

                for (const idJson of searchJson) {
                    request({ url: `${url}player.php?p_id=${idJson.p_id}` }, (iError, iResponse, iBody) => {
                        if (iError) return console.error(iError);

                        const json = JSON.parse(iBody);
                        const player = new siegePlayer(json);

                        const minStats = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(player.name)
                            .setThumbnail(`https://ubisoft-avatars.akamaized.net/${player.userId}/default_256_256.png`)
                            .addField('Level', player.level, true)
                            .addField('Current MMR', player.currentmmr, true)
                            .addField('Max MMR', player.maxmmr, true)
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
                            .addField("Ranked loses", player.rankedLoses, true)
                            .setFooter(player.updated)

                        return message.channel.send(minStats);
                    })
                }
            });
        }
    }
};