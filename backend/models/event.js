const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Event = sequelize.define("Event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  priority: {
    type: DataTypes.ENUM("normal", "important", "critical"),
    defaultValue: "normal",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Event;
