exports.exec = (bot, msg) => {
	if (!msg.guild) return;

	if (!(msg.guild.id in bot.songQueues) || bot.songQueues[msg.guild.id].count() == 0) {
		msg.channel.send(':x: There is no songs in the queue.');
		return;
	}

	const titles = bot.songQueues[msg.guild.id].queue.map(track => `Title: ${track.title}, Requested by : ${track.requestor}`);
	msg.channel.send(titles.join('\n'));
};

exports.config = {
	enabled: true,
};