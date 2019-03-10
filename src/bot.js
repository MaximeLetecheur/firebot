const fs = require('fs');
const path = require('path');
const { Client } = require('discord.js');
const Sequelize = require('sequelize');
const config = require('./config');
const getdirsSync = require('./methods/getdirsSync');

const onReady = require('./handlers/ready');
const onError = require('./handlers/error');
const onDisconnect = require('./handlers/disconnect');
const onGuildMemberAdd = require('./handlers/guildMemberAdd');
const onGuildMemberRemove = require('./handlers/guildMemberRemove');
const onMessage = require('./handlers/message');

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
	this.discordClient.on('ready', () => onReady(this));
	this.discordClient.on('error', (error) => onError(error, this));
	this.discordClient.on('disconnect', (error) => onDisconnect(error, this));
	this.discordClient.on('guildMemberAdd', (member) => onGuildMemberAdd(member, this));
	this.discordClient.on('guildMemberRemove', (member) => onGuildMemberRemove(member, this));
	this.discordClient.on('message', (msg) => onMessage(msg, this));
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