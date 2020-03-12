const words = require("../../constants/hangmanWords");
const Hangman = require("../../classes/Hangman");

module.exports = {
    name: `hangman`,
    desc: `Hangman`,
    async execute(message, args) {
        hangman = new Hangman();
        const embed = string => `\`\`\`${string}\`\`\``;
        const regex = /[A-Z\u00C0-\u00D6]/i;

        const filter = res => message.author.id === res.author.id
            && (res.content.length === 1 && res.content.match(regex)
                && !hangman.quessedLetters.includes(res.content.toUpperCase()) || res.content === "exit");
        const rules = {
            max: 1,
            time: 30000,
            errors: [`time`]
        }

        message.channel.send(`You have ${rules.time / 1000} seconds to quess each letter.\nWrite **exit** to quit game`);

        while (hangman.quesses > 0) {
            await message.channel.send(getGame());
            const game = await message.channel.awaitMessages(filter, rules)
                .then(collected => hangman.quess(collected.first().content))
                .then(() => hangman.victory())
                .catch(() => true);

            if (game) break;
        }

        if (hangman.victory()) return message.channel.send(`Congratulations ${message.author}, you win!\nWord was **${hangman.word}**`);
        else return message.channel.send(`Too bad ${message.author}, you lost!\nWord was **${hangman.word}**`);

        function getGame() {
            const  info = [
                `Word: ${hangman.getWord()}\n`,
                `Quesses left: ${hangman.quesses}\n`,
                `Wrong letters: ${hangman.getWrongLetters()}`
            ];

            const game = [
                `${embed(hangman.getGallows())}`,
                `${embed(info.join(""))}`
            ];

            return game.join("")
        }
    }
}