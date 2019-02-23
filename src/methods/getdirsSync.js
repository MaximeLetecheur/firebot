const fs = require('fs');

module.exports = (folder) => fs.readdirSync(folder).filter(item => fs.lstatSync(`${folder}/${item}`).isDirectory());