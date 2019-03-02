const fs = require('fs');
const path = require('path');
const { Client, TextChannel } = require('discord.js');
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

Bot.prototype.updatePresence = function() {
	let cycle = 0;
	setInterval(() => {
		let content = '';
		switch (cycle) {
		case 0:
			content = this.discordClient.guilds.array().length + ' servers online!';
			break;
		case 1:
			content = this.discordClient.users.array().length + ' users online!';
			break;
		case 2:
			const uptime = this.discordClient.uptime;
			let m = Math.floor((uptime / 1000 / 60) % 60);
			m = m < 10 ? '0' + m : m;
			let h = Math.floor((uptime / 1000 / 60 / 60) % 60);
			h = h < 10 ? '0' + h : h;
			const j = Math.floor((uptime / 1000 / 60 / 60 / 60) % 24);
			content = j + 'J ' + h + 'h' + m + ' of uptime!';
		}
		this.discordClient.user.setActivity(content);
		if (cycle++ == 2) {
			cycle = 0;
		}
	}, 2500);
};

Bot.prototype.bindEvents = function() {
	this.discordClient.on('ready', () => {
		console.log(`Logged in as ${this.discordClient.user.tag}!`);
		this.updatePresence();
		this.doTasks();
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
				// try {
				this.actions[cmd](this, msg, args);
				// }
				// catch (error) {
				// 	console.error('An error has occured when using the command ' + cmd);
				// 	console.error('Command from the user: ' + msgContent);
				//     console.error('Error: ' + error);
				//     throw new Error(error);
				// }
			}
		}
	});
};

Bot.prototype.doTasks = async function() {
	fs.readdirSync('src/tasks').map((file) => {
		const key = path.parse(`src/tasks/${file}`).name;
		this.tasks[key] = require(`./tasks/${file}`);
	});

	for(const task of this.tasks) {
		setInterval(task, 5000);
	}
};

module.exports = Bot;