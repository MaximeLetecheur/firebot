exports.exec = (bot, msg) => {
	bot.db.Guild.findOne({
		where: { guild_id: msg.guild.id },
	})
		.then(guild => {
			console.log(guild);
			msg.channel.send('Prefix is set to ' + guild.prefix);
		});
};

exports.config = {
	enabled: true,
};