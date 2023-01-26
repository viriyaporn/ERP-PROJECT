const UserController = require("../../controllers/UserController");

const router = require("express").Router();

router.get("", UserController.getAllUsers);
router.post(
  "",
  UserController.validate("createUser"),
  UserController.createUser
);
router.get(
  "/:userId",
  UserController.validate("getUserById"),
  UserController.getUserById
);
router.put(
  "/profile",
  UserController.validate("updateProfile"),
  UserController.updateProfile
);
router.put(
  "/update-password",
  UserController.validate("updatePassword"),
  UserController.updatePassword
);
router.put(
  "/:userId",
  UserController.validate("updateUserById"),
  UserController.updateUserById
);
router.delete(
  "/:userId",
  UserController.validate("deleteUserById"),
  UserController.deleteUserById
);

module.exports = router;
