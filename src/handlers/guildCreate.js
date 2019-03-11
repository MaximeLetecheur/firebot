module.exports = (guild, bot) => {
	bot.db.Guild.findOrCreate({
		where: {
			guild_id: guild.id,
		},
	}).spread((guildRow, created) => {
		console.log(created);
		console.log(guildRow);
	});
};