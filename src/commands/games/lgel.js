const RichEmbed = require('discord.js').RichEmbed;
const LgelAPI = require('../../services/lgel-api');

module.exports = (bot, msg, args) => {
	if (args.length != 1) {
		msg.channel.send(":x: Username of the player missing.");
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

			const playerEmbed = new RichEmbed()
				.setTitle(`Informations de ${player.username}`)
				.setDescription(`
					Joueur: ${player.username}
					Niveau: ${player.level}
					MDJ: Niveau ${player.mdj.level} (${player.mdj.totalpoints} points)
					Titre: ${player.title}
					Sexe: ${player.gender == 'female' ? 'F' : 'M'}
					Signature: ${player.signature}
					Date d'enregistrement: ${player.registered}
					${player.playedGames} parties jouées (${player.points} points)
					Premium : ${player.isPremium ? 'Oui' : 'Non'}
				`);
			msg.channel.send(playerEmbed);

			if (player.hamlet) {
				const hamletEmbed = new RichEmbed()
					.setTitle(`Hameau de ${player.username}`)
					.setURL('https://www.loups-garous-en-ligne.com/hameau?tag=' + player.hamlet.tag)
					.setImage('https://www.loups-garous-en-ligne.com/' + player.hamlet.picture)
					.setDescription(`
						Nom du hameau : [${player.hamlet.tag}] ${player.hamlet.name}
						Nombre de membre : ${player.hamlet.membersCount}/100
						Position du hameau : ${player.hamlet.currentRank}
					`);
				msg.channel.send(hamletEmbed);
			}
		})
		.catch(error => {
			console.error(error);
			msg.channel.send(':x: An error occured while requesting this player on LGEL.');
		});
};