// server/db.js
import { Sequelize } from "sequelize";
import "dotenv/config"; // Façon moderne de charger .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
);

export default sequelize;
