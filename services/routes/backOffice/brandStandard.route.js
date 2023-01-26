const BrandStandardController = require('../../controllers/BrandStandardController');

const router = require('express').Router();

router.get('', BrandStandardController.getAllBrandStandards);
router.post('', BrandStandardController.createBrandStandard);
router.get('/:standardId', BrandStandardController.getBrandStandardById);
router.put('/:standardId', BrandStandardController.updateBrandStandardById);
router.delete('/:standardId', BrandStandardController.deleteBrandStandardById);

module.exports = router;