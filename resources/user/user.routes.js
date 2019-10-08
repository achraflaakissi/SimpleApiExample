const Router = require("express");
const crud = require("../../config/crud");
const User = require("./user.model");
const controller = require("./user.controller");
const protect = require("../../middleware/routesProtect");

const router = Router();

//api/users

router
  .route("/")
  .get(protect, crud.controller(User).getMany)
  .post(crud.controller(User).createOne);

router
  .route("/:id")
  .get(controller.singIn)
  .delete(crud.controller(User).removeOne);

router.route("/singUp").post(controller.singUp);

module.exports = router;
