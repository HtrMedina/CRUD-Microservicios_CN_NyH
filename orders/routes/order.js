const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/create", orderController.create);
router.get("/getAll", orderController.getAll);
router.get("/get/:id", orderController.getById);

module.exports = router;