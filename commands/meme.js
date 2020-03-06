const https = require('https');
const request = require("request");
const Fuse = require("fuse.js");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "meme",
    desc: "Make your own memes!",
    usage: ` || ${prefix}meme <template>`,
    cooldown: 3,
    execute(message, args) {
        const url = "https://api.imgflip.com/";
        if (args.length === 0) {
            let reply = "**All available templates:**\n";

            https.get(`${url}get_memes`, response => {
                let templates = "";
                response.on("data", stuff => templates += stuff);

                response.on("end", () => {
                    const json = JSON.parse(templates);
                    if (!json.success) return message.reply("Something went wrong");

                    reply += json.data.memes.map(meme => meme.name).join("\n");

                    return message.author.send(reply, { split: true })
                        .then(() => {
                            if (message.channel.type === 'dm') return;
                            message.reply('I\'ve sent you a DM with all available meme templates!');
                        })
                        .catch(error => {
                            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                        });
                });
            }).on("error", error => console.log(error));
        } else {
            let templates = [];
            https.get(`${url}get_memes`, response => {
                let data = "";
                response.on("data", stuff => data += stuff);

                response.on("end", () => {
                    const json = JSON.parse(data);
                    if (!json.success) return message.reply("Something went wrong");

                    json.data.memes.forEach(meme => templates.push(meme));
                    searchMemes();

                });
            }).on("error", error => console.log(error));

            function searchMemes() {
                const options = {
                    shouldSort: true,
                    threshold: 0.3,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: ["name"]
                };

                const fuse = new Fuse(templates, options);
                const result = fuse.search(args.join(" "));
                if (result.length === 1) {
                    message.reply(`Selected meme: ${result[0].name}\nText boxes: ${result[0].box_count}\n`);
                    return fillMeme(result[0], 0);
                }

                let reply = `**Your search results**\n`;
                reply += result.map(x => x.name).join(`\n`)

                return message.author.send(reply, { split: true })
                    .then(() => {
                        if (message.channel.type === 'dm') return;
                        message.reply('I\'ve sent you a DM with search results!');
                    })
                    .catch(error => {
                        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                        message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                    });
            }

            let memeTexts = [];

            function fillMeme(template, index) {
                if (index === template.box_count) return buildMeme(template);
                index++;
                message.channel.send(`Give text to box: ${index}\nSend "exit" to quit.`);
                const filter = reply => reply.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, { maxMatches: 1, time: 300000 });

                collector.on('collect', m => {
                    if (m.content === "exit") return message.reply("You stopped meme maker");
                    memeTexts.push(m.content);
                });

                collector.on('end', collected => {
                    fillMeme(template, index);
                });
            }

            function buildMeme(template) {
                const params = {
                    template_id: template.id,
                    username: process.env.IMGFLIP_USERNAME,
                    password: process.env.IMGFLIP_PASSWORD,
                    boxes: memeTexts.map(text => ({text: text}))
                }

                request({ url: `${url}caption_image`, method: `post`, qs: params }, (error, response, body) => {
                    if (error) return console.error(error);
                    //console.log(`Get response: ${response.statusCode}`);
                    const json = JSON.parse(body)
                    return message.reply(json.data[`url`]);
                })
            }
        }
    }
}