const youtube = require('ytdl-core');
const SongQueue = require('../../songqueue');
const Jukebox = require('../../jukebox');
const join = require('./join');

module.exports = (bot, msg, args) => {
	if (!msg.guild) return;

	if (!youtube.validateURL(args[0])) {
		msg.channel.send(':x: This is not a valid Youtube URL.');
		return;
	}

	const youtubeURL = args[0];
	youtube.getInfo(youtubeURL, (err, info) => {
		if (err) throw err;

		const SECONDS_IN_TEN_MINUTES = 60 * 10;
		if (info.length_seconds <= SECONDS_IN_TEN_MINUTES) {
			if (!(msg.guild.id in bot.songQueues)) {
				bot.songQueues[msg.guild.id] = new SongQueue();
			}
			if (!(msg.guild.id in bot.jukebox)) {
				bot.jukebox[msg.guild.id] = new Jukebox(bot);
			}

			bot.songQueues[msg.guild.id].add({
				title: info.title,
				search: args[0],
				requestor: msg.author.username,
				youtubeURL: youtubeURL,
				info: info,
			});

			// Play immediatly the song when the jukebox isnt doing anything.
			if (!bot.jukebox[msg.guild.id].playing) {
				bot.jukebox[msg.guild.id].play(bot.songQueues[msg.guild.id].first(), msg);
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