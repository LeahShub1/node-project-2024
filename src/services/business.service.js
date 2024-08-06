const BusinessRepository = require('../repositories/business.repository');

const BusinessService = {
    getBusinessByName: async (name) => {
        return await BusinessRepository.findByName(name);
    },
    createBusiness: async (data) => {
        return await BusinessRepository.create(data);
    },
    updateBusiness: async (name, data) => {
        return await BusinessRepository.updateByName(name, data);
    },
};

module.exports = BusinessService;
