const words = require("../../constants/hangmanWords");

module.exports = {
    name: `hangman`,
    desc: `Hangman`,
    execute(message, args) {
        const embed = string => `\`\`\`${string}\`\`\``;
        const hangman = [
            "###########\n##        |\n##\n##\n##\n##\n##\n##",
            "###########\n##        |\n##        @\n##\n##\n##\n##\n##",
            "###########\n##        |\n##        @\n##        |\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##       /\n##\n##",
            "###########\n##        |\n##        @\n##       /|\\\n##        |\n##       / \\\n##\n##"
        ];

        const amount = 6;
        const wrongLetters = [];
        const rightWord = `_ _ _ _ _`;
        const info = [
            `Word: ${rightWord}\n`,
            `Quesses left: ${amount}\n`,
            `Wrong letters: ${wrongLetters.join("")}`
        ];

        const game = [
            `${embed(hangman[0])}`,
            `${embed(info.join(""))}`
        ];

        const word = words[Math.floor(Math.random() * words.length)];
        console.log(word)

        message.reply(game.join(""))
    }
}