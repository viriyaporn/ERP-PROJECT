const FormulaController = require('../../controllers/FormulaController');
const router = require('express').Router();

router.get('', FormulaController.getAllFormula);
router.post('', FormulaController.createFormula);
router.get('/:formulaId', FormulaController.getFormulaById);
router.put('/:formulaId', FormulaController.updateFormulaById);
router.delete('/:formulaId', FormulaController.deleteFormulaById);

module.exports = router;