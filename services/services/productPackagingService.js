const { ProductPackageDetail } = require("../models/Models")

/**
 * @param {string} productId 
 * @param {string[]} packageIds 
 */
const updateProductPackageDetail = async (productId, packageIds = []) => {
  const packagingDetails = await ProductPackageDetail.findAll({ where: { productId } });
  const packageIdsToDelete = packagingDetails.reduce((acc, detail) => {
    if (packageIds.includes(detail.packageId)) return acc;
    return [...acc, detail.packageId]
  }, []);

  const packageIdsToCreate = packageIds.reduce((acc, packagingId) => {
    const packagingIdExists = packagingDetails.find(detail => String(detail.packageId) === String(packagingId))
    if (packagingIdExists) return acc;
    return [...acc, packagingId];
  }, []);

  return Promise.all([
    deleteProductPackageDetail(productId, packageIdsToDelete),
    insertProductPackageDetail(productId, packageIdsToCreate),
  ]);
}

/**
 * @param {string} productId 
 * @param {string[]} packageIds 
 */
const insertProductPackageDetail = async (productId, packageIds = []) => {
  const efficacies = packageIds.map(packageId => ({ productId, packageId }));
  return ProductPackageDetail.bulkCreate(efficacies);
}

/**
 * @param {string} productId 
 * @param {string[]} packageIds 
 */
const deleteProductPackageDetail = async (productId, packageIds) => {
  return ProductPackageDetail.destroy({
    where: { productId, packageId: packageIds }
  })
}

module.exports = {
  insertProductPackageDetail,
  updateProductPackageDetail,
}