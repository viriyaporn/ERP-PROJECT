const ProductCategoryEfficacyDetailController = require('../../controllers/ProductCategoryEfficacyDetailController');

const router = require('express').Router();

// router.get('', ProductCategoryEfficacyDetailController.getAllProductCategories);
// router.get('/:id', ProductCategoryEfficacyDetailController.getProductCategoryById);
router.post(
  '',
  ProductCategoryEfficacyDetailController.validate('createProductCategoryEfficacyDetail'),
  ProductCategoryEfficacyDetailController.createProductCategoryEfficacyDetail
);
router.delete(
  '/:efficacyId',
  ProductCategoryEfficacyDetailController.validate('deleteProductCategoryEfficacyDetailById'),
  ProductCategoryEfficacyDetailController.deleteProductCategoryEfficacyDetailById
);

module.exports = router;