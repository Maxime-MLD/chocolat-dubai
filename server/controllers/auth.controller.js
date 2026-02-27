import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  // Enregistrement utilisateur
  registerUser = async (req, res, next) => {
    try {
      const dataJson = req.body;

      const userByUsername = await User.findOne({
        where: { username: dataJson.username },
      });
      const userByEmail = await User.findOne({
        where: { email: dataJson.email },
      });

      if (userByUsername || userByEmail) {
        return res
          .status(409)
          .json({ message: "L'utilisateur ou l'email existe déjà." });
      }

      // Hash du mot de passe
      const hash = await bcrypt.hash(dataJson.password, 10);
      const newUser = await User.create({
        username: dataJson.username,
        email: dataJson.email,
        password: hash,
        role: "user",
      });

      res.status(201).json({ id: newUser.id });
    } catch (error) {
      next(error);
    }
  };

  // Connexion user
  login = async (req, res, next) => {
    try {
      const dataJson = req.body;
      const userByEmail = await User.findOne({
        where: { email: dataJson.email },
      });

      // Vérifie si l'utilisateur existe
      if (!userByEmail) {
        return res
          .status(401)
          .json({ message: "Login ou mot de passe incorrect." });
      }

      // Vérifie le mot de passe (ordre: clair, puis hash)
      const isPasswordValid = await bcrypt.compare(
        dataJson.password,
        userByEmail.password,
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Login ou mot de passe incorrect." });
      }

      // Génère le token
      const token = jwt.sign(
        { user_id: userByEmail.id, role: userByEmail.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      res.status(200).json({
        token,
        user: {
          role: userByEmail.role,
          username: userByEmail.username,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

const myController = new AuthController();
export default myController;
