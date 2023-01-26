const BrandServiceController = require('../../controllers/BrandServiceController');

const router = require('express').Router();

router.get('', BrandServiceController.getAllBrandServices);
router.post('', BrandServiceController.createBrandService);
router.get('/:brandId', BrandServiceController.getBrandServiceById);
router.put('/:brandId', BrandServiceController.updateBrandServiceById);
router.delete('/:brandId', BrandServiceController.deleteBrandServiceById);

module.exports = router;