const axios = require('axios');
const apiUrl = 'https://onepiececover.com/api/';
const chapters = 'chapters/';

function OnePieceCoverAPI() {
	// Constructor of KistuAPI Object
}

OnePieceCoverAPI.prototype.findOnePieceChapter = function(chapterNumber) {
	return axios.get(`${apiUrl}${chapters}${chapterNumber}`);
};

module.exports = OnePieceCoverAPI;