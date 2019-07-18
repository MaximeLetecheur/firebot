const axios = require('axios');
const apiUrl = 'https://kitsu.io/api/edge/';
const anime = 'anime/';
const trending = 'trending/';

function KitsuAPI() {
	// Constructor of KistuAPI Object
}

KitsuAPI.prototype.findByAnimeName = function(animeName) {

	return axios.get(`${apiUrl}${anime}?filter%5Btext%5D=${animeName}`);
};

KitsuAPI.prototype.findAnimeTrending = function(animeName) {

	return axios.get(`${apiUrl}${trending}${anime}`);
};

module.exports = KitsuAPI;