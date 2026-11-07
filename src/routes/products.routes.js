const { Router } = require("express");
const controller = require("../controllers/products.controller");

const router = Router();

// Route hanya memetakan HTTP method + URL ke controller.
router.get("/products", controller.getAll);
router.get("/products/:id", controller.getById);
router.post("/products", controller.create);
router.put("/products/:id", controller.update);
router.delete("/products/:id", controller.remove);

module.exports = router;
