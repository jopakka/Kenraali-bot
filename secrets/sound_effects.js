const {
    prefix
} = require("../config.json");

module.exports = {
    name: "sound_effects",
    cooldown: 5,
    aliases: ['bruh', "yeet", "doit", "quack"],
    guildOnly: true,
    async execute(message) {
        const commandName = message.content.slice(prefix.length).toLowerCase();
        const voiceChannel = message.member.voice.channel;

        if (!this.aliases.includes(commandName)) return message.reply(`Not a valid sound effect`);
        if (!voiceChannel) return message.reply('Please join a voice channel first!');

        const clientVoiceChannels = message.client.voice.connections.map(x => x.channel);
        const sameChannel = clientVoiceChannels.filter(x => x.id === voiceChannel.id)[0];

        const connection = await voiceChannel.join();

        const dispatcher = connection.play(`./sound_effects/${commandName}.mp3`, { volume: false });
        dispatcher.on('finish', () => {
            if (typeof sameChannel === "undefined") return voiceChannel.leave();
        })
    }
}