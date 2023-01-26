const PackageLabelController = require('../../controllers/PackageLabelController');

const router = require('express').Router();

router.get('', PackageLabelController.getAllPackageLabels);
router.get('/:packageLabelId', PackageLabelController.getAllPackageLabels);

module.exports = router;