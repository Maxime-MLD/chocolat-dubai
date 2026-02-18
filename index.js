import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import productRouter from "./routers/product.router.js";
import authRouter from "./routers/auth.router.js";

const app = express();
app.use(cors()); // On laisse ouvert pour l'instant ... a modifier pars la suite !
app.use(express.json());

app.use(productRouter);
app.use(authRouter);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // On vérifie la connexion et on synchronise les tables
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Connexion à MySQL réussie et tables synchronisées !");

    // On lance le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur : http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Impossible de démarrer le serveur :", error);
    process.exit(1);
  }
};

app.use((err, req, res, next) => {
  console.error("🔥 Erreur détectée :", err.message);
  res.status(err.status || 500).json({ error: err.message });
});
startServer();
