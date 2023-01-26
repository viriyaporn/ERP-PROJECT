const ProductPackageDetailController = require('../../controllers/ProductPackageDetailController');

const router = require('express').Router();

router.get('', ProductPackageDetailController.getAllProductPackageDetail);
router.get('/:productPackageId', ProductPackageDetailController.getProductPackageDetailById);

module.exports = router;