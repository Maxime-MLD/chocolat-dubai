import jwt from "jsonwebtoken";
import Joi from "joi";

// Vérifie le token
export function validateToken(req, res, next) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }

    req.user = decoded;

    next();
  });
}

// Vérification admin
export function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Accès refusé. Réservé aux administrateurs." });
  }
}

// Schema du JSON attendu
export function validateRegister(req, res, next) {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(50).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
}

export function validateLogin(req, res, next) {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: "Format invalide" });
  next();
}

export default validateToken;
