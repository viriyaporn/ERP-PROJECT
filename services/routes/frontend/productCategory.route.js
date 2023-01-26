const ProductCategoryController = require('../../controllers/ProductCategoryController');

const router = require('express').Router();

router.get('', ProductCategoryController.getAllProductCategories);
router.get('/:categoryId', ProductCategoryController.getProductCategoryById);

module.exports = router;