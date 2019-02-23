const youtube = require('ytdl-core');

function Jukebox(bot) {
	this.bot = bot;
	this.playing = false;
	this.volume = 1;
}

Jukebox.prototype.play = function(track, msg) {
	if (this.bot.voiceConnections[msg.guild.id] == null) return;

	try {
		track.dispatcher = this.bot.voiceConnections[msg.guild.id].playStream(youtube(track.youtubeURL, { audioonly: true }));
		track.dispatcher.on('end', () => {
			this.playing = false;
			this.bot.songQueues[msg.guild.id].removeFirst();
			if (this.bot.songQueues[msg.guild.id].count() > 0) {
				this.play(this.bot.songQueues[msg.guild.id].first(), msg);
			}
		});
		track.dispatcher.on('error', (err) => {
			return msg.channel.send('error: ' + err);
		});
		track.dispatcher.setVolume(1);

		this.playing = true;
		msg.channel.send(`:musical_note: Now playing: "${track.title}", Requested by: ${track.requestor}`);
	}
	catch(e) {
		console.error(e);
		this.playing = false;
		msg.channel.send(':x: Impossible de jouer cette vidéo youtube.');
	}
};

Jukebox.prototype.setVolume = function(volume, msg) {
	this.volume = volume/100;
	if (this.bot.voiceConnections[msg.guild.id]) {
		this.bot.voiceConnections[msg.guild.id].dispatcher.setVolume(this.volume);
	}
}

module.exports = Jukebox;