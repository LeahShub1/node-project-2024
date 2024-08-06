// const Business = require('../models/business.model');
// const BusinessService = {
//     getBusinessesByName: async (name) => {
//         return await Business.findOne({ name: name });
//     },
//     // getBusinessById: async (id) => {
//     //     return await Business.findById(id);
//     // },
//     createBusiness: async (data) => {
//         const businessr = new Business(data)
//         return await businessr.save();
//     },
//     updateBusiness: async (name, data) => {
//         return await Business.findOneAndUpdate({ name: name }, data, { new: true });
//     },
//     // deleteBusiness: async (id) => {
//     //     return await Business.findByIdAndDelete(id);
//     // }
// }
// module.exports = BusinessService;



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
