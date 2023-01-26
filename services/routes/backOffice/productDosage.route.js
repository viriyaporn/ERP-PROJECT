const ProductDosageController = require('../../controllers/ProductDosageController');

const router = require('express').Router();

router.get('', ProductDosageController.getAllProductDosages);
router.post('', ProductDosageController.createProductDosage);
router.get('/:dosageId', ProductDosageController.getProductDosageById);
router.put('/:dosageId', ProductDosageController.updateProductDosageById);
router.delete('/:dosageId', ProductDosageController.deleteProductDosageById);

module.exports = router;