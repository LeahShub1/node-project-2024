const Router = require('express');
const authenticateToken = require('../middleware/auth.middleewarre');
const authorize = require('../middleware/authorizeManager');
const BusinessController = require('../controllers/business.controller');

const businessRouter = Router();

businessRouter.use(authenticateToken);

businessRouter.get('/:name', BusinessController.getBusinessByName);
businessRouter.post('/addBusiness', authorize, BusinessController.createBusiness);
businessRouter.put('/updateBusiness/:name', authorize, BusinessController.updateBusiness);

module.exports = businessRouter;
