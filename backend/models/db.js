require("dotenv").config();

const mysql = require("mysql2");
const Sequelize = require("sequelize");

let cnx = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    connectionLimit: 10,
  })
  .promise();

// connect to db with Sequelize instance for users table
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PWD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

async function cleanup() {
  await cnx.end();
}

// define tables here
const Role = require("./role")(sequelize, Sequelize);
const User = require("./user")(sequelize, Sequelize);

// define relationships
Role.belongsToMany(User, { through: "user_roles" });
User.belongsToMany(Role, { through: "user_roles" });

const ROLES = ["user", "admin", "moderator"];

module.exports = { cnx, cleanup, Sequelize, sequelize, Role, ROLES, User };
