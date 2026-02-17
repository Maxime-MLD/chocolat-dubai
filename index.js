import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";

const app = express();
app.use(cors());
app.use(express.json());

// Route test
app.get("/api/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Base de données synchronisée !");

    app.listen(5000, () => console.log("🚀 Serveur lancé sur le port 5000"));
  } catch (error) {
    console.error("❌ Erreur :", error);
  }
};

startServer();
