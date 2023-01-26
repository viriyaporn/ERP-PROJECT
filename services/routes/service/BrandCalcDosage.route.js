const BrandCalcDosageController = require('../../controllers/BrandCalcDosageController');
const router = require('express').Router();

router.post('', BrandCalcDosageController.createBrandCalcDosage);

module.exports = router;