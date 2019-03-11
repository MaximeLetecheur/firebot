const config = require('../config');

module.exports = async (msg, bot) => {
	const msgContent = msg.content.trim();
	const args = msgContent.split(' ');

	// Log the message
	const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
	const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
	console.log(`${guildTag}${channelTag} ${msg.author.tag}: ${msgContent}`);

	// Ignore all bots
	if (msg.author.bot) return;

	// Ignore all messages without command prefix
	const guild = await bot.db.Guild.findOne({ where: { guild_id: msg.guild.id } });
	const prefix = guild ? guild.prefix : config.prefix;
	if (!msgContent.startsWith(prefix)) return;

	// Ignore non-command message
	const cmd = args.shift().substr(prefix.length);
	if (!(cmd in bot.actions)) return;

	// Ignore disabled commands
	if (!bot.actions[cmd].config.enabled) {
		msg.channel.send(`:x: The command ${cmd} is disabled.`);
		return;
	}

	// Execute the command
	try {
		bot.actions[cmd].exec(bot, msg, args);
	}
	catch (error) {
		console.error(`An error has occured when using the command ${cmd}`);
		console.error(`Command from the user: ${msgContent}`);
		console.error(error.stack);
		msg.channel.send(`:warning: A critical error has occured when using the command **${cmd}**.`);
	}
};