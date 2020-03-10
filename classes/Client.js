const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
	constructor() {
		super();
		this.commands = new Collection();
		this.games = new Collection();
		this.secrets = new Collection();
	}

	isVoiceChannel() {
		console.log("moro")
	}
};