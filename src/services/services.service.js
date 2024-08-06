const serviceRepository = require('../repositories/services.repository');

const serviceService = {
    getAllServices: async () => {
        return await serviceRepository.getAllServices();
    },
    createService: async (service) => {
        return await serviceRepository.createService(service);
    },
    getServiceByName: async (name) => {
        return await serviceRepository.getServiceByName(name);
    },
    updateService: async (name, service) => {
        return await serviceRepository.updateService(name, service);
    },
    deleteService: async (name) => {
        return await serviceRepository.deleteService(name);
    }
};

module.exports = serviceService;
