import { sequelize } from "../config/db.js";
import "../models/index.js";

async function run() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ All models were synchronized successfully");
  } catch (error) {
    console.log("Error sync BDD", error);
  } finally {
    await sequelize.close();
  }
}

await run();
