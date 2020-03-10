const {
    prefix
} = require("../config.json");

module.exports = {
    name: "rl",
    desc: "Inform other to come play Rocket League",
    usage: `, ${prefix} <command>`,
    guildOnly: true,
    execute(message, args) {
        if (!args.length) {
            const time = new Date();
            const minutes = time.getMinutes();

            if (minutes < 45 && minutes > 15) {
                return message.channel.send("Tasalt rocket league?");
            } else if (minutes >= 45 || minutes <= 15) {
                return message.channel.send("Puolelt rocket league?");
            }
        } else if (args[0] === "now") {
            return message.channel.send("Nyt rocket league!", {tts: true});
        }
    }
};