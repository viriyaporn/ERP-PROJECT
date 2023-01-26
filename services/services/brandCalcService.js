const { QueryTypes } = require("sequelize");
const connection = require("../configs/database");
const BrandCalcEfficacyDetail = require("../models/BrandCalcEfficacyDetail");
const { BrandCalcResult, BrandCalcBrandServiceDetail, BrandCalcPackageServiceDetail, BrandCalcStandardServiceDetail } = require("../models/Models");

const createBrandCalcResult = data => BrandCalcResult.create({
  textureNameTh: data.texture.nameTh,
  textureNameEn: data.texture.nameEn,
  dosage: data.dosage.dosage ?? data.dosage,
  formulaNameTh: data.formula.nameTh,
  formulaNameEn: data.formula.nameEn,
  formulaPrice: data.formula.price,
  packageNameTh: data.package?.nameTh,
  packageNameEn: data.package?.nameEn,
  packageMinDosage: data.package?.minDosage,
  packageMaxDosage: data.package?.maxDosage,
  packagePrice: data.package?.price || data.package,
  packageCartonPrice: data.packageCartonPrice,
  packageLabelNameTh: data.packageLabel.nameTh,
  packageLabelNameEn: data.packageLabel.nameEn || '',
  packageLabelPrice: data.packageLabel.price,
  productCategoryNameTh: data.productCategory.nameTh,
  productCategoryNameEn: data.productCategory.nameEn,
  productSubCategoryNameTh: data.product.ProductSubCategory.nameTh,
  productSubCategoryNameEn: data.product.ProductSubCategory.nameEn,
  productNameTh: data.product.nameTh,
  productNameEn: data.product.nameEn,
  productItemCode: data.product.itemCode,
  productAmount: data.productAmount,
  productMinKgDosage: data.productMinKgDosage,
  BrandCalcBrandServiceDetails: data.brandServices.map(brandService => ({
    brandServiceNameEn: brandService.nameEn,
    brandServiceNameTh: brandService.nameTh,
    brandServicePrice: brandService.price,
  })),
  BrandCalcPackageServiceDetails: data.packageServices.map(packageService => ({
    packageServiceGroupNameTh: packageService.packageServiceGroup.nameTh,
    packageServiceGroupNameEn: packageService.packageServiceGroup.nameEn,
    packageServiceNameTh: packageService.nameTh,
    packageServiceNameEn: packageService.nameEn,
    packageServicePrice: packageService.price,
  })),
  BrandCalcEfficacyDetails: data.efficacies.map(efficacy => ({
    efficacyNameTh: efficacy.nameTh,
    efficacyNameEn: efficacy.nameEn,
    efficacyPrice: efficacy.price,
  })),
  BrandCalcStandardServiceDetails: data.standardServices.map(standardService => ({
    standardServiceNameTh: standardService.nameTh,
    standardServiceNameEn: standardService.nameEn,
    standardServicePrice: standardService.price,
  })),
  userId: data.userId,
  summary: data.sum,
}, {
  include: [
    BrandCalcBrandServiceDetail,
    BrandCalcPackageServiceDetail,
    BrandCalcEfficacyDetail,
    BrandCalcStandardServiceDetail,
  ]
});

const monthlyBrandCalcCount = async (year = String((new Date).getFullYear())) => {
  return connection.query(
    `SELECT
      to_char("createdAt", 'YYYY-MM') as "yearMonth",
      COUNT("id") as "sum"
    FROM public."BrandCalcResults"
    WHERE to_char("createdAt", 'YYYY') = ?
    GROUP BY to_char("createdAt", 'YYYY-MM')`,
    {
      type: QueryTypes.SELECT,
      replacements: [year]
    }
  )
}

const dailyBrandCalcCount = async (dateObj = new Date) => {
  const month = String(dateObj.getMonth()+1).padStart(2, 0)
  const year = dateObj.getFullYear()
  const yearMonth = `${year}-${month}`
  
  return connection.query(
    `SELECT
      to_char("createdAt", 'YYYY-MM-DD') as "date",
      COUNT("id") as "sum"
    FROM public."BrandCalcResults"
    WHERE to_char("createdAt", 'YYYY-MM') = ?
    GROUP BY to_char("createdAt", 'YYYY-MM-DD')`,
    {
      type: QueryTypes.SELECT,
      replacements: [yearMonth]
    }
  )
}

module.exports = {
  createBrandCalcResult,
  monthlyBrandCalcCount,
  dailyBrandCalcCount,
}