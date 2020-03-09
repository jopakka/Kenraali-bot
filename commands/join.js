module.exports = {
    name: "join",
    desc: "Invite bot to your voice channel",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Please join a voice channel first!');
        
        await voiceChannel.join();
    }
};