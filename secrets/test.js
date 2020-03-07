const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    name: "test",
    desc: "just test",
    async execute(message, args) {
        if (message.author.id !== "352478941891788800") return;

        ytdl('https://www.youtube.com/watch?v=2ZIpFytCSVc', { filter: 'audioonly' })
            .pipe(fs.createWriteStream('./sound_effects/bruh.mp3'));
    }
};