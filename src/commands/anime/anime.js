const KitsuAPI = require('../../services/kitsu-api');
const refactorDate = require('../../methods/refactorDate');
const refactorDateWithTime = require('../../methods/refactorDateWithTime');
const strUcFirst = require('../../methods/strUcFirst');
function getAnimeInfos(anime) {
	const infosFields = [];

	infosFields.push({
		name: 'Start Date :calendar_spiral:',
		value: anime.attributes.startDate != null ? refactorDate(anime.attributes.startDate) : 'Unknown',
		inline: anime.attributes.endDate != null,
	});

	if(anime.attributes.endDate != null) {
		infosFields.push({
			name: 'End Date :calendar_spiral:',
			value: refactorDate(anime.attributes.endDate),
			inline: true,
		});
	}

	infosFields.push({
		name: 'Status :white_check_mark:',
		value: strUcFirst(anime.attributes.status),
		inline: (anime.attributes.nextRelease != null || anime.attributes.episodeCount != null),
	});

	if(anime.attributes.status === 'current' && anime.attributes.nextRelease != null) {
		infosFields.push({
			name: 'Next episode :date:',
			value: refactorDateWithTime(anime.attributes.nextRelease),
			inline: true,
		});
	}

	if(anime.attributes.episodeCount != null) {
		infosFields.push({
			name: 'Episode Count',
			value: anime.attributes.episodeCount,
			inline: true,
		});
	}

	if(anime.attributes.youtubeVideoId != null) {
		infosFields.push({
			name: 'Youtube video :arrow_forward:',
			value: `[Click here](https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId})`,
		});
	}

	infosFields.push({
		name: 'Rating :star:',
		value: `${anime.attributes.averageRating}/100`,
	});

	return infosFields;
}

exports.exec = (bot, msg, args) => {
	const Kitsu = new KitsuAPI();
	Kitsu.findByAnimeName(args.join(' '))
		.then(response => {
			if(response.status == 200) {
				if(response.data.data.length > 0) {
					const anime = response.data.data[0];
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
							description: `**Synopsis : **\n\n${anime.attributes.synopsis.split('[')[0].split('(Source')[0]}`,
						},
					});
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