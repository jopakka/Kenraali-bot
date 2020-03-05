const Discord = require('discord.js');
const https = require('https');
const siegePlayer = require("../classes/SiegePlayer");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "siege",
    desc: "Inform other to come play Rainbow six: Siege",
    cooldown: 3,
    async execute(message, args) {
        if (args.length === 0) {
            const time = new Date();
            const minutes = time.getMinutes();

            if (minutes < 45 && minutes > 15) {
                message.channel.send("Tasalt siege?");
            } else if (minutes >= 45 || minutes <= 15) {
                message.channel.send("Puolelt siege?");
            }
        } else if (args[0] === "now") {
            message.channel.send("Nyt siege!");
        } else if (args.length === 2) {
            const services = ["uplay", "psn", "xbl"];

            if (services.indexOf(args[0]) !== -1) {
                const url = "https://r6tab.com/api/";

                https.get(url + "search.php?platform=" + args[0] + "&search=" + args[1], response => {
                    let data = "";

                    response.on("data", stuff => {
                        data += stuff;
                    });

                    response.on("end", () => {
                        const searchJson = JSON.parse(data).results;
                        if (typeof searchJson !== "undefined") {
                            for (const idJson of searchJson) {
                                https.get(url + "player.php?p_id=" + idJson.p_id, response => {
                                    let playerData = "";

                                    response.on("data", stuff => {
                                        playerData += stuff;
                                    });

                                    response.on("end", () => {
                                        const json = JSON.parse(playerData);
                                        const player = new siegePlayer(json);

                                        const minStats = new Discord.RichEmbed()
                                            .setColor('#0099ff')
                                            .setTitle(player.name)
                                            .setThumbnail("https://ubisoft-avatars.akamaized.net/" + player.userId + "/default_256_256.png")
                                            .addField('Level', player.level, true)
                                            .addField('Current MMR', player.currentmmr, true)
                                            .addField('Max MMR', player.maxmmr, true)
                                            .addBlankField()
                                            .addField("Favorite attacker", player.favattacker, true)
                                            .addField("Favorite defender", player.favdefender, true)
                                            .addBlankField()
                                            .addField("Ranked K/D", player.rankedKD, true)
                                            .addField("Ranked kills", player.rankedKills, true)
                                            .addField("Ranked deaths", player.rankedDeaths, true)
                                            .addBlankField()
                                            .addField("Ranked W/L", player.rankedWL, true)
                                            .addField("Ranked wins", player.rankedWins, true)
                                            .addField("Ranked loses", player.rankedLoses, true)
                                            .setFooter(player.updated)

                                        message.channel.send(minStats);
                                    });
                                }).on("error", error => console.log(error));
                            }
                        } else {
                            message.reply("Käyttäjiä ei löytynyt");
                        }
                    });
                }).on("error", error => console.log(error));
            } else {
                message.reply("Mahdolliset palvelut: uplay, psn ja xbl");
            }
        }
    }
};