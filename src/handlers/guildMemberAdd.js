module.exports = (member, bot) => {
	const channel = member.guild.channels.find(ch => ch.name === 'log');
	if (!channel) return;
	channel.send(`Yop, ${member}`);
};