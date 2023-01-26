const StandardServiceController = require('../../controllers/StandardServiceController');

const router = require('express').Router();

router.get('', StandardServiceController.getAllStandardServices);
router.post('', StandardServiceController.createStandardService);
router.get('/:standardServiceId', StandardServiceController.getStandardServiceById);
router.put('/:standardServiceId', StandardServiceController.updateStandardServiceById);
router.delete('/:standardServiceId', StandardServiceController.deleteStandardById);

module.exports = router;