import express from "express";
import OrderController from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js"; // Ton middleware de sécurité

const router = express.Router();

// Créer une commande (doit être connecté)
router.post("/orders", verifyToken, OrderController.createOrder);

// Voir ses commandes (doit être connecté)
router.get("/my-orders", verifyToken, OrderController.getMyOrders);

export default router;
