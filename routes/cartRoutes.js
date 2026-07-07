const express =require("express");
const router =express.Router();
const cartController =require("../controllers/cartController");

router.route("/")
 .get(cartController.cartGet)
 .delete(cartController.cartClear);

router.route("/items")
 .post(cartController.cartAdd);

router.route("/items/:productId")
 .patch(cartController.itemUpdate)
 .delete(cartController.itemRemove);
 


 module.exports =router;