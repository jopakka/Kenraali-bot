const {
    prefix
} = require("../../config.json");

module.exports = {
    name: "roll",
    desc: "Roll a dice",
    usage: ` || ${prefix}roll <max> || ${prefix}roll <start> <end>`,
    execute(message, args) {
        const first = parseInt(args[0]);
        const second = parseInt(args[1]);
        const dice1 = Math.floor(Math.random() * 6) + 1;

        if (args.length > 2 || !args.length) return message.reply(`I rolled between 1-6 and get ${dice1}`);
        if (first >= second) return message.reply("First number must be less than second number");

        let dice2;

        const max = 1000;
        const min = -1000;
        if (args.length === 2) {
            if (first < min || first > max
                || second < min || second > max) return message.reply(`Give number(s) between ${min} and ${max}`);
            dice2 = Math.floor(Math.random() * (second - first)) + first;
            return message.reply(`I rolled between ${first}-${second} and get ${dice2}`)
        } else {
            if (first < min || first > max) return message.reply(`Give number(s) between ${min} and ${max}`);
            dice2 = Math.floor(Math.random() * first) + 1;
            return message.reply(`I rolled between 1-${first} and get ${dice2}`)
        }
    }
}