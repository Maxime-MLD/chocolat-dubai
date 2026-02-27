import { sequelize, User, Product, Order, OrderItem } from "../models/index.js";
import bcrypt from "bcrypt"; // hashage des mots de passe
import data from "./data-exemples.json" with { type: "json" };

async function seed() {
  try {
    // on vide la base avant de commencer
    await sequelize.sync({ force: true });

    // Récupération des données
    const users = data.users;
    const products = data.products;

    // Import des utilisaateurs
    for (const user of users) {
      const hash = await bcrypt.hash(user.password, 10);

      await User.create({
        username: user.username,
        email: user.email,
        password: hash,
        role: user.role,
      });
    }

    // Import des produits
    for (const product of products) {
      await Product.create(product);
    }
    console.log("✅ Seed terminé avec succès !");
  } catch (error) {
    console.error("❌ Erreur pendant le seed :", error);
  } finally {
    await sequelize.close();
  }
}

await seed();
