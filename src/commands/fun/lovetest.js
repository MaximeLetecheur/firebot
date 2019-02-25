module.exports = (bot, msg) => {
	if (!msg.guild) return;

	if (typeof msg.mentions === 'undefined' || typeof msg.mentions.users === 'undefined' || msg.mentions.users.array().length != 1) {
		msg.channel.send(':x: You must mention an other member.');
		return;
	}

	const idUser1 = parseInt(msg.author.id, 10);
	const idUser2 = parseInt(msg.mentions.users.first().id, 10);

	let lovePourcent;
	if (idUser1 == idUser2) {
		lovePourcent = 101;
	}
	else {
		const idUserSum = Array.from((idUser1 + idUser2).toString());
		lovePourcent = idUserSum.slice(0, 2).join('');
	}

	if (lovePourcent >= 101) {
		msg.channel.send(':heart_eyes: :kissing_heart:  You love yourself better than anyone else! :smirk:');
	}
	else if (lovePourcent > 90) {
		msg.channel.send(':sparkling_heart: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 80) {
		msg.channel.send(':heart: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 70) {
		msg.channel.send(':smirk: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 60) {
		msg.channel.send(':smile: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 50) {
		msg.channel.send(':slight_smile: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 40) {
		msg.channel.send(':shrug: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 30) {
		msg.channel.send(':slight_frown: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 20) {
		msg.channel.send(':frowning2: ' + lovePourcent + '%');
	}
	else if (lovePourcent > 10) {
		msg.channel.send(':poop: ' + lovePourcent + '%');
	}
	else {
		msg.channel.send(':skull_crossbones: ' + lovePourcent + '%');
	}
};