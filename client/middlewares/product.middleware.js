import Joi from "joi";

export function validateProduct(req, res, next) {
  const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    price: Joi.number().positive().precision(2).required(),
    slug: Joi.string()
      .regex(/^[a-z0-9-]+$/)
      .required(), // Format slug (minuscules, chiffres, tirets)
    stock: Joi.number().integer().min(0).default(0),
    image: Joi.string().uri().optional(), // Doit être une URL si présente
  });

  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Données du produit invalides",
      details: error.details[0].message,
    });
  }
  next();
}
