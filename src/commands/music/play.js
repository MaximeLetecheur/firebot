const youtube = require('ytdl-core');

module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	const youtubeURL = youtube.validateURL(args[0]) ? args[0] : null;
	if (youtubeURL == null) {
		msg.channel.send(':x: This is not a valid Youtube URL.');
		return;
	}

	youtube.getInfo(youtubeURL, (err, info) => {
		if (err) throw err;

		const TEN_MINUTES = 60 * 10;
		if (info.length_seconds <= TEN_MINUTES) {
			bot.songQueue.add({
				title: info.title,
				search: args[0],
				requestor: msg.author.username,
				youtubeURL: youtubeURL,
				info: info,
			});

			// Play immediatly the song when the jukebox isnt doing anything.
			if (!bot.jukebox.playing) {
				bot.jukebox.play(bot.songQueue.first(), msg);
			}
			else {
				msg.channel.send(':white_check_mark: The song has been added to the queue.');
			}
		}
		else {
			msg.channel.send(':x: The length of the song can not be greater than 10 minutes.');
		}
	});
};