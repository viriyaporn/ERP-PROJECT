const ProductSubCategoryController = require('../../controllers/ProductSubCategoryController');

const router = require('express').Router();

router.get('', ProductSubCategoryController.getAllProductSubCategories);
router.post('', ProductSubCategoryController.createProductSubCategory);
router.get('/:productSubCategoryId', ProductSubCategoryController.getProductSubCategoryById);
router.put('/:productSubCategoryId', ProductSubCategoryController.updateProductSubCategoryById);
router.delete('/:productSubCategoryId', ProductSubCategoryController.deleteProductSubCategoryById);

module.exports = router;