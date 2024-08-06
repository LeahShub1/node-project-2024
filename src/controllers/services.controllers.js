const serviceService = require('../services/services.service');

const serviceController = {
    getAllServices: async (req, res) => {
        try {
            const services = await serviceService.getAllServices();
            res.status(200).json(services);
        } catch (err) {
            console.error('Error fetching services:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    createService: async (req, res) => {
        try {
            const newService = await serviceService.createService(req.body);
            res.status(201).json(newService);
        } catch (err) {
            console.error('Error creating service:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    updateService: async (req, res) => {
        try {
            const updatedService = await serviceService.updateService(req.params.name, req.body);
            if (!updatedService) {
                res.status(404).json({ err: 'the Service for update not found' });
                return;
            }
            res.status(200).json({ message: 'Service updated successfully' });
        } catch (err) {
            console.error('Error updating service:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    deleteService: async (req, res) => {
        try {
            const deletedService = await serviceService.deleteService(req.params.name);
            if (!deletedService) {
                res.status(404).json({ err: 'the Service for delete not found' });
                return;
            }
            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (err) {
            console.error('Error deleting service:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    }
};

module.exports = serviceController;
