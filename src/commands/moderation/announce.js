const config = require('../../config');

exports.exec = (bot, msg, args) => {
	if (args.length == 0) {
		msg.channel.send(':x: Announcement missing.');
		return;
	}

	/**
	 * The user can't send announcement if :
	 * - He doesn't have any roles in this guild;
	 * - He doesn't have the role "maire" or "adjoint";
	 * - He is not the bot owner.
	 */
	if (!(
		typeof msg.author.roles === 'undefined' ||
		(
			!(config.roles.adjoint in msg.author.roles) &&
			!(config.roles.maire in msg.author.roles)
		) ||
		msg.author.id !== config.userid.bot_owner
	)) {
		msg.channel.send(':x: You do not have the permission to do a announcement.');
		return;
	}

	const content = msg.content;
	const announce = content.substring(content.indexOf(' ') + 1, content.length);

	msg.channel.send({
		embed: {
			title: `Announcement from ${msg.author.username}`,
			description: announce,
			timestamp: new Date(),
		},
	}).then(postedMessage => {
		postedMessage.react('👀');
	});

	if (msg.deletable && !msg.deleted) {
		msg.delete();
	}
};

exports.config = {
	enabled: true,
};