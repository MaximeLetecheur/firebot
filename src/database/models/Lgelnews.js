module.exports = (sequelize, DataTypes) => {
	return sequelize.define('lgelnews', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		timestamps: false,
	});
};