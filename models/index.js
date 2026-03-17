const User = require('./User');
const Task = require('./Task');
const sequelize = require('../config/db');

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Task, sequelize };