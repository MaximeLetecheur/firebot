module.exports = (date) => {
    const dateAsArray = date.split('-');
    console.log(dateAsArray);
    console.log(dateAsArray[2]);
    return `${dateAsArray[2].split(' ')[0]}-${dateAsArray[1]}-${dateAsArray[0]}`;
}