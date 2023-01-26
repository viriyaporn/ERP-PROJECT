const AuthController = require('../controllers/AuthController');

const router = require('express').Router();

router.post('/check-duplicate', AuthController.checkDuplicateValue);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.validate('register'), AuthController.register);
router.get('/get-token', AuthController.getToken);

router.post('/forgot-password', AuthController.validate('sendResetPassLink'), AuthController.sendResetPassLink);
router.post('/verify-reset-token', AuthController.validate('verifyResetPasswordToken'), AuthController.verifyResetPasswordToken);
router.post('/login-google',AuthController.validate('googleLogin'), AuthController.googleLogin);
router.post('/login-facebook',AuthController.validate('facebookLogin'), AuthController.facebookLogin);
// router.post('/create-user',AuthController.validate('createUser'), AuthController.createUser);
router.post('/reset-password', AuthController.validate('resetPassword'), AuthController.resetPassword);

module.exports = router;