const PackageController = require('../../controllers/PackageController');

const router = require('express').Router();

router.get('', PackageController.getAllPackages);
router.post('', PackageController.createPackage);
router.get('/:packageId', PackageController.getPackageById);
router.put('/:packageId', PackageController.updatePackageById);
router.delete('/:packageId', PackageController.deletePackageById);

module.exports = router;