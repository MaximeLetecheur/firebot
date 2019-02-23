module.exports = (bot, msg) => {
	if (!msg.guild) return;

	const titles = bot.songQueue.queue.map(track => `Title: ${track.title}, Requested by : ${track.requestor}`);
	if (titles.length == 0) {
		msg.channel.send('There are no songs in the queue.');
	}
	else {
		msg.channel.send(titles.join('\n'));
	}
};