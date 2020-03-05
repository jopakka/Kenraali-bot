const https = require('https');

module.exports = {
	name: "meme",
	desc: "Make your own memes!",
    execute(message, args) {
        const url = "https://api.imgflip.com/";
		if (args.length === 0) {
            let reply = "**All available templates:**\n";

            https.get(`${url}get_memes`, response => {
                let templates = "";

                response.on("data", stuff => templates += stuff);

                response.on("end", () => {
                    const json = JSON.parse(templates);
                    if (!json.success) return message.reply("Something went wrong");

                    reply += json.data.memes.map(x => x.name).join("\n");
                    return message.author.send(reply, { split: true })
                        .then(() => {
                            if (message.channel.type === 'dm') return;
                            message.reply('I\'ve sent you a DM with all available meme templates!');
                        })
                        .catch(error => {
                            console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                            message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                        });
                });
            }).on("error", error => console.log(error));
		}
	}
}