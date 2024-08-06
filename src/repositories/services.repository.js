const Service = require('../models/service.model');

const serviceRepository = {
    getAllServices: async () => {
        return await Service.find();
    },
    createService: async (service) => {
        const newService = new Service(service);
        return await newService.save();
    },
    getServiceByName: async (name) => {
        return await Service.findOne({name: name });
    },
    updateService: async (name, service) => {
        return await Service.findOneAndUpdate({ name: name  }, service, { new: true });
    },
    deleteService: async (name) => {
        return await Service.findOneAndDelete({ name: name  });
    }
};

module.exports = serviceRepository;
