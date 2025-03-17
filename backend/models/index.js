const { sequelize } = require("../config/db");
const User = require("./user");
const Event = require("./event");

User.hasMany(Event, { foreignKey: "userId", onDelete: "CASCADE" });
Event.belongsTo(User, { foreignKey: "userId" });

const syncDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database & tables created!");
};

module.exports = { sequelize, User, Event, syncDB };
