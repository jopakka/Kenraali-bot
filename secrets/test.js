const {
    prefix
} = require("../config.json");

module.exports = {
    name: "test",
    desc: "just test",
    secret: true,
    execute(message, args) {
        if (message.author.id !== "352478941891788800") return;

        console.log(message.content)

        message.channel.send()
    }
};