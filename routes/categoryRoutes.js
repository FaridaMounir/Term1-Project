const express =require("express");
const router =express.Router();
const categoryController =require("../controllers/categoryController");

router.route("/")
 .post(categoryController.create)
 .get(categoryController.getAll);

router.route("/:id")
 .get(categoryController.getOne)
 .patch(categoryController.update)
 .delete(categoryController.remove);


module.exports =router;