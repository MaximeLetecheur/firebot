let cycle = 0;

exports.exec = function(bot) {
	let content = '';
	switch (cycle) {
	case 0:
		content = bot.discordClient.guilds.array().length + ' servers online!';
		break;
	case 1:
		content = bot.discordClient.users.array().length + ' users online!';
		break;
	case 2:
		const uptime = bot.discordClient.uptime;
		let m = Math.floor((uptime / 1000 / 60) % 60);
		m = m < 10 ? '0' + m : m;
		let h = Math.floor((uptime / 1000 / 60 / 60) % 60);
		h = h < 10 ? '0' + h : h;
		const j = Math.floor((uptime / 1000 / 60 / 60 / 60) % 24);
		content = j + 'J ' + h + 'h' + m + ' of uptime!';
	}
	bot.discordClient.user.setActivity(content);
	if (cycle++ == 2) {
		cycle = 0;
	}
};

exports.config = {
	enabled: true,
	time: 4500,
};