import sequelize from "../config/db.js";
import User from "./User.models.js";
import Product from "./products.models.js";
import Order from "./order.models.js";
import OrderItem from "./orderItem.models.js";

// --- DÉFINITION DES RELATIONS ---

// 1. Un utilisateur a plusieurs commandes
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// 2. Une commande contient plusieurs produits...
// ...et un produit peut être dans plusieurs commandes.
// On passe par la table intermédiaire "OrderItem"
Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });

export { sequelize, User, Product, Order, OrderItem };
