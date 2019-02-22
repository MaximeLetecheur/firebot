const axios = require('axios');

function LgelAPI() {
	// Constructor of LgelAPI Object
}

LgelAPI.prototype.findPlayer = function(username) {
	return axios.get('https://www.loups-garous-en-ligne.com/api/profile.php?user=' + username + '&fields=id,username,level,mdj,state,title,gender,signature,registered,points,playedGames,isPremium,relation,roles,gamesStatistics,achievements,gamesHistory,hamlet,canInviteHamlet,activity,wedding,themes,pantheon,worldCup,character');
};

module.exports = LgelAPI;