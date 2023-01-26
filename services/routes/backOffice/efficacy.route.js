const EfficacyController = require('../../controllers/EfficacyController');

const router = require('express').Router();

router.get('', EfficacyController.getAllEfficacies);
router.post('', EfficacyController.createEfficacy);
router.get('/:efficacyId', EfficacyController.getEfficacyById);
router.put('/:efficacyId', EfficacyController.updateEfficacyById);
router.delete('/:efficacyId', EfficacyController.deleteEfficacyById);

module.exports = router;