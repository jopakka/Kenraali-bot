const request = require("request");

module.exports = {
    name: "meow",
    desc: "Meow (^.^)",
    cooldown: 10,
    execute(message, args) {
        request({ url: `https://aws.random.cat/meow` }, (error, response, body) => {
            if (error) return console.error(error);
            const json = JSON.parse(body);

            message.channel.send(json[`file`])
        })
    }
}