module.exports = (bot, msg) => {
	if (!msg.guild) return;

	if (msg.guild.id in bot.voiceConnections) {
		msg.channel.send(':x: I am already connected to a channel.');
		return;
	}

	if (msg.member.voiceChannel) {
		msg.member.voiceChannel.join()
			.then(voiceConnection => {
				bot.voiceConnections[msg.guild.id] = voiceConnection;
				msg.channel.send(':white_check_mark: I can play music!');
			})
			.catch(console.error);
	}
	else {
		msg.channel.send(':x: You need to join a voice channel first!');
	}
};