exports.exec = (bot, msg) => {
    let user = msg.author;
    if (msg.mentions && msg.mentions.users && msg.mentions.users.array().length > 0) {
        user = msg.mentions.users.first();
    }

    msg.channel.send(user.displayAvatarURL);
};

exports.config = {
	enabled: true,
};