const KitsuAPI = require('../../services/kitsu-api');
const showListOfAnime = require('../../methods/anime/showAnimeList');

exports.exec = (bot, msg, args) => {
	const Kitsu = new KitsuAPI();
	Kitsu.findAnimeTrending()
		.then(response => {
			if(response.status == 200) {
                showListOfAnime(msg, response.data.data);
			}
			else {
				msg.channel.send('**Error while retrieving anime trending information');
				console.error(response);
			}
		}
		);
};

exports.config = {
	enabled: true,
};