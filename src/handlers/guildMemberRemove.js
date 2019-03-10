module.exports = (member) => {
	const channel = member.guild.channels.find(ch => ch.name === 'log');
	if (!channel) return;
	channel.send(`Au revoir, ${member}`);
};