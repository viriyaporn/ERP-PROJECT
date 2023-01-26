const ProductPackageController = require('../../controllers/ProductPackageController');

const router = require('express').Router();

router.get('', ProductPackageController.getAllProductPackage);
router.get('/:productPackageId', ProductPackageController.getProductPackageById);

module.exports = router;