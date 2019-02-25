module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	if (!(msg.guild.id in bot.voiceConnections) || !(msg.guild.id in bot.jukebox)) {
		msg.channel.send(':x: I am not connected to any channel on this server.');
		return;
	}

	let volume = args[0];
	if (isNaN(volume)) {
		msg.channel.send(':x: The volume must be a valid number between 0 and 100.');
		return;
	}

	if (typeof volume === 'undefined') {
		msg.channel.send(':speaker: The volume is set to ' + bot.jukebox[msg.guild.id].volume * 100);
		return;
	}

	volume = Math.max(0, Math.min(100, volume));

	bot.jukebox[msg.guild.id].setVolume(volume, msg);
	msg.channel.send(':speaker: Volume has been set to ' + volume);
};