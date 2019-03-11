module.exports = (guild, bot) => {
	bot.db.Guild.destroy({
		where: {
			guild_id: guild.id,
		},
	});
};