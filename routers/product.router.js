import { Router } from "express";
import myController from "../controllers/product.controller.js";
import validateToken, { isAdmin } from "../middlewares/auth.middleware.js";
import { validateProduct } from "../middlewares/product.middleware.js";

const router = Router();

// Requêtes HTTP GET
router.get("/products", myController.getAllProducts);
router.get("/products/:slug", myController.getOneProduct);
router.post(
  "/products",
  validateToken,
  isAdmin,
  validateProduct,
  myController.createProduct,
);
// router.post("/products", validateProduct, productController.createProduct);
// router.get("/products/:id", myController.getOneProduct);

export default router;
