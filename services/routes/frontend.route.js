const AuthController = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/register', AuthController.validate('register'), AuthController.register);
router.get('/get-token', AuthController.validate('register'), AuthController.register);

module.exports = router;