const call = require("../index");

module.exports = message => {
    if (message.content === call.sign + "help") {
        message.reply("Apujako etsit?");
    }
}