module.exports = {
    name: "leave",
    desc: "Disconnects me from your voice channel",
    cooldown: 3,
    guildOnly: true,
    execute(message, args) {
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.reply('You are not in voice channel');

        voiceChannel.leave();
    }
}