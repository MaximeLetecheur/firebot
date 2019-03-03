const axios = require('axios');

function ApexLegendsAPI() {
	// Constructor of ApexLegendsAPI Object
}

ApexLegendsAPI.prototype.findPlayerByUsername = function(platform, username) {
	return axios.get(`https://apextab.com/api/search.php?platform=${platform}&search=${username}`);
};

ApexLegendsAPI.prototype.findPlayerById = function(userId) {
	return axios.get(`https://apextab.com/api/player.php?aid=${userId}`);
};

module.exports = ApexLegendsAPI;