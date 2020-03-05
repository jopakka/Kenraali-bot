const {
    prefix
} = require("../config.json");

module.exports = {
    name: "test",
    desc: "just test",
    execute(message, args) {
        if (message.author.id !== "352478941891788800") return;

        console.log(message.member.hasPermission("KICK_MEMBERS"))
    }
};