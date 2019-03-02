const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');
const Sequelize = require('sequelize');
const config = require('./config');
const getdirsSync = require('./methods/getdirsSync');

function Bot() {
	this.discordClient = new Client({ autoReconnect: true });
	this.db = new Sequelize(config.db.name, config.db.user, config.db.password, {
		host: config.db.host,
		dialect: config.db.dialect,
		logging: false,
		operatorsAliases: false,
		// SQLite only
		storage: 'src/database/database.sqlite',
	});
	this.db.Lgelnews = this.db.import('database/models/Lgelnews');
	this.db.User = this.db.import('database/models/User');
	this.db.sync();

	this.actions = [];
	this.tasks = [];

	this.jukebox = {};
	this.songQueues = {};
	this.voiceConnections = {};

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
	getdirsSync(commandsFolderPath).forEach(folder => {
		fs.readdirSync(`${commandsFolderPath}/${folder}`).map((item) => {
			const key = path.parse(`${commandsFolderPath}/${folder}/${item}`).name;
			this.actions[key] = require(`./commands/${folder}/${item}`);
		});
	});
};

Bot.prototype.bindEvents = function() {
	this.discordClient.on('ready', () => {
		console.log(`Logged in as ${this.discordClient.user.tag}!`);
		this.doTasks();
	});

	this.discordClient.on('error', (error) => {
		console.error(`ERROR: ${error.message}!`);
		console.error(`${error.stack}!`);
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
			const cmd = args.shift().substr(config.prefix.length);
			if (cmd in this.actions) {
				if (this.actions[cmd].config.enabled) {
					try {
						this.actions[cmd].exec(this, msg, args);
					}
					catch (error) {
						console.error('An error has occured when using the command ' + cmd);
						console.error('Command from the user: ' + msgContent);
						console.error(error.stack);
						msg.channel.send(':warning: A critical error has occured when using the command **' + cmd + '**.');
					}
				}
				else {
					msg.channel.send(':x: The command ' + cmd + ' is disabled in this guild.');
				}
			}
		}
	});
};

Bot.prototype.doTasks = async function() {
	fs.readdirSync('src/tasks').map((file) => {
		this.tasks.push(require(`./tasks/${file}`));
	});

	for(const task of this.tasks) {
		if (task.config.enabled) {
			setInterval(() => task.exec(this), task.config.time);
		}
	}
};

module.exports = Bot;