const BrandServiceController = require('../../controllers/BrandServiceController');

const router = require('express').Router();

router.get('', BrandServiceController.getAllBrandServices);
router.get('/:BrandId', BrandServiceController.getBrandServiceById);

module.exports = router;