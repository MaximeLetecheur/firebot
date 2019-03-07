exports.exec = (bot, msg) => {
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
		return msg.channel.send(':heart_eyes: :kissing_heart:  You love yourself better than anyone else ${msg.author} ! :smirk:');
	}

	let emoji = '';
	if (lovePourcent > 90) {
		emoji = ':sparkling_heart:';
	}
	else if (lovePourcent > 80) {
		emoji = ':heart:';
	}
	else if (lovePourcent > 70) {
		emoji = ':smirk:';
	}
	else if (lovePourcent > 60) {
		emoji = ':smile:';
	}
	else if (lovePourcent > 50) {
		emoji = ':slight_smile:';
	}
	else if (lovePourcent > 40) {
		emoji = ':shrug:';
	}
	else if (lovePourcent > 30) {
		emoji = ':slight_frown:';
	}
	else if (lovePourcent > 20) {
		emoji = ':frowning2:';
	}
	else if (lovePourcent > 10) {
		emoji = ':poop:';
	}
	else {
		emoji = ':skull_crossbones:';
	}

	msg.channel.send(`${msg.author} ${emoji} ${msg.mentions.users.first()} : Around ${lovePourcent}% !`);
};

exports.config = {
	enabled: true,
};