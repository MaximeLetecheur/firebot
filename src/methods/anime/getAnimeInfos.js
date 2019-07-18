const refactorDate = require('../refactorDate');
const refactorDateWithTime = require('../refactorDateWithTime');
const strUcFirst = require('../strUcFirst');
module.exports = (anime) => {
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
		inline: true,
	});

	infosFields.push({
		name: 'Content Rating :underage:',
		value: `${anime.attributes.ageRatingGuide}`,
		inline: true,
	});

	return infosFields;
}