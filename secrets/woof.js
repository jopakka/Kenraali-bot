const request = require("request");

module.exports = {
    name: "woof",
    desc: "Woof (^.^)",
    cooldown: 10,
    execute(message, args) {
        request({ url: `https://random.dog/woof.json` }, (error, response, body) => {
            if (error) return console.error(error);
            const json = JSON.parse(body);

            message.channel.send(json[`url`])
        })
    }
}