import express from "express";
import OrderController from "../controllers/order.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js"; // Ton middleware de sécurité

const router = express.Router();

// Créer une commande (doit être connecté)
router.post("/orders", validateToken, OrderController.createOrder);

// Voir ses commandes (doit être connecté)
router.get("/my-orders", validateToken, OrderController.getMyOrders);

export default router;
