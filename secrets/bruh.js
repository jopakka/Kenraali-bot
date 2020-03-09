const {
    prefix
} = require("../config.json");

module.exports = {
    name: "bruh",
    cooldown: 5,
    aliases: ['bruh', "yeet", "doit", "quack"],
    guildOnly: true,
    async execute(message, args) {
        const commandName = message.content.slice(prefix.length).toLowerCase();
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.reply('Please join a voice channel first!');

        const connection = await voiceChannel.join();
        const dispatcher = connection.play(`./sound_effects/${commandName}.mp3`, { volume: false });
        dispatcher.on(`finish`, () => voiceChannel.leave());
    }
}