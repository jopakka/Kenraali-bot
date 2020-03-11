const axios = require('axios');
const Fuse = require("fuse.js");
const memeTemplates = require("../constants/memeTemplates");
const makingMeme = require(`../events/message`).makingMeme;
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "meme",
    desc: "Make your own memes!",
    usage: `, ${prefix}meme <template>`,
    cooldown: 3,
    async execute(message, args) {
        const author = message.author;
        const originalChannel = message.channel;
        const dmChannel = await author.createDM();
        let memeTexts = [];

        if (!args.length) {
            let reply = "**All available templates:**\n";
            reply += memeTemplates.map(meme => `${meme.name} **Boxes:** ${meme.box_count}`).join("\n");

            return dmChannel.send(reply, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all available meme templates!');
                }).catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        } else {
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
                const reply = `Selected meme: ${result[0].name}\nText boxes: ${result[0].box_count}`;
                await checkDM(reply);
                return fillMeme(result[0], 0);
            }

            let botReply = `**Your search results. Choose correct template by replying with corresponding number.**\n**Send "exit" to quit**\n`;
            botReply += result.map((meme, index) => `[${index + 1}] ${meme.name} **Boxes:** ${meme.box_count}`).join("\n");

            await checkDM(botReply);

            const filter = reply => reply.author.id === message.author.id
                && parseInt(reply.content) > 0
                && parseInt(reply.content) <= result.length;

            await dmChannel.awaitMessages(filter, { max: 1, time: 30000, errors: [`time`] })
                .then(async collected => {
                    const msg = collected.values().next().value.content;
                    return fillMeme(result[msg - 1], 0);
                }).catch(error => {
                    console.log(error);
                    return dmChannel.send("I'm out");
                })
        }

        async function fillMeme(template, index) {
            started();
            if (index === template.box_count) return buildMeme(template);

            index++;
            const botText = `Give text to box: ${index}\nSend "exit" to quit.`;

            await dmChannel.send(botText);

            const filter = reply => reply.author.id === author.id;
            await dmChannel.awaitMessages(filter, { max: 1, time: 30000, errors: [`time`] })
                .then(collected => {
                    const msg = collected.values().next().value.content;
                    if (msg === "exit") {
                        stopped();
                        return dmChannel.send("You stopped meme making");
                    }
                    memeTexts.push(msg.toUpperCase());
                    fillMeme(template, index);
                }).catch(error => {
                    console.log(error);
                    return dmChannel.send("I'm out");
                })
        }

        function buildMeme(template) {
            stopped();
            const params = {
                template_id: template.id,
                username: process.env.IMGFLIP_USERNAME,
                password: process.env.IMGFLIP_PASSWORD,
                boxes: memeTexts.map(text => ({ text: text }))
            }

            axios(`https://api.imgflip.com/caption_image`, { params: params })
                .then(res => {
                    const json = JSON.parse(res.data)
                    return originalChannel.send(json.data[`url`]);
                }).catch(err => console.log(err));
        }

        function started() {
            makingMeme.set(message.author.id, true);
        }

        function stopped() {
            makingMeme.set(message.author.id, false);
        }

        async function checkDM(botReply) {
            await dmChannel.send(botReply).then(async () => {
                if (originalChannel.type === "dm") return;
                await message.reply("check your DM");
            });
        }
    }
}