const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLogin, validateUser } = require("../middleware/validate");
const { authMiddleware } = require("../middleware/authMiddleware");

// Rutas públicas
router.post("/login", validateLogin, authController.login);
router.post("/register", validateUser, authController.register);

// Rutas protegidas
router.get("/verify", authMiddleware, authController.verifyToken);
router.post("/refresh", authMiddleware, authController.refreshToken);

module.exports = router;
