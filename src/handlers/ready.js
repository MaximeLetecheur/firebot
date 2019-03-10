module.exports = (bot) => {
	console.log(`Logged in as ${bot.discordClient.user.tag}!`);
	bot.doTasks();
};