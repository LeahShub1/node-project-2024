const MeetingRepository = require('../repositories/meeting.repository');
const  {sendEmail}  = require('./emailService');


const meetingService = {
    getAllMeetings: async () => {
        return await MeetingRepository.getAllMeetings();
    },

    getMeetingById: async (id) => {
        return await MeetingRepository.getMeetingById(id);
    },

    createMeeting: async (data) => {
        const existingMeetingAtDate = await MeetingRepository.findMeetingByDate(data.date);
        const existingMeetingAtTime = await MeetingRepository.findMeetingByTime(data.time);

        if (existingMeetingAtDate && existingMeetingAtTime) {
            throw new Error('A meeting already exists at the specified date and time');
        }

        const newMeeting = await MeetingRepository.createMeeting(data);

        const emailSubject = 'פגישה נקבעה';
        const emailText = `הפגישה שלך נקבעה לתאריך ${data.date} בשעה ${data.time}.`;

        await sendEmail(data.email, emailSubject, emailText);

        return newMeeting;
    },

    updateMeeting: async (id, data) => {
        return await MeetingRepository.updateMeeting(id, data);
    },

    deleteMeeting: async (id) => {
        return await MeetingRepository.deleteMeeting(id);
    },

    findMeetingByTime: async (time) => {
        return await MeetingRepository.findMeetingByTime(time);
    },

    findMeetingByDate: async (date) => {
        return await MeetingRepository.findMeetingByDate(date);
    },

    deleteAllMeetings: async () => {
        return await MeetingRepository.deleteAllMeetings();
    }
};

module.exports = meetingService;
