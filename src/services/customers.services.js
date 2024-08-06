const CustomerRepository = require('../repositories/customers.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAuthToken = (id, isAdmin) => {
    const token = jwt.sign({ _id: id, isAdmin: isAdmin }, process.env.ACCESS_TOKEN_SECRET);
    return token;
};

const CustomerService = {
    getAllCustomers: async () => {
        return await CustomerRepository.findAll();
    },
    getCustomerById: async (id) => {
        return await CustomerRepository.findById(id);
    },
    createCustomer: async (data) => {
        return await CustomerRepository.create(data);
    },
    updateCustomer: async (id, data) => {
        return await CustomerRepository.updateById(id, data);
    },
    deleteCustomer: async (id) => {
        return await CustomerRepository.deleteById(id);
    },
    deleteAllCustomers: async () => {
        return await CustomerRepository.deleteAll();
    },
    signup: async (data) => {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const customer = {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                isAdmin: data.isAdmin || false
            };
            const newCustomer = await CustomerRepository.create(customer);
            const token = generateAuthToken(newCustomer._id, newCustomer.isAdmin);
            return { newCustomer, token };
        } catch (err) {
            throw err;
        }

    },
    signin: async (data) => {

        const customer = await CustomerRepository.findByName(data.name);
        if (customer) {
            if (await bcrypt.compare(data.password, customer.password)) {
                const token = generateAuthToken(customer._id, customer.isAdmin);
                return { customer, token };
            }
            throw new Error('worng paswword');
        }
        throw new Error('Unknown customer in the system');
    },
};

module.exports = CustomerService;
