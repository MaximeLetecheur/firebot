exports.exec = (bot, msg, args) => {
	if (!msg.guild) return;

	if (args.length > 1) {
		msg.channel.send(':x: Number of arguments incorrect.');
		return;
	}

	const limit = args.length == 1 ? parseInt(args[0]) : 100;
	if (isNaN(limit)) {
		msg.channel.send(':x: The argument is not a number.');
		return;
	}

	if (!msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
		msg.channel.send('Sorry, you don\'t have the permission to execute the command ' + msg.content);
		return;
	}
	else if (!msg.channel.permissionsFor(bot.discordClient.user).has('MANAGE_MESSAGES')) {
		msg.channel.send('Sorry, I don\'t have the permission to execute the command ' + msg.content);
		return;
	}

	msg.channel.fetchMessages({ limit: limit })
		.then(msgs => {
			msg.channel.bulkDelete(msgs);
			const nbMsgsDeleted = msgs.array().length;

			// Logging the number of msgs deleted on both the channel and console.
			msg.channel.send('Total messages deleted: ' + nbMsgsDeleted);
		})
		.catch(err => {
			console.error('Error while doing Purge');
			console.error(err);
		});
};

exports.config = {
	enabled: true,
};