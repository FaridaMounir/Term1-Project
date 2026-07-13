const express =require("express");
const router =express.Router();
const orderController =require("../controllers/orderController");


router.route("/checkout")
.post(orderController.checkOut);

router.route("/")
 .get(orderController.allOrders);

 router.route("/:id")
 .get(orderController.getById);

router.route("/:id/status")
 .patch(orderController.update);

module.exports =router