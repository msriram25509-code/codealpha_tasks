const express = require("express");
const router = express.Router();

const { placeOrder, getMyOrders } =
require("../controllers/orderController");

router.post("/place", placeOrder);
router.get("/myorders", getMyOrders);

module.exports = router;