const { ProductEfficacyDetail } = require("../models/Models")

/**
 * @param {string} productId 
 * @param {string[]} efficacyIds 
 */
const updateProductEfficacyDetail = async (productId, efficacyIds = []) => {
  const efficacyDetails = await ProductEfficacyDetail.findAll({ where: { productId } });
  const efficacyIdsToDelete = efficacyDetails.reduce((acc, detail) => {
    if (efficacyIds.includes(detail.efficacyId)) return acc;
    return [...acc, detail.efficacyId]
  }, []);

  const efficacyIdsToCreate = efficacyIds.reduce((acc, efficacyId) => {
    const efficacyIdExists = efficacyDetails.find(detail => String(detail.efficacyId) === String(efficacyId))
    if (efficacyIdExists) return acc;
    return [...acc, efficacyId];
  }, []);

  return Promise.all([
    deleteProductEfficacyDetail(productId, efficacyIdsToDelete),
    insertProductEfficacyDetail(productId, efficacyIdsToCreate),
  ]);
}

/**
 * @param {string} productId 
 * @param {string[]} efficacyIds 
 */
const insertProductEfficacyDetail = async (productId, efficacyIds = []) => {
  const efficacies = efficacyIds.map(efficacyId => ({ productId, efficacyId }));
  return ProductEfficacyDetail.bulkCreate(efficacies);
}

/**
 * @param {string} productId 
 * @param {string[]} efficacyIds 
 */
const deleteProductEfficacyDetail = async (productId, efficacyIds) => {
  return ProductEfficacyDetail.destroy({
    where: { productId, efficacyId: efficacyIds }
  })
}

module.exports = {
  insertProductEfficacyDetail,
  updateProductEfficacyDetail,
}