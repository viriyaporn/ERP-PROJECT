const PackageServiceController = require('../../controllers/PackageServiceController');

const router = require('express').Router();

router.get('', PackageServiceController.getAllPackageServices);
router.get('/:packageServiceId', PackageServiceController.getPackageServiceById);

module.exports = router;