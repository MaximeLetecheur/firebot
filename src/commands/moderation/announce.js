const RichEmbed = require('discord.js').RichEmbed;

module.exports = (bot, msg, args) => {
    if (args.length == 0) {
        msg.channel.send(":x: Announcement missing.");
        return;
    }

    const content = msg.content;
    const announce = content.substring( content.indexOf(" ") + 1, content.length );

    const embed = new RichEmbed();
    embed.setTitle("Announcement from " + msg.author.username)
        .setDescription(announce)
        .setTimestamp()
    msg.channel.send(embed);
    
    if (msg.deletable) {
        msg.delete();
    }
};