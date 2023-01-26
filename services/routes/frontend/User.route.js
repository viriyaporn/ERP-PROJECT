const UserController = require("../../controllers/UserController");

const router = require("express").Router();

router.get('', UserController.getAllUsers);
router.get('', UserController.createUser);

module.exports = router;
