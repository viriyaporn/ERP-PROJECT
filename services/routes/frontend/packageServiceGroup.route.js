const PackageServiceGroupController = require('../../controllers/PackageServiceGroupController');

const router = require('express').Router();

router.get('', PackageServiceGroupController.getAllPackageServiceGroups);
router.get('/:packageServiceGroupId', PackageServiceGroupController.getPackageServiceGroupById);

module.exports = router;