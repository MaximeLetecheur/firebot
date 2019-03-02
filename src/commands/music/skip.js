exports.exec = (bot, msg) => {
	if (!msg.guild) return;

	if (!(msg.guild.id in bot.songQueues) || bot.songQueues[msg.guild.id].count() == 0) {
		msg.channel.send(':x: There is no songs in the queue.');
		return;
	}

	const track = bot.songQueues[msg.guild.id].first();
	if (track && track.dispatcher) {
		track.dispatcher.end();
		msg.channel.send(':rewind: Skipping...');

		if (bot.songQueues[msg.guild.id].count() == 0) {
			delete bot.songQueues[msg.guild.id];
		}
	}
};

exports.config = {
	enabled: true,
};