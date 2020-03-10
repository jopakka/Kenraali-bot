const Discord = require('discord.js');

module.exports = {
    name: "test",
    desc: "just test",
    async execute(message/*, args*/) {
        if (message.author.id !== "352478941891788800") return;

        const longText = "1234567890123456789012345678901234567890123456789012345678901234";
        const longText2 = "###########\n##        |\n##        @\n##       /|\\\n##        |\n##       / \\\n##\n##";

        return message.channel.send(`\`\`\`${longText2}\`\`\``);
    }
};