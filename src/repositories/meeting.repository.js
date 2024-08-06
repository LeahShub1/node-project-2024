const Meeting = require('../models/meeting.model');

const meetingRepository = {
    getAllMeetings: async () => {
        return await Meeting.find();
    },

    getMeetingById: async (id) => {
        return await Meeting.findOne({ id: id });
    },

    createMeeting: async (data) => {
        const meeting = new Meeting(data);
        return await meeting.save();
    },

    updateMeeting: async (id, data) => {
        return await Meeting.findOneAndUpdate({ id: id }, data, { new: true });
    },

    deleteMeeting: async (id) => {
        return await Meeting.findOneAndDelete({ id: id }, { new: true });
    },

    findMeetingByTime: async (time) => {
        return await Meeting.findOne({ time: time });
    },

    findMeetingByDate: async (date) => {
        return await Meeting.findOne({ date: date });
    },

    deleteAllMeetings: async () => {
        return await Meeting.deleteMany();
    }
};

module.exports = meetingRepository;
