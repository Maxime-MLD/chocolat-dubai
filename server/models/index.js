import sequelize from "../config/db.js";
import User from "./User.models.js";
import Product from "./product.models.js";
import Order from "./order.models.js";
import OrderItem from "./orderItem.models.js";

// --- DÉFINITION DES RELATIONS ---

// Un utilisateur peut avoir plusieurs commandes
User.hasMany(Order, { foreignKey: "userId", as: "order" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Une commande contient plusieurs produits...
// ...et un produit peut être dans plusieurs commandes.
// On passe par la table intermédiaire "OrderItem"
Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "orderId",
  as: "product",
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "productId",
  as: "order",
});

export { sequelize, User, Product, Order, OrderItem };
