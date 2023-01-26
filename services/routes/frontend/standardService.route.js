const StandardServiceController = require('../../controllers/StandardServiceController');

const router = require('express').Router();

router.get('', StandardServiceController.getAllStandardServices);
router.get('/:standardId', StandardServiceController.getStandardServiceById);

module.exports = router;