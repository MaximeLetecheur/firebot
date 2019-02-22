function SongQueue() {
	this.queue = [];
}

SongQueue.prototype.add = function(track) {
	this.queue.push(track);
};

SongQueue.prototype.count = function() {
	return this.queue.length;
};

SongQueue.prototype.first = function() {
	return this.queue[0];
};

SongQueue.prototype.removeFirst = function() {
	return this.queue.shift();
};

SongQueue.prototype.clear = function() {
	return this.queue = [];
};

module.exports = SongQueue;
