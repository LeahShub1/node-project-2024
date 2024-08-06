const CustomerService = require('../services/customers.services');

const CustomerController = {
    signup: async (req, res) => {
        try {
            const { newCustomer, token } = await CustomerService.signup(req.body);
            res.status(201).json({ token, newCustomer });
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
                res.status(500).json({ error: 'Customer with same id already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },
    signin: async (req, res) => {
        try {
            const { customer, token } = await CustomerService.signin(req.body);
            res.status(200).json({ token, customer });
        } catch (err) {
            res.status(401).json({ error: err.message });
        }
    },
    getAllCustomers: async (req, res) => {
        try {
            const customers = await CustomerService.getAllCustomers();
            res.status(200).json(customers);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getCustomerById: async (req, res) => {
        try {
            const customer = await CustomerService.getCustomerById(req.params.id);
            if (!customer) {
                res.status(404).json({ message: 'Customer not found' });
            } else {
                res.status(200).json(customer);
            }
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    createCustomer: async (req, res) => {
        try {
            const newCustomer = await CustomerService.createCustomer(req.body);
            res.status(201).json(newCustomer);
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
                res.status(500).json({ error: 'Customer with same id already exists' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },
    deleteAllCustomers: async (req, res) => {
        try {
            const deletedCustomers = await CustomerService.deleteAllCustomers();
            res.status(200).json(deletedCustomers);
        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = CustomerController;
