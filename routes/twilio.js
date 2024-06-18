import express from 'express';
import twilio from '../controllers/twilio.controller.js';

const router = express.Router();

router.post('/twilio', twilio);

export default router;