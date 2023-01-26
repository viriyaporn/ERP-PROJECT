const FormulaController = require('../../controllers/FormulaController');

const router = require('express').Router();

router.get('', FormulaController.getAllFormula);
router.get('/:formulaPriceId', FormulaController.getFormulaById);

module.exports = router;