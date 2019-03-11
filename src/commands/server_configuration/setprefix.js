exports.exec = (bot, msg, args) => {
	if (args.length != 1) {
		msg.channel.send(':x: Incorrect format of prefix.');
		return;
	}

	const newPrefix = args[0];

	bot.db.Guild.update({
		prefix: newPrefix,
	}, {
		where: { guild_id: msg.guild.id },
	})
		.then(() => {
			msg.channel.send('Prefix has been set to ' + newPrefix);
		});
};

exports.config = {
	enabled: true,
};