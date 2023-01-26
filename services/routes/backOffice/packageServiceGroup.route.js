const PackageServiceGroupController = require('../../controllers/PackageServiceGroupController');

const router = require('express').Router();

router.get('', PackageServiceGroupController.getAllPackageServiceGroups);
router.post('', PackageServiceGroupController.createPackageServiceGroup);
router.get('/:packageServiceGroupId', PackageServiceGroupController.getPackageServiceGroupById);
router.put('/:packageServiceGroupId', PackageServiceGroupController.updatePackageServiceGroupById);
router.delete('/:packageServiceGroupId', PackageServiceGroupController.deletePackageServiceGroupById);

module.exports = router;