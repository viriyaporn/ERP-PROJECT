const ProductPackageDetailController = require('../../controllers/ProductPackageDetailController');

const router = require('express').Router();

router.get('', ProductPackageDetailController.getAllProductPackageDetails);
router.post('', ProductPackageDetailController.createProductPackageDetail);
router.get('/:productPackageDetailId', ProductPackageDetailController.getProductPackageDetailById);
router.put('/:productPackageDetailId', ProductPackageDetailController.updateProductPackageDetailById);
router.delete('/:productPackageDetailId', ProductPackageDetailController.deleteProductPackageDetailById);

module.exports = router;