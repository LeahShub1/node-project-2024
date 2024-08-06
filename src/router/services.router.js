const Router = require('express');
const authenticateToken = require('../middleware/auth.middleewarre');
const authorize = require('../middleware/authorizeManager');
const serviceController = require('../controllers/services.controllers');

const serviceRouter = Router();

serviceRouter.use(authenticateToken);

serviceRouter.get("/", serviceController.getAllServices);
serviceRouter.post("/addService", authorize, serviceController.createService);
serviceRouter.put("/updateService/:name", authorize, serviceController.updateService);
serviceRouter.delete("/deleteService/:name", authorize, serviceController.deleteService);
module.exports = serviceRouter;
