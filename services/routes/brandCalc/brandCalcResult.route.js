const router = require('express').Router();
const BrandCalcController = require('../../controllers/BrandCalcController');

router.post('', BrandCalcController.createBrandCalcResult);

module.exports = router;