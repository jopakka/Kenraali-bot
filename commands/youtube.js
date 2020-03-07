const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "youtube",
    desc: "Play youtube videos on audio channel.",
    usage: `<search>`,
    cooldown: 3,
    args: true,
    guildOnly: true,
    execute(message, args) {
        const { voiceChannel } = message.member;

        if (!voiceChannel) return message.reply('Please join a voice channel first!');

        ytsr.getFilters(args.join(" "), (error, filters) => {
            if (error) return message.reply("Error");

            const filter = filters.get('Type').find(o => o.name === 'Video');
            const options = {
                limit: 1,
                nextpageRef: filter.ref
            }

            ytsr(null, options, (error, results) => {
                if (error) return message.reply("Error");
                return playVideo(results.items[0].link)
            });
        });

        function playVideo(url) {
            voiceChannel.join().then(connection => {
                const stream = ytdl(url, { filter: 'audioonly' });
                connection.playStream(stream);
            }).catch(error => console.log(error));
        }
    }
}