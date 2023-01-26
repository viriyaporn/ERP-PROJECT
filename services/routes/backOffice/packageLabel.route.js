const PackageLabelController = require('../../controllers/PackageLabelController');

const router = require('express').Router();

router.get('', PackageLabelController.getAllPackageLabels);
router.post('', PackageLabelController.createPackageLabel);
router.get('/:packageLabelId', PackageLabelController.getPackageLabelById);
router.put('/:packageLabelId', PackageLabelController.updatePackageLabelById);
router.delete('/:packageLabelId', PackageLabelController.deletePackageLabelById);

module.exports = router;