module.exports = (error, bot) => {
	console.error(`ERROR: ${error.message}!`);
	console.error(`${error.stack}!`);
};