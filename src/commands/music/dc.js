module.exports = (bot, msg) => {
	if (!msg.guild) return;

	bot.discordClient.voiceConnections.every(connection => {
		connection.disconnect();
		msg.channel.send(`:mute: Disconnecting from channel: ${connection.channel.name}`);
	});
};