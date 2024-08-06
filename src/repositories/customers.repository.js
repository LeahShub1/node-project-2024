const Customer = require('../models/customer.model');

const CustomerRepository = {
    findAll: async () => {
        return await Customer.find();
    },
    findByName: async (name) => {
        return await Customer.findOne({ name: name });
    },
    findById: async (id) => {
        return await Customer.findOne({ id });
    },
    create: async (data) => {
        const customer = new Customer(data);
        return await customer.save();
    },
    updateById: async (id, data) => {
        return await Customer.findByIdAndUpdate(id, data, { new: true });
    },
    deleteById: async (id) => {
        return await Customer.findByIdAndDelete(id);
    },
    deleteAll: async () => {
        return await Customer.deleteMany();
    },
    save: async (customer) => {
        return await customer.save();
    }
};

module.exports = CustomerRepository;
