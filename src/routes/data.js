const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", dataController.getPublic);
router.get("/private", authMiddleware, dataController.getPrivate);
router.post("/", authMiddleware, dataController.create);
router.put("/:id", authMiddleware, dataController.update);
router.delete("/:id", authMiddleware, dataController.remove);

module.exports = router;
