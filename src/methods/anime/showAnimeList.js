const getAnimesListInfos = require('./getAnimesInfos');
const numberInEmojiUnicodeUntilTen = require('../numberInUnicodeEmojiUntilTen');
const sendAnimeInfos = require('./sendAnimeInfos');
module.exports = (msg, animesList) => {
	msg.channel.send({
		embed: {
			title: 'List of animes corresponding to the research',
			fields: getAnimesListInfos(animesList),
		},
	}).then(async postedMessage => {
		try {
			for(let i = 0; i < animesList.length; i++) {
				await postedMessage.react(numberInEmojiUnicodeUntilTen(i + 1));
			}

			const filter = (reaction, user) => {
				const emojiAccepted = [];
				for(let i = 0; i < animesList.length; i++) {
					emojiAccepted.push(numberInEmojiUnicodeUntilTen(i + 1));
				}
				return emojiAccepted.includes(reaction.emoji.name) && user.id === msg.author.id;
            };
			postedMessage.awaitReactions(filter, { max: 1, time: 15000, errors:['time'] })
				.then(collected => {
					const reaction = collected.first();
                    console.log(reaction.emoji.name);
					switch(reaction.emoji.name) {
					case numberInEmojiUnicodeUntilTen(1) :
						sendAnimeInfos(msg, animesList[0]);
						break;
					case numberInEmojiUnicodeUntilTen(2) :
						sendAnimeInfos(msg, animesList[1]);
						break;
					case numberInEmojiUnicodeUntilTen(3) :
						sendAnimeInfos(msg, animesList[2]);
						break;
					case numberInEmojiUnicodeUntilTen(4) :
						sendAnimeInfos(msg, animesList[3]);
						break;
					case numberInEmojiUnicodeUntilTen(5) :
						sendAnimeInfos(msg, animesList[4]);
						break;
					case numberInEmojiUnicodeUntilTen(6) :
						sendAnimeInfos(msg, animesList[5]);
						break;
					case numberInEmojiUnicodeUntilTen(7) :
						sendAnimeInfos(msg, animesList[6]);
						break;
					case numberInEmojiUnicodeUntilTen(8) :
						sendAnimeInfos(msg, animesList[7]);
						break;
					case numberInEmojiUnicodeUntilTen(9) :
						sendAnimeInfos(msg, animesList[8]);
						break;
					case numberInEmojiUnicodeUntilTen(10) :
						sendAnimeInfos(msg, animesList[9]);
						break;
					default : msg.reply('unknown reaction');
					}
				}).catch(collected => {
					console.error(collected);
					msg.reply('You didn\'t react with an allowed reaction in time. Please retry the command and react in time by following instructions.');
				});
		}
		catch (error) {
			console.error('One of the emojis failed to react.');
		}
	});

}