import express from 'express';
import { saveAppointmentAndCall, sendReminderSMS } from '../controllers/medication.controller.js';

const router = express.Router();

router.post('/sendReminders', sendReminderSMS);
router.post('/appointment', saveAppointmentAndCall);

export default router;