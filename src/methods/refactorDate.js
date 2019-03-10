module.exports = (date) => {
	const dateAsArray = date.split('-');
	return `${dateAsArray[2]}-${dateAsArray[1]}-${dateAsArray[0]}`;
};