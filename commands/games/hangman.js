const words = require("../../constants/hangmanWords");
const Hangman = require("../../classes/Hangman");

module.exports = {
    name: `hangman`,
    desc: `Hangman`,
    async execute(message, args) {
        hangman = new Hangman();
        const embed = string => `\`\`\`${string}\`\`\``;
        const dmChannel = await message.author.createDM();
        const regex = /[A-Z\u00C0-\u00D6]/i;

        const filter = res => message.author.id === res.author.id
            && (res.content.length === 1 && res.content.match(regex)
                && !hangman.quessedLetters.includes(res.content.toUpperCase()) || res.content === "exit");
        const rules = {
            max: 1,
            time: 30000,
            errors: [`time`]
        }

        dmChannel.send(`You have ${rules.time / 1000} seconds to quess each letter.\nWrite **exit** to quit game`)
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply(`Game is in your DM`);
            }).catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });

        while (hangman.quesses > 0) {
            await dmChannel.send(getGame());
            const game = await dmChannel.awaitMessages(filter, rules)
                .then(collected => hangman.quess(collected.first().content))
                .then(() => hangman.victory())
                .catch(() => true);

            if (game) break;
        }

        await dmChannel.send(getGame());
        if (hangman.victory()) return dmChannel.send(`Congratulations ${message.author}, you win!\nWord was **${hangman.word}**`);
        else return dmChannel.send(`Too bad ${message.author}, you lost!\nWord was **${hangman.word}**`);

        function getGame() {
            const info = [
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