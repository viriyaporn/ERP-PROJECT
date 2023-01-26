const DosageController = require('../../controllers/DosageController');

const router = require('express').Router();

router.get('', DosageController.getAllDosage);
router.post('', DosageController.createDosage);
router.get('/:dosageId', DosageController.getDosageById);
router.put('/:dosageId', DosageController.updateDosageById);
router.delete('/:dosageId', DosageController.deleteDosageById);

module.exports = router;