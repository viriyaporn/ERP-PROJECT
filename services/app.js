require('dotenv').config();

const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csrf = require('csurf');
const cors = require('cors');
const { createServer } = require('http');

const authMiddleware = require('./middlewares/auth');
const adminMiddleware = require('./middlewares/admin');
const bootstrap = require('./middlewares/bootstrap');

// =====================backoffice_route===============
const authRouter = require('./routes/auth.route');
const backOfficeRouter = require('./routes/backOffice/backOffice.route');
const userRouter = require('./routes/backOffice/user.route');
const productRouter = require('./routes/backOffice/product.route');
const productCategoryRouter = require('./routes/backOffice/productCategory.route');
const productSubCategoryRouter = require('./routes/backOffice/productSubCategory.route');
const productformulaRouter = require('./routes/backOffice/formula.route');
const textureRouter = require('./routes/backOffice/texture.route');
const efficacyRouter = require('./routes/backOffice/efficacy.route');
const skinTypeRouter = require('./routes/backOffice/skinType.route');
const productCategoryEfficacyRouter = require('./routes/backOffice/productCategoryEfficacyDetail.route');
const packageRouter = require('./routes/backOffice/package.route');
const productPackageDetailRouter = require('./routes/backOffice/productPackageDetail.route');
const packageServiceRouter = require('./routes/backOffice/packageService.route');
const packageServiceGroupRouter = require('./routes/backOffice/packageServiceGroup.route');
const packageLabelRouter = require('./routes/backOffice/packageLabel.route');
const dosageRouter = require('./routes/backOffice/dosage.route');
const brandServiceRouter = require('./routes/backOffice/brandService.route');
const StandardServiceRouter = require('./routes/backOffice/standardService.route');
const calcResultRouter = require('./routes/backOffice/calcResult.route');
const dashboardRouter = require('./routes/backOffice/dashboard.route');

// =====================frontend_route=====================
const frontendRouter = require('./routes/frontend.route');
const frontendProductRouter = require('./routes/frontend/product.route');
const frontendEfficacyRouter = require('./routes/frontend/efficacy.route');
const frontendTextureRouter = require('./routes/frontend/texture.route');
const frontendCategoryRouter = require('./routes/frontend/productCategory.route');
const frontendBrandServiceRouter = require('./routes/frontend/brandService.route');
const frontendPackageRouter = require('./routes/frontend/package.route');
const frontendPackageLabelRouter = require('./routes/frontend/packageLabel.route');
const frontendPackageServiceRouter = require('./routes/frontend/packageService.route');
const frontendPackageServiceGroupRouter = require('./routes/frontend/packageServiceGroup.route');
const frontendFormulaRouter = require('./routes/frontend/productFormula.route');
const frontendDosageRouter = require('./routes/frontend/productDosage.route');
const frontendStandardRouter = require('./routes/frontend/standardService.route');
const brandCalcResultRouter = require('./routes/brandCalc/brandCalcResult.route');
const frontendUserRouter = require('./routes/frontend/User.route');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'],
  credential: true,
};

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(logger('dev'));

// Middlewares
app.use(bootstrap);

app.use('/auth', authRouter);

// Back-office routes
app.use('/back-office/user', adminMiddleware,userRouter);
app.use('/back-office/product', adminMiddleware, productRouter);
app.use('/back-office/product-category', adminMiddleware, productCategoryRouter);
app.use('/back-office/product-subcategory', adminMiddleware, productSubCategoryRouter);
app.use('/back-office/texture', adminMiddleware, textureRouter);
app.use('/back-office/efficacy', adminMiddleware, efficacyRouter);
app.use('/back-office/category-efficacy-detail', adminMiddleware, productCategoryEfficacyRouter);
app.use('/back-office/product-formula', adminMiddleware, productformulaRouter);
app.use('/back-office/dosage', adminMiddleware, dosageRouter);
app.use('/back-office/skin-type', adminMiddleware, skinTypeRouter);
app.use('/back-office/product-detail', adminMiddleware, productPackageDetailRouter);
app.use('/back-office/package', adminMiddleware, packageRouter);
app.use('/back-office/package-service', adminMiddleware, packageServiceRouter);
app.use('/back-office/package-service-group', adminMiddleware, packageServiceGroupRouter);
app.use('/back-office/package-label', adminMiddleware, packageLabelRouter);
app.use('/back-office/brand-service', adminMiddleware, brandServiceRouter);
app.use('/back-office/standard-service', adminMiddleware, StandardServiceRouter);
app.use('/back-office/calc-result', adminMiddleware, calcResultRouter);
app.use('/back-office/dashboard', adminMiddleware, dashboardRouter);
app.use('/back-office', adminMiddleware, backOfficeRouter);

// Client frontend routes
app.use('/', frontendRouter);
app.use('/api/product', frontendProductRouter);
app.use('/api/product-texture', frontendTextureRouter);
app.use('/api/efficacy', frontendEfficacyRouter);
app.use('/api/product-category', frontendCategoryRouter);
app.use('/api/product-brand-service', frontendBrandServiceRouter);
app.use('/api/product-efficacy', frontendEfficacyRouter);
app.use('/api/package', frontendPackageRouter);
app.use('/api/package-label', frontendPackageLabelRouter);
app.use('/api/package-service', frontendPackageServiceRouter);
app.use('/api/package-service-group', frontendPackageServiceGroupRouter);
app.use('/api/product-formula', frontendFormulaRouter);
app.use('/api/product-dosage', frontendDosageRouter);
app.use('/api/standard-service', frontendStandardRouter);
app.use('/api/user', frontendUserRouter);

// Client frontend application "Branding Cost Calculator"
app.use('/brand-calc-result', authMiddleware, brandCalcResultRouter)

// Catch 404 then forward to error handler
app.use((req, res, next) => {
  next(createError(404));
})

// Error handler
app.use(
  /**
   * @param {Error} err 
   * @param {express.Request} req 
   * @param {express.Response} res 
   * @param {express.NextFunction} next 
   */
  (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.DEV === 'true' ? err : {};

    const statusCode = err?.code || err?.status || 500;

    return res.status(statusCode).json({
      code: statusCode,
      message: err?.message || 'Error'
    });
  }
)

const httpServer = createServer(app);

httpServer.listen(process.env.PORT, () => {
  console.log('SERVER STARTED AT PORT: ' + process.env.PORT);
})
