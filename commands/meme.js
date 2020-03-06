const request = require("request");
const Fuse = require("fuse.js");
const memeTemplates = require("../constants/memeTemplates");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "meme",
    desc: "Make your own memes!",
    usage: ` || ${prefix}meme <template>`,
    cooldown: 3,
    execute(message, args) {
        if (!args.length) {
            let reply = "**All available templates:**\n";
            reply += memeTemplates.map(meme => meme.name).join("\n");

            return message.author.send(reply, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all available meme templates!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        } else {
            let memeTexts = [];

            const options = {
                shouldSort: true,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ["name"]
            };

            const fuse = new Fuse(memeTemplates, options);
            const result = fuse.search(args.join(" "));
            if (result.length === 0) return message.reply("No templates found");
            else if (result.length === 1) {
                message.reply(`Selected meme: ${result[0].name}\nText boxes: ${result[0].box_count}\n`);
                return fillMeme(result[0], 0);
            }

            let reply = `**Your search results. Choose correct template by replying with corresponding number.**\n**Send "exit" to quit**\n`;
            reply += result.map((res, index) => `[${index+1}] ${res.name}`).join("\n");

            message.channel.send(reply);

            const filter = reply => reply.author.id === message.author.id
                && parseInt(reply.content) > 0
                && parseInt(reply.content) < result.length
                || reply.content === "exit";
            const collector = message.channel.createMessageCollector(filter, { maxMatches: 1, time: 300000 });

            collector.on('collect', m => {
                
            });

            collector.on('end', collected => {
                
                collected.forEach(x => {
                    if (x.content === "exit") return message.reply("You stopped meme maker");
                    fillMeme(result[x - 1], 0);
                })
            });

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
                    boxes: memeTexts.map(text => ({ text: text }))
                }

                request({ url: `https://api.imgflip.com/caption_image`, method: `post`, qs: params }, (error, response, body) => {
                    if (error) return console.error(error);
                    //console.log(`Get response: ${response.statusCode}`);
                    const json = JSON.parse(body)
                    return message.reply(json.data[`url`]);
                })
            }
        }
    }
}