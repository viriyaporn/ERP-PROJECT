const ProductController = require('../../controllers/ProductController');

const router = require('express').Router();

router.get('', ProductController.getAllProduct);
router.post('', ProductController.createProduct);
router.get('/:productId', ProductController.getProductById);
router.put('/:productId', ProductController.updateProductById);
router.delete('/:productId', ProductController.deleteProductById);

module.exports = router;