const ProductFormulaController = require('../../controllers/ProductFormulaController');

const router = require('express').Router();

router.get('', ProductFormulaController.getAllProductFormulas);
router.post('', ProductFormulaController.createProductFormula);
router.get('/:formulaId', ProductFormulaController.getProductFormulaById);
router.put('/:formulaId', ProductFormulaController.updateProductFormulaById);
router.delete('/:formulaId', ProductFormulaController.deleteProductFormulaById);

module.exports = router;