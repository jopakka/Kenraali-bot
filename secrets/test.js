module.exports = {
    name: "test",
    desc: "just test",
    async execute(message/*, args*/) {
        if (message.author.id !== "352478941891788800") return;

        console.log(message.client.voice.connections)
    }
};