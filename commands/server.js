module.exports = {
	name: "server",
	desc: "Get server info",
	guildOnly: true,
	execute(message) {
		const info = [`Server name: ${message.guild.name}`,
			`Members: ${message.guild.memberCount}`
		];

		message.channel.send(info);
	}
}