const BrandCalcFormulaController = require('../../controllers/BrandCalcFormulaController');
const router = require('express').Router();

router.post('', BrandCalcFormulaController.createBrandFormula);

module.exports = router;