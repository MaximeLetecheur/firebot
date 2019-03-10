const config = require('../config');

module.exports = (msg, bot) => {
	// Log the message
	const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
	const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
	console.log(`${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);

	// Ignore all bots
	if (msg.author.bot) return;

	const msgContent = msg.content.trim();
	if (msgContent.startsWith(config.prefix)) {
		const args = msgContent.split(' ');
		const cmd = args.shift().substr(config.prefix.length);
		if (cmd in bot.actions) {
			if (bot.actions[cmd].config.enabled) {
				try {
					bot.actions[cmd].exec(bot, msg, args);
				}
				catch (error) {
					console.error('An error has occured when using the command ' + cmd);
					console.error('Command from the user: ' + msgContent);
					console.error(error.stack);
					msg.channel.send(':warning: A critical error has occured when using the command **' + cmd + '**.');
				}
			}
			else {
				msg.channel.send(':x: The command ' + cmd + ' is disabled in this guild.');
			}
		}
	}
};