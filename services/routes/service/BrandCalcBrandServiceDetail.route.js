const BrandCalcBrandServiceDetailController = require('../../controllers/BrandCalcBrandServiceDetailController');
const router = require('express').Router();

router.post('', BrandCalcBrandServiceDetailController.createBrandCalcBrandServiceDetail);

module.exports = router;