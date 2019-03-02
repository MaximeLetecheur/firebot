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
			const pointsPerGame = (player.points / player.playedGames).toFixed(2);

			msg.channel.send({
				embed: {
					title: `__Informations et statistiques de **${player.username}**__`,
					fields: [
						{
							name: 'Joueur',
							value: `${player.username} (Niveau ${player.level}, ${player.gender == 'female' ? 'Femme' : 'Homme'}, ${player.isPremium ? 'Premium' : 'Non-premium'})`,
						},
						{
							name: 'Date de création',
							value: player.registered,
						},
						{
							name: 'Parties jouées',
							value : `**${player.playedGames}** parties jouées / **${player.points}** points (**${pointsPerGame}** points par partie)`,
							inline: true,
						},
						{
							name: 'Titre',
							value: `"*${player.username}, ${player.title ? player.title : '...'}*"`,
						},
						{
							name: 'Signature',
							value: `"*${player.signature ? player.signature : '...'}*"`,
						},
					],
				},
			});

			function formatRank(rank) {
				if (rank == 1) return '1er';
				else return rank + 'ème';
			}

			if (player.hamlet) {
				msg.channel.send({
					embed: {
						title: `__Hammeau de **${player.username}**__`,
						url: 'https://www.loups-garous-en-ligne.com/hameau?tag=' + player.hamlet.tag,
						image: {
							url: 'https://www.loups-garous-en-ligne.com' + player.hamlet.picture,
						},
						fields: [
							{
								name: 'Nom',
								value: `[${player.hamlet.tag}] ${player.hamlet.name}`,
							},
							{
								name: 'Membres',
								value: `**${player.hamlet.membersCount}** personnes sont présents dans ce hameau.`,
							},
							{
								name: 'Points',
								value: `**${player.hamlet.points}** points ont été réalisés par les [${player.hamlet.tag}] ces 30 derniers jours.`,
							},
							{
								name: 'Position actuelle',
								value: formatRank(player.hamlet.currentRank),
								inline: true,
							},
							{
								name: 'Meilleure position',
								value: formatRank(player.hamlet.bestRank),
								inline: true,
							},
						],
					},
				});
			}
		})
		.catch(error => {
			console.error(error);
			msg.channel.send(':x: A server error occured while requesting the player ' + username + ' on LGEL.');
		});
};