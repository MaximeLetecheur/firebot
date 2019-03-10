module.exports = (err) => {
	console.error('Bot has been disconnected from discord');
	console.error(err);
	// this.discordClient.destroy();
};