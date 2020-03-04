const fs = require("fs");
const {
    prefix
} = require("../config.json");

module.exports = {
    name: "help",
    desc: "List all commands",
    execute(message) {
        //https://github.com/TannerGabriel/discord-bot/blob/master/commands/help.js

        let string = "";
        const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`./${file}`);
            string += prefix + `${command.name} - ${command.desc} \n`;
        }

        message.reply(string);
    }
}