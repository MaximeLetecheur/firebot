const getAnimeInfos = require('./getAnimeInfos');
module.exports = (msg, anime) => {
	msg.channel.send({
		embed: {
			title: `:flag_gb: ${anime.attributes.titles.en_jp}\n:flag_jp: ${anime.attributes.titles.ja_jp}`,
			image: {
				url: `${anime.attributes.coverImage != null ? anime.attributes.coverImage.original : ''}`,
			},
			thumbnail: {
				url: `${anime.attributes.posterImage != null ? anime.attributes.posterImage.original : ''}`,
			},
			fields: getAnimeInfos(anime),
			description: `**Synopsis : **\n${anime.attributes.synopsis.split('[')[0].split('(Source')[0]}\n`,
		},
	});

}