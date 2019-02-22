const youtube = require('ytdl-core');

function Jukebox(bot) {
	this.bot = bot;
	this.playing = false;
}

Jukebox.prototype.play = function(track, msg) {
	if (this.bot.voiceConnection == null) return;

	try {
		track.dispatcher = this.bot.voiceConnection.playStream(youtube(track.youtubeURL, { audioonly: true }));
		track.dispatcher.on('end', () => {
			this.playing = false;
			this.bot.songQueue.removeFirst();
			if (this.bot.songQueue.count() > 0) {
				this.play(this.bot.songQueue.first(), msg);
			}
		});
		track.dispatcher.on('error', (err) => {
			return msg.channel.send('error: ' + err);
		});

		this.playing = true;
		msg.channel.send(`:musical_note: Now playing: "${track.title}", Requested by: ${track.requestor}`);
	}
	catch(e) {
		console.error(e);
		this.playing = false;
		msg.channel.send(':x: Impossible de jouer cette vidéo youtube.');
	}
};

module.exports = Jukebox;