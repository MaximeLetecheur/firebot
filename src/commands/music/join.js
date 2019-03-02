const Jukebox = require('../../jukebox');
const SongQueue = require('../../songqueue');

exports.exec = async function(bot, msg) {
	return new Promise(function(resolve, reject) {
		if (!msg.guild) return;

		if (msg.guild.id in bot.voiceConnections) {
			msg.channel.send(':x: I am already connected to a channel.');
			resolve();
			return;
		}

		if (msg.member.voiceChannel) {
			msg.member.voiceChannel.join()
				.then(voiceConnection => {
					bot.voiceConnections[msg.guild.id] = voiceConnection;
					bot.jukebox[msg.guild.id] = new Jukebox(bot);
					bot.songQueues[msg.guild.id] = new SongQueue();
					msg.channel.send(':white_check_mark: I can play music!');
					resolve();
				})
				.catch(reject);
		}
		else {
			msg.channel.send(':x: You need to join a voice channel first!');
			resolve();
			return;
		}
	});
};

exports.config = {
	enabled: true,
};