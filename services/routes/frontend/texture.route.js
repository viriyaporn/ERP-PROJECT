const TextureController = require('../../controllers/TextureController');

const router = require('express').Router();

router.get('', TextureController.getAllTextures);
router.get('/:textureId', TextureController.getTextureById);

module.exports = router;