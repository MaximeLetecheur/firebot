module.exports = (error) => {
	console.error(`ERROR: ${error.message}!`);
	console.error(`${error.stack}!`);
};