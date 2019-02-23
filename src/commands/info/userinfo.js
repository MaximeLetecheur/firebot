module.exports = (bot, msg, args) => {
    if (args.length > 1) {
        msg.channel.send(":x: Wrong use of this command.");
        return;
    }

    const user = (args.length == 0) ? msg.author : msg.mentions.users.first();

    console.log(user);

    let fields = [];
    fields.push({
        name: 'Name',
        value: user.tag,
        inline: true
    });
    if (user.nickname) {
        fields.push({
            name: 'Nickname',
            value: user.nickname,
            inline: true
        });
    }

    msg.channel.send({
        embed: {
            title: 'User Info',
            fields: fields
        }
    })
};