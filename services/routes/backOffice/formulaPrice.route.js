const FormulaPriceController = require('../../controllers/FormulaPriceController');

const router = require('express').Router();
router.get('', FormulaPriceController.getAllFormulaPrice);
router.get('/:formulaPriceId', FormulaPriceController.getFormulaPriceById);

module.exports = router;