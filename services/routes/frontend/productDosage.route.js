const DosageController = require('../../controllers/DosageController');

const router = require('express').Router();

router.get('', DosageController.getAllDosage);
router.get('/:dosageId', DosageController.getDosageById);

module.exports = router;