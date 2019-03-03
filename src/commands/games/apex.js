const ApexLegendsAPI = require('../../services/apexlegends-api');

exports.exec = (bot, msg, args) => {
	if (args.length != 2) {
		msg.channel.send(':x: Username of the player and/or platform missing.');
		return;
	}

	const platform = args[0];
	const username = args[1];
	const ApexLegends = new ApexLegendsAPI();
	ApexLegends.findPlayerByUsername(platform, username)
		.then(response => {
			if (response.data.totalresults !== 1) {
				msg.channel.send(':x: The player ' + username + ' does not exist.');
				return;
			}

			ApexLegends.findPlayerById(response.data.results[0].aid)
				.then(responsePlayer => {
					const player = responsePlayer.data;
					if (!player.playerfound) {
						msg.channel.send(':x: ' + player.error);
						return;
					}

					msg.channel.send({
						embed: {
							title: `__Statistics of **${player.name}**__`,
							thumbnail: {
								url: player.avatar,
							},
							fields: [
								{
									name: 'Player',
									value: `**${player.name}** (Level **${player.level}**) on platform **${player.platform}**`,
								},
								{
									name: 'Ratio',
									value: player.skillratio.toFixed(2),
									inline: true,
								},
								{
									name: 'Kills',
									value: player.kills,
									inline: true,
								},
								{
									name: 'Favorite legend',
									value: player.legend,
									inline: true,
								},
								{
									name: 'Get more stats',
									value: `by [clicking here](https://apextab.com/${player.aid})`,
									inline: true,
								},
							],
						},
					});
				})
				.catch(error => {
					console.error(error);
					msg.channel.send(':x: A server error occured while requesting the player ' + username + ' on Apex Legends Tracker.');
				});
		})
		.catch(error => {
			console.error(error);
			msg.channel.send(':x: A server error occured while requesting the player ' + username + ' on Apex Legends Tracker.');
		});
};

exports.config = {
	enabled: true,
};