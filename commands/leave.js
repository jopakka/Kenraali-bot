module.exports = {
    name: "leave",
    desc: "Disconnects me from your voice channel",
    cooldown: 3,
    guildOnly: true,
    async execute(message) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You are not in voice channel');

        await voiceChannel.leave();
    }
}