import { Product } from "../models/index.js";

class ProductController {
  // Récupération de tout les produits
  getAllProducts = async (req, res, next) => {
    try {
      const products = await Product.findAll();

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la récupération des produits",
        error: error.message,
      });
    }
  };

  // Récupération des informations d'un seul produit
  getOneProduct = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const product = await Product.findOne({
        where: { slug: slug },
      });

      if (!product) {
        return res.status(404).json({ message: "Produit non trouvé" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  };

  // Ajout d'un nouveau produit
  createProduct = async (req, res, next) => {
    try {
      const { name, description, price, stock, slug, image } = req.body;

      const newProduct = await Product.create({
        name,
        description,
        price,
        stock,
        slug,
        image,
      });

      res.status(201).json({
        message: "Produit créé avec succès !",
        product: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la création",
        error: error.message,
      });
    }
  };

  // Modifier un produit
  updateProduct = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = req.body;

      // On cherche le produit par son slug
      const product = await Product.findOne({ where: { slug } });

      if (!product) {
        return res.status(404).json({ message: "Chocolat introuvable" });
      }

      // On met à jour avec les nouvelles données
      await product.update(data);

      res.json({ message: "Produit mis à jour !", product });
    } catch (error) {
      next(error);
    }
  };

  // Supprimer un produit
  deleteProduct = async (req, res, next) => {
    try {
      const { slug } = req.params;

      const deleted = await Product.destroy({ where: { slug } });

      if (!deleted) {
        return res.status(404).json({ message: "Chocolat introuvable" });
      }

      res.json({ message: "Le chocolat a été supprimé du catalogue." });
    } catch (error) {
      next(error);
    }
  };
}

const myController = new ProductController();
export default myController;
