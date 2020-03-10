module.exports = {
    name: "ping",
    desc: "Just say ping",
    execute(message){
        message.channel.send("Pong!");
    }
}