const BrandCalcController = require('../../controllers/BrandCalcController');

const router = require('express').Router();

router.get('', BrandCalcController.getAllCalcResult);
router.post('', BrandCalcController.createBrandCalcResult);
router.get('/:calcResultId', BrandCalcController.getCalcResultById);

module.exports = router;