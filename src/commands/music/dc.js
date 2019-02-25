module.exports = (bot, msg) => {
	if (!msg.guild) return;

	if (!(msg.guild.id in bot.voiceConnections)) {
		msg.channel.send(':x: I am not connected to any channel on this server.');
		return;
	}

	const connection = bot.voiceConnections[msg.guild.id];
	msg.channel.send(`:mute: Disconnecting from channel: ${connection.channel.name}`);
	connection.disconnect();
	delete bot.voiceConnections[msg.guild.id];
	if (msg.guild.id in bot.songQueues) {
		delete bot.songQueues[msg.guild.id];
	}
	if (msg.guild.id in bot.jukebox) {
		delete bot.jukebox[msg.guild.id];
	}
};