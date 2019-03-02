const strUcFirst = require('../../methods/strUcFirst');
const LgelAPI = require('../../services/lgel-api');

function getStatsFields(player) {
	const statsFields = [];
	const pointsPerGame = (player.points / player.playedGames).toFixed(2);

	statsFields.push({
		name: ':raising_hand: Joueur',
		value: `${player.username} (Niveau ${player.level}, ${player.gender == 'female' ? 'Femme' : 'Homme'}, ${player.isPremium ? 'Premium' : 'Non-premium'}), Compte créé le ${player.registered}`,
	});
	if (player.wedding.married) {
		statsFields.push({
			name: `:heart: Marié${player.gender == 'female' ? 'e' : ''} à **${player.wedding.partner}**`,
			value: `Depuis le ${player.wedding.date}`,
			inline: true,
		});
	}
	statsFields.push({
		name: ':trophy: Badges',
		value: `Ce joueur possède **${player.achievements.length}** badges.`,
		inline: true,
	});

	if (player.playedGames !== 0) {
		statsFields.push({
			name: ':game_die: Parties jouées',
			value : `**${player.playedGames}** parties jouées / **${player.points}** points (**${pointsPerGame}** points par partie)`,
			inline: true,
		},
		{
			name: ':joystick: Dernière partie',
			value: `(**${player.gamesHistory[0].state}**) Partie **${player.gamesHistory[0].type}** jouée le **${player.gamesHistory[0].date}**.`,
		});
	}
	else {
		statsFields.push({
			name: ':game_die: Partie jouée',
			value : 'Ce joueur n\'a joué **aucune** partie.',
			inline: true,
		});
	}
	for (const gamesStats of player.gamesStatistics) {
		if (gamesStats.playedGames !== 0) {
			const pourcentageGame = (gamesStats.playedGames / player.playedGames * 100).toFixed(2);
			statsFields.push({
				name: strUcFirst(gamesStats.type),
				value: `${gamesStats.playedGames} (${pourcentageGame}%)`,
				inline: true,
			});
		}
	}
	statsFields.push({
		name: ':crown: Titre',
		value: `"*${player.username}, ${player.title ? player.title : '...'}*"`,
	},
	{
		name: ':pen_ballpoint: Signature',
		value: `"*${player.signature ? player.signature : '...'}*"`,
	});
	return statsFields;
}

function formatRank(rank) {
	if (rank === 1) return '1er';
	else return rank + 'ème';
}

function getHamletFields(player) {
	const hamletFields = [
		{
			name: 'Nom',
			value: `[${player.hamlet.tag}] ${player.hamlet.name}`,
		},
		{
			name: ':busts_in_silhouette: Membres',
			value: `**${player.hamlet.membersCount}** personnes sont présentes dans ce hameau.`,
		},
		{
			name: ':gem: Points',
			value: `**${player.hamlet.points}** points ont été réalisés par les [${player.hamlet.tag}] ces 30 derniers jours.`,
		},
		{
			name: ':arrow_upper_right: Position actuelle',
			value: formatRank(player.hamlet.currentRank),
			inline: true,
		},
		{
			name: ':trophy: Meilleure position',
			value: formatRank(player.hamlet.bestRank),
			inline: true,
		},
	];
	return hamletFields;
}

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

			console.log(response.data);

			const player = response.data;
			msg.channel.send({
				embed: {
					title: `__Informations et statistiques de **${player.username}**__`,
					fields: getStatsFields(player),
				},
			});
			if (player.hamlet) {
				msg.channel.send({
					embed: {
						title: `__Hammeau de **${player.username}**__`,
						image: {
							url: 'https://www.loups-garous-en-ligne.com' + player.hamlet.picture,
						},
						fields: getHamletFields(player),
					},
				});
			}
		})
		.catch(error => {
			console.error(error);
			msg.channel.send(':x: A server error occured while requesting the player ' + username + ' on LGEL.');
		});
};