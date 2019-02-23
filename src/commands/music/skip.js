module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	const track = bot.songQueue.first();
	if (track && track.dispatcher) {
		track.dispatcher.end();
		msg.channel.send(':rewind: Skipping...');
	}
};