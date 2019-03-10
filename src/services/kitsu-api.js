const axios = require('axios');
const apiUrl = 'https://kitsu.io/api/edge/';
const anime = 'anime/';

function KitsuAPI() {
	// Constructor of KistuAPI Object
}

KitsuAPI.prototype.findByAnimeName = function(animeName) {

	return axios.get(`${apiUrl}${anime}?filter%5Btext%5D=${animeName}`);
};

module.exports = KitsuAPI;