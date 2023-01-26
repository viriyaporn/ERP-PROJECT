const TextureController = require('../../controllers/TextureController');

const router = require('express').Router();

router.get('', TextureController.getAllTextures);
router.post('', TextureController.createTexture);
router.get('/:textureId', TextureController.getTextureById);
router.put('/:textureId', TextureController.updateTextureById);
router.delete('/:textureId', TextureController.deleteTextureById);

module.exports = router;