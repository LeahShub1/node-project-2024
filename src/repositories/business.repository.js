const Business = require('../models/business.model');

const BusinessRepository = {
    findByName: async (name) => {
        return await Business.findOne({ name });
    },
    create: async (data) => {
        const business = new Business(data);
        return await business.save();
    },
    updateByName: async (name, data) => {
        return await Business.findOneAndUpdate({ name }, data, { new: true });
    },
};

module.exports = BusinessRepository;
