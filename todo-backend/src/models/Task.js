const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize.config');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  status: { 
    type: DataTypes.ENUM('todo', 'in progress', 'done'),
    defaultValue: 'todo',
  },
  userId: { 
    type: DataTypes.UUID, 
    allowNull: false, 
    references: { model: 'Users', key: 'id' } 
  },
}, { timestamps: true });

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

module.exports = Task;
