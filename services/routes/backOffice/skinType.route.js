const SkinTypeController = require('../../controllers/SkinTypeController');

const router = require('express').Router();

router.get('', SkinTypeController.getAllSkinType);
router.post('', SkinTypeController.createSkinType);
router.get('/:skinId', SkinTypeController.getSkinTypeById);
router.put('/:skinId', SkinTypeController.updateSkinTypeById);
router.delete('/:skinId', SkinTypeController.deleteSkinTypeById);

module.exports = router;