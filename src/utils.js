module.exports = {
	parseMessage: (msg) => {
		const parts = msg.split(' ');
		const isCommand = msg.charAt(0) == '!';
		const command = parts[0].substr(1);
		parts.shift();
		const content = parts.join(' ');

		return { isCommand, command, content };
	},
};