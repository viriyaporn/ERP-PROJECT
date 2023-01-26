const { Op, json } = require("sequelize")
const { ProductTextureDetail } = require("../models/Models")

/**
 * @param {string} productId 
 * @param {string[]} textureIds 
 */
const updateProductTextureDetail = async (productId, textureIds = []) => {
  const productTextureDetails = await ProductTextureDetail.findAll({ where: { productId } });
  const textureIdsToDelete = productTextureDetails.reduce((acc, detail) => {
    if (textureIds.includes(detail.textureId)) return acc;
    return [...acc, detail.textureId]
  }, []);

  const textureIdsToCreate = textureIds.reduce((acc, textureId) => {
    const textureIdExists = productTextureDetails.find(detail => String(detail.textureId) === String(textureId))
    if (textureIdExists) return acc;
    return [...acc, textureId];
  }, []);

  return Promise.all([
    deleteProductTextureDetail(productId, textureIdsToDelete),
    insertProductTextureDetail(productId, textureIdsToCreate),
  ]);
}

/**
 * @param {string} productId 
 * @param {string[]} textureIds 
 */
const insertProductTextureDetail = async (productId, textureIds = []) => {
  const efficacies = textureIds.map(textureId => ({ productId, textureId }));
  return ProductTextureDetail.bulkCreate(efficacies);
}

/**
 * @param {string} productId 
 * @param {string[]} textureIds 
 */
const deleteProductTextureDetail = async (productId, textureIds) => {
  return ProductTextureDetail.destroy({
    where: { productId, textureId: textureIds }
  })
}

module.exports = {
  insertProductTextureDetail,
  updateProductTextureDetail,
}