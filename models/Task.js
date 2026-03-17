const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const Task = sequelize.define('Task', {

	id: {

		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},

	title: {

		type: DataTypes.STRING,
		allowNull: false
	},

	description: {

		type: DataTypes.TEXT,
		allowNull: true
	},

	status: {

		type: DataTypes.ENUM('active', 'inactive', 'completed'),
		defaultValue: 'active'
	},

	dueDate: {

		type: DataTypes.DATE,
		allowNull: true
	},

	userId: {

		type: DataTypes.INTEGER,
		allowNull: false	
	}

}, { timestamps: true });

module.exports = Task;