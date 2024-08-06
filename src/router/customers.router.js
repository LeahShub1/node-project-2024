const Router = require('express');
const CustomerController = require('../controllers/customers..controllers');
const authenticateToken = require('../middleware/auth.middleewarre');
const authorize = require('../middleware/authorizeManager');

const customerRouter = Router();

customerRouter.post('/signup', CustomerController.signup);
customerRouter.post('/signin', CustomerController.signin);

customerRouter.use(authenticateToken);

customerRouter.get('/isAdmin', authorize, async (req, res) => {
    res.status(200);
});

customerRouter.get('/', authorize, CustomerController.getAllCustomers);
customerRouter.get('/:id', CustomerController.getCustomerById);
customerRouter.post('/addCustomer', CustomerController.createCustomer);
customerRouter.delete('/deleteAllCustomers', CustomerController.deleteAllCustomers);
module.exports = customerRouter;
