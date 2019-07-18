const KitsuAPI = require('../../services/kitsu-api');
const showListOfAnime = require('../../methods/anime/showAnimeList');

exports.exec = (bot, msg, args) => {
	const Kitsu = new KitsuAPI();
	Kitsu.findByAnimeName(args.join(' '))
		.then(response => {
			if(response.status == 200) {
				if(response.data.data.length > 0) {
					showListOfAnime(msg, response.data.data);
				}
				else {
					msg.channel.send('**No results found. Maybe retry with another name...**');
				}
			}
			else {
				msg.channel.send('**Error while retrieving anime information');
				console.error(response);
			}
		}
		);
};

exports.config = {
	enabled: true,
};