module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	if (msg.member.voiceChannel) {
		msg.member.voiceChannel.join()
			.then(voiceConnection => {
				bot.voiceConnection = voiceConnection;
				msg.reply('I have successfully connected to the channel!');
			})
			.catch(console.log);
	}
	else {
		msg.reply('You need to join a voice channel first!');
	}
};