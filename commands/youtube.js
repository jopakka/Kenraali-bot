const ytdl = require('ytdl-core');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "youtube",
    desc: "Play youtube videos on audio channel.",
    usage: ` || ${prefix}<search>`,
    cooldown: 3,
    guildOnly: true,
    execute(message, args) {
        const { voiceChannel } = message.member;

        if (!voiceChannel) {
            return message.reply('Please join a voice channel first!');
        }

        if (!args.length) {
            voiceChannel.join().then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', { filter: 'audioonly' });
                const dispatcher = connection.playStream(stream);

                dispatcher.on('end', () => voiceChannel.leave());
            }).catch(error => console.log(error));
        }
    }
}