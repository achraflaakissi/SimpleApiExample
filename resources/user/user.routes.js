const Router = require("express");
const crud = require("../../config/crud");
const User = require("./user.model");
const controller = require("./user.controller");
const protect = require("../../middleware/routesProtect");
const isAuthorize = require("../../middleware/isAuthorize");

const router = Router();

//api/users

router
  .route("/")
  .get(
    [protect, isAuthorize(["ADMIN", "SUPERADMIN"])],
    crud.controller(User).getMany
  )
  .post(
    [protect, isAuthorize(["ADMIN", "SUPERADMIN"])],
    crud.controller(User).createOne
  );

router
  .route("/:id")
  .delete(
    [protect, isAuthorize(["ADMIN", "SUPERADMIN"])],
    crud.controller(User).removeOne
  );

router.route("/singUp").post(controller.singUp);
router.route("/singIn").post(controller.singIn);

module.exports = router;
