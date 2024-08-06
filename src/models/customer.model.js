const mongoose = require('mongoose');

const customersSchema = new mongoose.Schema({

    id: { type: Number,  unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String,required: true},
    isAdmin: {type: Boolean,default: false}
});

customersSchema.pre('save', async function(next) {
    if (!this.isNew) return next();

    try {
        const lastcustomer = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        if (!lastcustomer) {
            this.id = 1;
        } else {
            this.id = lastcustomer.id + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Customer = mongoose.model('Customers', customersSchema);

module.exports = Customer;