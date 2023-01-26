const BrandCalcPackageServiceDetailController = require('../../controllers/BrandCalcPackageServiceDetailController');
const router = require('express').Router();

router.post('', BrandCalcPackageServiceDetailController.createBrandCalcPackageServiceDetail);

module.exports = router;