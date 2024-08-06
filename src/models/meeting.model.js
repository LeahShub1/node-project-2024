const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    id: { type: Number,  unique: true },
    serviceType: { type: String, required: true },
    // dateAndTime: { type: Date, required: true },
    date: { type: Date,required: true },
    time: { type: String, required: true },
    note: { type: String },
    customerName: { type: String , required:true},
    email: { type: String , required:true}
});

meetingSchema.pre('save', async function(next) {
    if (!this.isNew) return next();
    
    try {
        const lastMeeting = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
        if (!lastMeeting) {
            this.id = 1;
        } else {
            this.id = lastMeeting.id + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});





const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
