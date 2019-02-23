const fs = require('fs');
const path = require('path');
const Client = require('discord.js').Client;
const SongQueue = require('./songqueue');
const Jukebox = require('./jukebox');
const config = require('./config');
const getdirsSync = require('./methods/getdirsSync');

function Bot() {
	this.discordClient = new Client({ autoReconnect: true });
	this.songQueue = new SongQueue();
	this.jukebox = new Jukebox(this);
	this.actions = [];
	this.voiceConnection = null;

	this.loadActions();
	this.bindEvents();
}

Bot.prototype.connect = function() {
	return this.discordClient.login(config.token);
};

Bot.prototype.disconnect = function() {
	return this.discordClient.destroy();
};

Bot.prototype.loadActions = function() {
	const commandsFolderPath = './src/commands';
	getdirsSync(commandsFolderPath).every(folder => {
		fs.readdirSync(`${commandsFolderPath}/${folder}`).map((item) => {
			const key = path.parse(`${commandsFolderPath}/${folder}/${item}`).name;
			this.actions[key] = require(`./commands/${folder}/${item}`);
		}	);
	});
};

Bot.prototype.bindEvents = function() {
	this.discordClient.on('ready', () => {
		console.log(`Logged in as ${this.discordClient.user.tag}!`);
	});

	this.discordClient.on('error', (error) => {
		console.error(`ERROR: ${error.message}!`);
	});

	this.discordClient.on('disconnect', (err) => {
		console.error('Bot has been disconnected from discord');
		console.error(err);
		// this.discordClient.destroy();
	});

	this.discordClient.on('guildMemberAdd', (member) => {
		const channel = member.guild.channels.find(ch => ch.name === 'log');
		if (!channel) return;
		channel.send(`Yop, ${member}`);
	});

	this.discordClient.on('guildMemberRemove', (member) => {
		const channel = member.guild.channels.find(ch => ch.name === 'log');
		if (!channel) return;
		channel.send(`Au revoir, ${member}`);
	});

	this.discordClient.on('message', (msg) => {
		// Log the message
		const guildTag = msg.channel.type === 'text' ? `[${msg.guild.name}]` : '[DM]';
		const channelTag = msg.channel.type === 'text' ? `[#${msg.channel.name}]` : '';
		console.log(`${guildTag}${channelTag} ${msg.author.tag}: ${msg.content}`);

		// Ignore all bots
		if (msg.author.bot) return;

		const msgContent = msg.content.trim();
		if (msgContent.startsWith(config.prefix)) {
			const args = msgContent.split(' ');
			const cmd = args[0].substr(config.prefix.length);
			args.shift();
			if (cmd in this.actions) {
				try {
					this.actions[cmd](this, msg, args);
				}
				catch (error) {
					console.error('An error has occured when using the command' + cmd);
					console.error('Command from the user: ' + msgContent);
					console.error('Error:' + error);
				}
			}
		}
	});
};


const bot = new Bot();
bot.connect()
	.catch(console.error);