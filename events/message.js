const call = require("../index");
const siege = require("../commands/siege");

module.exports = (client, message) => {
    if (message.content.startsWith(call.sign + "siege")) {
        return siege(message);
    }
}