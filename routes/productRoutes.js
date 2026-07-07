const express =require("express");
const router =express.Router();
const productController =require("../controllers/productController");

router.route("/")
 .post(productController.create)
 .get(productController.getAll);

router.route("/:id")
 .get(productController.getOne)
 .patch(productController.update)
 .delete(productController.remove);

module.exports = router;