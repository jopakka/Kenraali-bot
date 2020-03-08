const Fuse = require("fuse.js");

module.exports = {
    name: "rps",
    desc: "Rock paper scissors",
    usage: "<choice>",
    args: true,
    execute(message, args) {
        const choices = ["rock", "paper", "scissors"];

        if (!choices.includes(args[0])) return message.reply("Give rock, paper or scissors");

        const choice = Math.floor(Math.random() * choices.length);

        if (choices.indexOf(args[0]) === choice) return message.reply(`I chose ${choices[choice]} too, so it's draw`)
        else if (choice === 0 && choices.indexOf(args[0]) === 1
            || choice === 1 && choices.indexOf(args[0]) === 2
            || choice === 2 && choices.indexOf(args[0]) === 0) return message.reply(`I chose ${choices[choice]} so I lost`)
        else return message.reply(`I chose ${choices[choice]} so I won`)
    }
}