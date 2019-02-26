module.exports = (bot, msg) => {
	const guild = msg.guild;

	msg.channel.send({
		embed: {
			title: 'Server Info',
			fields: [
				{
					name: 'Name',
					value: guild.name,
					inline: true,
				},
				{
					name: 'Users',
					value: guild.members.filter(member => !member.user.bot).size,
					inline: true,
				},
				{
					name: 'Bot',
					value: guild.members.filter(member => member.user.bot).size,
					inline: true,
				},
				{
					name: 'Text Channels',
					value: guild.channels.filter(channel => channel.type === 'text').size,
					inline: true,
				},
				{
					name: 'Voice Channels',
					value: guild.channels.filter(channel => channel.type === 'voice').size,
					inline: true,
				},

				{
					name: 'Server Region',
					value: guild.region,
					inline: true,
				},
				{
					name: 'Created At',
					value: guild.createdAt.toUTCString(),
					inline: true,
				},
				{
					name: 'Owner ID',
					value: guild.ownerID,
					inline: true,
				},
			],
			image: {
				url: guild.splash ? guild.splash : null,
			},
		},
	});
};