const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('guild', {
		guild_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		prefix: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: config.prefix,
		},
	});
};