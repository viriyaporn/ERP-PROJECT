const ProductCategoryController = require('../../controllers/ProductCategoryController');

const router = require('express').Router();

router.get('', ProductCategoryController.getAllProductCategories);
router.post('', ProductCategoryController.createProductCategory);
router.get('/:productCategoryId', ProductCategoryController.getProductCategoryById);
router.put('/:productCategoryId', ProductCategoryController.updateProductCategoryById);
router.delete('/:productCategoryId', ProductCategoryController.deleteProductCategoryById);

module.exports = router;