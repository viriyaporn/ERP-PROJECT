const PackageServiceController = require('../../controllers/PackageServiceController')

const router = require('express').Router();

router.get('', PackageServiceController.getAllPackageServices);
router.post('', PackageServiceController.createPackageService);
router.get('/:packageServiceId', PackageServiceController.getPackageServiceById);
router.put('/:packageServiceId', PackageServiceController.updatePackageServiceById);
router.delete('/:packageServiceId', PackageServiceController.deletePackageServiceById);

module.exports = router;