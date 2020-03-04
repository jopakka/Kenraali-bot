const Discord = require('discord.js');
const https = require('https');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "siege",
    desc: "Inform other to come play Rainbow six: Siege",
    async execute(message) {
        const args = message.content.slice(prefix.length).split(/ +/);
        if (message.content === prefix + "siege") {
            const time = new Date();
            const minutes = time.getMinutes();

            if (minutes < 45 && minutes > 15) {
                message.channel.send("Tasalt siege?");
            } else if (minutes >= 45 || minutes <= 15) {
                message.channel.send("Puolelt siege?");
            }
        } else if (args.length === 3) {
            const url = "https://r6tab.com/api/search.php?";

            https.get(url + "platform=" + args[1] + "&search=" + args[2], response => {
                let data = "";

                response.on("data", stuff => {
                    data += stuff;
                });

                response.on("end", () => {
                    const json = JSON.parse(data).results;
                    for (let i = 0; i < json.length; i++) {
                        let rank = "";
                        if (json[i].p_currentrank === 1) {
                            rank = 
                        }
                        const r6stat = new Discord.RichEmbed()
                            .setColor('#0099ff')
                            .setTitle(json[i].p_name)
                            .setThumbnail("https://ubisoft-avatars.akamaized.net/" + json[i].p_user + "/default_256_256.png")
                            .addField('Level', json[i].p_level, true)
                            .addField('Current MMR', json[i].p_currentmmr, true)
                            .addField('Inline field title', 'Some value here', true)
                            .addField('Inline field title', 'Some value here', true)
                            .setImage('https://i.imgur.com/wSTFkRM.png');

                        message.reply(r6stat);
                    }
                })
            }).on("error", error => console.log(error));
        }
    }
};