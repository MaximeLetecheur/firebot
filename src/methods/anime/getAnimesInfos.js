const numberInEnglishUntilTen = require('../numberInEnglishUntilTen');
const numberInEmojiUnicodeUntilTen = require('../numberInUnicodeEmojiUntilTen');
module.exports = (animesList) => {
	const animesFields = [];
	for(let i = 0; i < animesList.length; i++) {
		animesFields.push({
			name: ` :${i != 9 ? numberInEnglishUntilTen(i + 1) : `keycap_${numberInEnglishUntilTen(i + 1)}`}: `,
			value: `${animesList[i].attributes.titles.en_jp} `,
		});
	}
	animesFields.push({
		name: 'Please react with the emoji corresponding to the anime you want to know more about',
		value: `Example : React with emoji ${numberInEmojiUnicodeUntilTen(1)} to know more about '**${animesList[0].attributes.titles.en_jp}**'`,
	});
	return animesFields;
}