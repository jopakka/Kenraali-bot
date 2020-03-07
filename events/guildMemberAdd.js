const {
    prefix
} = require("../config.json");

module.exports = (client, member) => {
    member.send(`Welcome to Aamukasa server, ${member}! You can send me \`${prefix}help\` to get to know me better`);
}