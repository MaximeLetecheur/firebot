module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	if (!(msg.guild.id in bot.voiceConnections)) {
		msg.channel.send(':x: I am not connected to any channel on this server.');
		return;
	}

	const volume = args[0];
	bot.jukebox[msg.guild.id].setVolume(volume, msg);
	msg.channel.send(':speaker: Volume has been set to ' + volume);
};