module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	if (!msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
		msg.channel.send('Sorry, you don\'t have the permission to execute the command ' + msg.content);
		console.log('Sorry, you don\'t have the permission to execute the command ' + msg.content);
		return;
	}
	else if (!msg.channel.permissionsFor(bot.discordClient.user).has('MANAGE_MESSAGES')) {
		msg.channel.send('Sorry, I don\'t have the permission to execute the command ' + msg.content);
		console.log('Sorry, I don\'t have the permission to execute the command ' + msg.content);
		return;
	}

	const parts = msg.content.split(' ');
	if (parts.length > 2) {
		msg.channel.send('Number of arguments incorrect.');
		console.log('Number of arguments incorrect.');
		return;
	}

	const limit = parts.length == 2 ? parseInt(msg.content.split(' ')[1]) : 100;
	if (isNaN(limit)) {
		msg.channel.send('The argument is not a number.');
		console.log('The argument is not a number.');
		return;
	}

	msg.channel.fetchMessages({ limit: limit })
		.then(msgs => {
			msg.channel.bulkDelete(msgs);
			const nbMsgsDeleted = msgs.array().length;

			// Logging the number of msgs deleted on both the channel and console.
			msg.channel.send('Total messages deleted: ' + nbMsgsDeleted);
			console.log('Total messages deleted: ' + nbMsgsDeleted);
		})
		.catch(err => {
			console.error('Error while doing Purge');
			console.error(err);
		});
};