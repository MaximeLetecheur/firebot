const OnePieceCoverAPI = require('../../services/onepiececover-api');

function buildTheoriesList(theories) {
	let theoriesListString = '';

	for(let i = 0; i < theories.length; i++) {
		theoriesListString += `- ${theories[i]}\n`;
	}

	return theoriesListString;
}

function setFieldsInfos(chapterInfos) {
	const infosFields = [];

	infosFields.push({
		name: ':thinking:Theories:',
		value: `${buildTheoriesList(chapterInfos.theories)}`,
	});

	return infosFields;
}

function showOnePieceChapterInfo(msg, chapterInfos) {
	let coverUrl = '';
	let wallpaper = '';
	if (chapterInfos.cover_images.length > 0 && chapterInfos.cover_images.length == 1) {
		coverUrl = chapterInfos.cover_images[0];
	} else {
		if (chapterInfos.cover_images.length > 1) {
			coverUrl = chapterInfos.cover_images[1];
			wallpaper = chapterInfos.cover_images[0];
		}
	}
	msg.channel.send({
		embed: {
			title: `${chapterInfos.chapter} : ${chapterInfos.title}`,
			image: {
				url: `${wallpaper}`,
			},
			thumbnail: {
				url: `${coverUrl}`,
			},
			fields: setFieldsInfos(chapterInfos),
			description: `**Summary : **\n${chapterInfos.summary.replace(/<[\w/]*>/g,'')}\n`,
		},
	});
}

exports.exec = (bot, msg, args) => {
	const OnePieceCover = new OnePieceCoverAPI();
	OnePieceCover.findOnePieceChapter(args.join(' '))
		.then(response => {
			if(response.status == 200) {
				if (response.data) {
					showOnePieceChapterInfo(msg, response.data);
				}
				else {
					msg.channel.send('**No information available about this chapter**');
				}
			}
			else {
				msg.channel.send('**Error while retrieving one piece\'s chapter trending information**');
				console.error(response);
			}
		}
		);
};

exports.config = {
	enabled: true,
};