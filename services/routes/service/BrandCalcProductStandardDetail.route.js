const BrandCalcStandardServiceDetailController = require('../../controllers/BrandCalcStandardServiceDetailController');
const router = require('express').Router();

router.post('', BrandCalcStandardServiceDetailController.createBrandCalcStandardServiceDetail);

module.exports = router;