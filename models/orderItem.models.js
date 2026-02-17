import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class OrderItem extends Model {}

OrderItem.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Important : On stocke le prix AU MOMENT de l'achat.
    // Si le prix du chocolat augmente demain, l'historique de commande ne doit pas changer.
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: false, // Pas besoin de date de création pour chaque ligne
  },
);

export default OrderItem;
