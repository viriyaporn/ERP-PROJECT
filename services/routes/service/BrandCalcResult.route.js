const BrandCalcResultController = require('../../controllers/BrandCalcResultController');
const router = require('express').Router();

router.post('', BrandCalcResultController.createBrandCalcResult);

module.exports = router;