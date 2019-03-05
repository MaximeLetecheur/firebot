exports.exec = (bot, msg) => {
	if (!msg.guild) return;

	if (typeof msg.mentions === 'undefined' || typeof msg.mentions.users === 'undefined' || msg.mentions.users.array().length != 1) {
		msg.channel.send(':x: You must mention an other member.');
		return;
	}

	msg.channel.send(`${msg.author} (　-_･)σ︻デ═一 ${msg.mentions.users.first()}`);
};

exports.config = {
	enabled: true,
};