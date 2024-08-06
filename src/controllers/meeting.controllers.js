const MeetingService = require('../services/meeting.services');

const meetingController = {
    getAllMeetings: async (req, res) => {
        try {
            const meetings = await MeetingService.getAllMeetings();
            res.status(200).json(meetings);
        } catch (err) {
            console.error('Error fetching meetings:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    getMeetingById: async (req, res) => {
        try {
            const meeting = await MeetingService.getMeetingById(req.params.id);
            if (!meeting) {
                res.status(404).json({ message: 'The meeting not found' });
            } else {
                res.status(200).json(meeting);
            }
        } catch (err) {
            console.error('Error fetching meeting:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    createMeeting: async (req, res) => {
        try {
            const newMeeting = await MeetingService.createMeeting(req.body);
            res.status(201).json(newMeeting);
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
                console.error('Error creating meeting: Duplicate key error for id:', error.keyValue.id);
                return res.status(500).json({ error: 'Meeting with same id already exists' });
            } else {
                console.error('Error creating meeting:', error);
                //לא מציג את השגיאה הספציפית לתקן
                return res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    updateMeeting: async (req, res) => {
        try {
            const updatedMeeting = await MeetingService.updateMeeting(req.params.id, req.body);
            if (!updatedMeeting) {
                res.status(404).json({ message: 'The meeting for update not found' });
            } else {
                res.status(200).json({ message: 'Meeting updated successfully!' });
            }
        } catch (err) {
            console.error('Error updating meeting:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    deleteMeeting: async (req, res) => {
        try {
            const deletedMeeting = await MeetingService.deleteMeeting(req.params.id);
            if (!deletedMeeting) {
                res.status(404).json({ message: 'The meeting for delete not found' });
                return;
            }
            res.status(200).json({ message: 'Meeting deleted successfully!' });
        } catch (err) {
            console.error('Error deleting meeting:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    },

    deleteAllMeetings: async (req, res) => {
        try {
            const deletedMeeting = await MeetingService.deleteAllMeetings();
            res.status(200).json(deletedMeeting);
        } catch (err) {
            console.error('Error deleting meeting:', err);
            res.status(500).json({ err: 'Internal server error' });
        }
    }
};

module.exports = meetingController;
