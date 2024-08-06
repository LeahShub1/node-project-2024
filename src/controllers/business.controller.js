const BusinessService = require('../services/business.service');
const logger = require('../logger');

const BusinessController = {
    getBusinessByName: async (req, res) => {
        try {
            const business = await BusinessService.getBusinessByName(req.params.name);
            res.status(200).json(business);
        } catch (err) {

            console.error('Error fetching business:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },
    createBusiness: async (req, res) => {
        try {
            const newBusiness = await BusinessService.createBusiness(req.body);
            res.status(201).json(newBusiness);
        } catch (err) {
            logger.error("Error creating business", err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },
    updateBusiness: async (req, res) => {
        try {
            const updatedBusiness = await BusinessService.updateBusiness(req.params.name, req.body);
            if (!updatedBusiness) {
                res.status(404).json({ message: 'Business for update not found' });
            } else {
                logger.info('Business updated successfully!');
                res.status(200).json({ message: 'Business updated successfully!' });
            }
        } catch (err) {
            logger.error('Error updating business:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    }
};

module.exports = BusinessController;
