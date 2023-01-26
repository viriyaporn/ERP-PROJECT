const ProductDosageController = require('../../controllers/ProductDosageController');

const router = require('express').Router();

router.get('', ProductDosageController.getAllProductDosages);
router.get('/:amountId', ProductDosageController.getProductDosageById);

module.exports = router;