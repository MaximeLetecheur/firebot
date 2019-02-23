module.exports = (bot, msg) => {
	if (!msg.guild) return;

	if (! (msg.guild.id in bot.songQueues)) {
		msg.channel.send(':x: I am not playng any song right now.');
		return;
	}

	const track = bot.songQueues[msg.guild.id].first();
	if (track && track.dispatcher) {
		track.dispatcher.end();
		msg.channel.send(':rewind: Skipping...');

		if (bot.songQueues[msg.guild.id].count()	== 0) {
			delete bot.songQueues[msg.guild.id];
		}
	}
};