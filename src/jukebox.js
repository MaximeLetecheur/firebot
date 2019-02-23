const youtube = require('ytdl-core');

function Jukebox(bot) {
	this.bot = bot;
	this.playing = false;
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