const DashboardController = require('../../controllers/DashboardController');

const router = require('express').Router();

router.get('', DashboardController.getDashboardSummary);

module.exports = router;