const call = require("../index");

module.exports = message => {
    const time = new Date();
    const minutes = time.getMinutes();

    if (message.content === call.sign + "siege" && minutes < 45 && minutes > 15) {
        message.reply("Tasalt siege?");
    } else if (message.content === call.sign + "siege" && minutes >= 45 || minutes <= 15) {
        message.reply("Puolelt siege?");
    }
}