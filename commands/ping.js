module.exports = {
    name: "ping",
    desc: "Just say ping",
    execute(message, args){
        message.channel.send("Pong!");
    }
}