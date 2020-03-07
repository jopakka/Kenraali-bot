const ytdl = require('ytdl-core');
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "rickroll",
    cooldown: 5,
    aliases: ['rickroll', 'bruh', "yeet", "doit", "quack"],
    guildOnly: true,
    execute(message, args) {
        const commandName = message.content.slice(prefix.length).toLowerCase();
        const { voiceChannel } = message.member;
        
        if (!voiceChannel) return message.reply('Please join a voice channel first!');

        const sounds = [
            ["rickroll", "dQw4w9WgXcQ"],
            ["bruh", "2ZIpFytCSVc"],
            ["yeet", "zM3gQ2ZFcUs"],
            ["doit", "CnCAcMS8FkE"],
            ["quack", "Fw3RB7xnb80"]
        ]
        const soundMap = new Map(sounds);

        if (!args.length) {
            const video = soundMap.get(commandName);
            voiceChannel.join().then(connection => {
                const stream = ytdl(`https://www.youtube.com/watch?v=${video}`, { filter: 'audioonly' });
                const dispatcher = connection.playStream(stream);

                dispatcher.on('end', () => voiceChannel.leave());
            }).catch(error => console.log(error));
        }
    }
}