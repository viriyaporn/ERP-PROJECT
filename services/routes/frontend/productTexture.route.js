const ProductTextureController = require('../../controllers/ProductTextureController');

const router = require('express').Router();

router.get('', ProductTextureController.getAllProductTextures);
router.get('/:textureId', ProductTextureController.getProductTextureById);

module.exports = router;