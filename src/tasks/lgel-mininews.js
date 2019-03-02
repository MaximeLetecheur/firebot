const LgelAPI = require('../services/lgel-api');
const TurndownService = require('turndown');

exports.exec = function(bot) {
	new LgelAPI().getMiniNews().then(response => {
		const mininews = response.data[0];

		bot.db.Lgelnews.findOne({
			where: { id: mininews.id },
		}).then(mininewsRecord => {
			if(mininewsRecord) return;

			bot.db.Lgelnews.create({
				id: mininews.id,
				content: mininews.contenu,
			});

			bot.discordClient.guilds.forEach(guild => {
				if (!guild.available) return;

				const channel = guild.channels.find(c => c.name === 'lgel-mininews');
				if (!channel) return;

				channel.send({
					embed: {
						title: 'Loups-Garous-En-Ligne : Mini-news !',
						description: new TurndownService().turndown(mininews.contenu),
					},
					timestamp: new Date(),
				});
			});
		});
	});
};

exports.config = {
	enabled: true,
	time: 15000,
};