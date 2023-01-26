const { FormulaPrice, Formula } = require("../models/Models")
const { Op } = require('sequelize');

/**
 * @param {string} formulaId 
 * @param {Array} formulaPricesData 
 */
const updateFormulaPrice = async (formulaId, formulaPricesData = []) => {
  const datas = formulaPricesData.reduce((acc, item) => {
    if (item.id) return { ...acc, updateData: [...acc.updateData, item] }
    return { ...acc, insertData: [...acc.insertData, item] };
  }, { insertData: [], updateData: [] });

  return Promise.all([
    insertFormulaPrice(formulaId, datas.insertData), // Insert new formula price without id
    FormulaPrice.destroy({ // Destroy formula prices where id is not in the formulaPricesData
      where: {
        id: { [Op.notIn]: formulaPricesData.map(item => item.id).filter(item => item) }
      }
    }),
    ...datas.updateData.map(formulaPrice => FormulaPrice.update(formulaPrice, { // Update existing formula price with id
      where: { id: formulaPrice.id },
      fields: ['formulaId', 'minDosageKg', 'price'],
    }))
  ]);
}

/**
 * @param {string} formulaId 
 * @param {Array} formulaPricesData 
 */
const insertFormulaPrice = async (formulaId, formulaPricesData) => {
  return FormulaPrice.bulkCreate(
    formulaPricesData.map(prices => ({ formulaId, ...prices })),
    { fields: ['formulaId', 'minDosageKg', 'price'] }
  );
}

// const checkYoutube = async (link) => {
//   var substring = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
//   var result = link.match(substring);
//   if (result) {
//     return (result[1]);
//   }
//   return false;
// }
// const checkLink = async ({ link = null, video = null }) => {
//   const where = [];

//   if (link) where.push({ link });
//   if (video) where.push({ video });

//   const fileCode = await Formula.findAll({
//     where: { [Op.or]: where }
//   });

//   let message;

//   var id = checkYoutube(link);
//   if (id != false) {
//     console.log(id)
//     // await createFormula(field, id);
//     Swal.fire('อัปโหลดสำเร็จ', 'success');
//   } else {
//     message = 'ลิงค์ที่แนบมาต้องมาจาก Youtube เท่านั้น';
//     Swal.fire('ลิงค์ที่แนบมาต้องมาจาก Youtube เท่านั้น', e.message, 'warning');
//   }
// }

module.exports = {
  insertFormulaPrice,
  updateFormulaPrice,
  // checkLink,
}