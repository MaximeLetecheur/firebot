module.exports = (bot, msg, args) => {
    if (args.length == 0) {
        msg.channel.send(":x: Announcement missing.");
        return;
    }

    const content = msg.content;
    const announce = content.substring( content.indexOf(" ") + 1, content.length );

    msg.channel.send({
        embed: {
            title: `Announcement from ${msg.author.username}`,
            description: announce,
            timestamp: new Date()
        }
    });
    
    if (msg.deletable && !msg.deleted) {
        msg.delete();
    }
};