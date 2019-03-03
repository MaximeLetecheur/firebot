const avrArray = require('../../methods/avrArray');

exports.exec = async function(bot, msg) {
	const pongMessage = await msg.channel.send('Pinging...');

	const fields = [{
		name: 'Response time',
		value: parseInt(pongMessage.createdTimestamp) - parseInt(msg.createdTimestamp) + ' ms',
		inline: true,
	}];
	if (msg.guild.id in bot.voiceConnections) {
		fields.push({
			name: 'WebSocket ping',
			value: avrArray(bot.voiceConnections[msg.guild.id].sockets.ws.client.pings) + ' ms',
			inline: true,
		});
	}

	msg.channel.send({
		embed: {
			title: '__Ping result__',
			fields: fields,
			timestamp: new Date(),
		},
	});

	if (pongMessage.deletable && !pongMessage.deleted) {
		pongMessage.delete();
	}
};

exports.config = {
	enabled: true,
};