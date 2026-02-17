import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Order extends Model {}

Order.init(
  {
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "shipped", "cancelled"),
      defaultValue: "pending", // En attente par défaut
    },
    // Pas besoin de mettre userId ici, Sequelize le fera via les relations !
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  },
);

export default Order;
