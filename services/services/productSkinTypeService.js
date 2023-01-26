const { ProductSkinTypeDetail } = require("../models/Models")

/**
 * @param {string} productId 
 * @param {string[]} skinTypeIds 
 */
const updateProductSkinTypeDetail = async (productId, skinTypeIds = []) => {
  const skinTypeDetails = await ProductSkinTypeDetail.findAll({ where: { productId } });
  const skinTypeIdsToDelete = skinTypeDetails.reduce((acc, detail) => {
    if (skinTypeIds.includes(detail.skinTypeId)) return acc;
    return [...acc, detail.skinTypeId]
  }, []);

  const skinTypeIdsToCreate = skinTypeIds.reduce((acc, skinTypeId) => {
    const skinTypeIdExists = skinTypeDetails.find(detail => String(detail.skinTypeId) === String(skinTypeId))
    if (skinTypeIdExists) return acc;
    return [...acc, skinTypeId];
  }, []);

  return Promise.all([
    deleteProductSkinTypeDetail(productId, skinTypeIdsToDelete),
    insertProductSkinTypeDetail(productId, skinTypeIdsToCreate),
  ]);
}

/**
 * @param {string} productId 
 * @param {string[]} skinTypeIds 
 */
const insertProductSkinTypeDetail = async (productId, skinTypeIds = []) => {
  const ids = skinTypeIds.map(skinTypeId => ({ productId, skinTypeId }));
  console.log(ids);
  return ProductSkinTypeDetail.bulkCreate(ids);
}

/**
 * @param {string} productId 
 * @param {string[]} skinTypeIds 
 */
const deleteProductSkinTypeDetail = async (productId, skinTypeIds) => {
  return ProductSkinTypeDetail.destroy({
    where: { productId, skinTypeId: skinTypeIds }
  })
}

module.exports = {
  insertProductSkinTypeDetail,
  updateProductSkinTypeDetail,
}