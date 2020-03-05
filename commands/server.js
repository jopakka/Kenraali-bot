module.exports = {
	name: "server",
	desc: "Get server info. Works only on servers.",
	guildOnly: true,
	execute(message, args) {
		const info = [`Serverin nimi on ${message.guild.name}`,
			`Jäseniä: ${message.guild.memberCount}`
		];

		message.channel.send(info);
	}
}