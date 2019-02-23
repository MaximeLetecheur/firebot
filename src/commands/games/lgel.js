const LgelAPI = require('../../services/lgel-api');

module.exports = (bot, msg, args) => {
	if (args.length != 1) {
		msg.channel.send(':x: Username of the player missing.');
		return;
	}

	const username = args[0];
	const lgel = new LgelAPI();
	lgel.findPlayer(username)
		.then(response => {
			if (response.data.error) {
				msg.channel.send(':x: The player ' + username + ' does not exist.');
				return;
			}
			const player = response.data;

			msg.channel.send({
				embed: {
					title: `Informations de ${player.username}`,
					fields: [
						{
							name: 'Player',
							value: player.username,
							inline: true,
						},
						{
							name: 'Premium ',
							value: player.isPremium ? 'Yes' : 'No',
							inline: true,
						},
						{
							name: 'Level',
							value: player.level,
							inline: true,
						},
						{
							name: 'Played Games',
							value : `${player.playedGames} played games (${player.points} points)`,
							inline: true,
						},
						{
							name: 'Title',
							value: player.title ? player.title : '...',
						},
						{
							name: 'Signature',
							value: player.signature ? player.signature : '...',
						},
						{
							name: 'Creation Date',
							value: player.registered,
							inline: true,
						},
						{
							name: 'Gender',
							value: player.gender == 'female' ? 'F' : 'M',
							inline: true,
						},
					],
				},
			});

			if (player.hamlet) {
				msg.channel.send({
					embed: {
						title: `Hamlet of ${player.username}`,
						url: 'https://www.loups-garous-en-ligne.com/hameau?tag=' + player.hamlet.tag,
						image: {
							url: 'https://www.loups-garous-en-ligne.com/' + player.hamlet.picture,
						},
						fields: [
							{
								name: 'Name',
								value: `[${player.hamlet.tag}] ${player.hamlet.name}`,
							},
							{
								name: 'Members',
								value: `${player.hamlet.membersCount}/100`,
							},
							{
								name: 'Current rank',
								value: player.hamlet.currentRank,
							},
						],
					},
				});
			}
		})
		.catch(error => {
			console.error(error);
			msg.channel.send(':x: An error occured while requesting this player on LGEL.');
		});
};