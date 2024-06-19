import express from 'express';
import sendReminderSMS from '../controllers/medication.controller.js';

const router = express.Router();

router.post('/sendReminders', sendReminderSMS);

export default router;