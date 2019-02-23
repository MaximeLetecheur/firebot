const Bot = require('./bot');

const bot = new Bot();
bot.connect()
	.catch(console.error);