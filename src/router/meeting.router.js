const Router = require('express');
const authenticateToken = require('../middleware/auth.middleewarre');
const authorize = require('../middleware/authorizeManager');
const meetingController = require('../controllers/meeting.controllers');

const meetingRouter = Router();

meetingRouter.use(authenticateToken);

meetingRouter.get("/", meetingController.getAllMeetings);
meetingRouter.get("/:id", meetingController.getMeetingById);
meetingRouter.post("/addMeeting", meetingController.createMeeting);
meetingRouter.put("/updateMeeting/:id", authorize, meetingController.updateMeeting);
meetingRouter.delete("/deleteMeeting/:id", authorize, meetingController.deleteMeeting);
meetingRouter.delete('/deleteAll', meetingController.deleteAllMeetings);

module.exports = meetingRouter;
