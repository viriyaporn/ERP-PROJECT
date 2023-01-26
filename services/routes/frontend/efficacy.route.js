const EfficacyController = require('../../controllers/EfficacyController');

const router = require('express').Router();

router.get('', EfficacyController.getAllEfficacies);
router.get('/:efficacyId', EfficacyController.getEfficacyById);

module.exports = router;