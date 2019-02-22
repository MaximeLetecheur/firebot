const RichEmbed = require('discord.js').RichEmbed;
const LgelAPI = require('../services/lgel-api');

module.exports = (bot, msg) => {
	const lgel = new LgelAPI();
	lgel.findPlayer('Lampyre')
		.then(response => {
			if (response.data.error) {
				msg.channel.send('Ce joueur n\'existe pas!');
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
			msg.channel.send('Erreur lors de la récupération des informations de ce joueur.');
		});
};