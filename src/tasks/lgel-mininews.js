const LgelAPI = require('../services/lgel-api');
const TurndownService = require('turndown');

exports.default = function() {
	new LgelAPI().getMiniNews().then(response => {
		console.log('Fetched Lgel MiniNews');
		const mininews = response.data[0];

		this.db.Lgelnews.findOne({
			where: { id: mininews.id },
		}).then(n => {
			if(!n) {
				this.db.Lgelnews.create({
					id: mininews.id,
					content: mininews.contenu,
				});

				this.discordClient.guilds.forEach(guild => {
					if (guild.available) {
						const channel = guild.channels.find(c => c.name === 'lgel-mininews');
						if (channel) {
							const turndownService = new TurndownService();
							const content = turndownService.turndown(mininews.contenu);

							channel.send({
								embed: {
									title: 'Loups-Garous-En-Ligne : Mini-news !',
									description: content,
								},
								timestamp: new Date(),
							});
						}
					}
				});
			}
		});
	});
};