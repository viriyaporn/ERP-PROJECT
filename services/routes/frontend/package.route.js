const PackageController = require('../../controllers/PackageController');

const router = require('express').Router();

router.get('', PackageController.getAllPackages);
router.get('/:packageId', PackageController.getPackageById);

module.exports = router;