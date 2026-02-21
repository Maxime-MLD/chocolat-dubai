import { Order, Product } from "../models/index.js";

class OrderController {
  createOrder = async (req, res, next) => {
    try {
      console.log("1. Début de la commande");
      const { items } = req.body;
      const userId = req.user.user_id || req.user.id;

      // Création de la commande initiale
      const newOrder = await Order.create({
        total: 0,
        status: "pending",
        userId: userId,
      });

      let totalAccumule = 0;

      // Boucle pour remplir les items et calculer le prix
      for (const item of items) {
        const searchId = parseInt(item.product_id);
        const product = await Product.findByPk(searchId);

        if (!product) {
          console.log(`❌ Produit ${searchId} non trouvé`);
          continue;
        }

        const quantite = parseInt(item.quantity);

        // VÉRIFICATION : Est-ce qu'on a assez de stock ?
        if (product.stock < quantite) {
          return res.status(400).json({
            message: `Stock insuffisant pour ${product.name} (Disponible: ${product.stock})`,
          });
        }

        const prixUnitaire = parseFloat(product.price);
        totalAccumule += prixUnitaire * quantite;

        // CALCUL & LIAISON
        await newOrder.addProduct(product, {
          through: {
            quantity: quantite,
            price: prixUnitaire,
          },
        });

        // MISE À JOUR DU STOCK : On décrémente et on sauvegarde en BDD
        product.stock -= quantite;
        await product.save();

        console.log(
          `✅ ${product.name} : Stock mis à jour (${product.stock} restants)`,
        );
      }

      // Mise à jour du total final de la commande
      newOrder.total = totalAccumule;
      await newOrder.save();

      console.log(`✅ Commande terminée ! Total final : ${totalAccumule}€`);

      res.status(201).json({
        message: "Commande enregistrée !",
        orderId: newOrder.id,
        montant_total: totalAccumule,
      });
    } catch (error) {
      console.error("🔥 Erreur critique :", error.message);
      next(error);
    }
  };

  // Voir les commandes User
  getMyOrders = async (req, res, next) => {
    try {
      const userId = req.user.user_id || req.user.id;
      const orders = await Order.findAll({
        where: { userId: userId },
        include: Product,
      });
      res.json(orders);
    } catch (error) {
      console.error("❌ Erreur getMyOrders :", error.message);
      next(error);
    }
  };
}

export default new OrderController();
