import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

class Product extends Model {}

Product.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING, unique: true },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  },
);

export default Product;
