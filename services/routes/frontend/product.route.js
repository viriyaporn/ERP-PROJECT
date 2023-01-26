const ProductController = require('../../controllers/ProductController');

const router = require('express').Router();

router.get('', ProductController.getAllProduct);
router.get('/:productId', ProductController.getProductById);

module.exports = router;