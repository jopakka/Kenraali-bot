const ytdl = require('ytdl-core');
const ytsr = require('ytsr');

module.exports = {
    name: "youtube",
    desc: "Play youtube videos on audio channel.",
    aliases: ['yt'],
    usage: `<search>`,
    cooldown: 3,
    args: true,
    guildOnly: true,
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.reply('Please join a voice channel first!');

        const clientVoiceChannels = message.client.voice.connections.map(x => x.channel);
        const sameChannel = clientVoiceChannels.filter(x => x.id === voiceChannel.id)[0];

        ytsr.getFilters(args.join(" "), (error, filters) => {
            if (error) return message.reply(`Some error occured: ${error}`);

            const filter = filters.get('Type').find(o => o.name === 'Video');
            const options = {
                limit: 1,
                nextpageRef: filter.ref
            }

            ytsr(null, options, (error, results) => {
                if (error) return message.reply(`Some error occured: ${error}`);
                return playVideo(results.items[0].link)
            });
        });

        function playVideo(url) {
            voiceChannel.join().then(connection => {
                const stream = ytdl(url, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => {
                    if (typeof sameChannel === "undefined") return voiceChannel.leave();
                })
            }).catch(error => {
                console.log(error);
                return message.reply(`Some error occured: ${error}`)
            })
        }
    }
}