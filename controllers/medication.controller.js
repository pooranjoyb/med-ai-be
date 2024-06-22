import dotenv from 'dotenv';
import pkg from 'twilio';
import Appointment from '../models/appointment.model.js';
const { Twilio } = pkg;
import moment from 'moment-timezone';

dotenv.config();

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendReminderSMS = async (req, res) => {
    try {
        const { reminders } = req.body;

        if (!reminders || !Array.isArray(reminders) || reminders.length === 0) {
            return res.status(400).json({ error: 'Reminders array is required and must contain at least one reminder.' });
        }

        for (const reminder of reminders) {
            const { dose, medicineName, time, phoneNumber } = reminder;

            if (!dose || !medicineName || !time || !phoneNumber) {
                console.error(`Invalid reminder format: ${JSON.stringify(reminder)}`);
                continue;
            }
            if (!moment(time, 'h:mm A', true).isValid()) {
                console.error(`Invalid time format: ${time}`);
                continue;
            }
            const now = moment().tz('Asia/Kolkata');
            const currentDateString = now.format('YYYY-MM-DD');
            const parsedTime = moment.tz(`${currentDateString} ${time}`, 'YYYY-MM-DD h:mm A', 'Asia/Kolkata');
            
            if (!parsedTime.isValid()) {
                console.error(`Failed to parse time: ${currentDateString} ${time}`);
                continue;
            }

            const sendAt = parsedTime.toISOString(); // Format to ISO 8601

            const message = `Reminder: Take ${dose} of ${medicineName} at ${time}.`;

            try {
                const scheduledMessage = await client.messages.create({
                    body: message,
                    messagingServiceSid: "MGb54895e80fc913b0d2faaa390d8030b6",
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneNumber,
                    scheduleType: 'fixed',
                    sendAt: sendAt,
                });

                console.log(`Scheduled SMS reminder for ${phoneNumber} at ${sendAt}: ${message}`);
            } catch (error) {
                console.error(`Failed to schedule SMS for ${phoneNumber}:`, error);
            }
        }

        res.json({ message: 'SMS reminders scheduled successfully.' });
    } catch (error) {
        console.error('Error scheduling SMS reminders:', error);
        res.status(500).json({ error: 'An error occurred while scheduling SMS reminders.' });
    }
};


const saveAppointmentAndCall = async (req, res) => {
    try {
        const { docName, patientName, phoneNumber, appointmentDate, appointmentTime } = req.body;

        if (!docName || !patientName || !phoneNumber || !appointmentDate || !appointmentTime) {
            return res.status(400).json({ error: 'docName, patientName, phoneNumber, appointmentDate, and appointmentTime are required.' });
        }

        const newAppointment = new Appointment({
            docName,
            patientName,
            phoneNumber,
            appointmentDate,
            appointmentTime
        });

        await newAppointment.save();

        const message = `Hello, this is a confirmation call from Med-AI for your appointment with Dr. ${docName} on ${appointmentDate} at ${appointmentTime}. Thank you for choosing us, Have a Nice Day!`;

        try {
            const call = await client.calls.create({
                twiml: `<Response><Say>${message}</Say></Response>`,
                to: phoneNumber,
                from: process.env.TWILIO_PHONE_NUMBER
            });

            console.log(`Call initiated to ${phoneNumber}: ${message}`);
            res.json({ message: 'Appointment saved and confirmation call initiated successfully.' });
        } catch (error) {
            console.error(`Failed to initiate call to ${phoneNumber}:`, error);
            res.status(500).json({ error: 'Failed to initiate confirmation call.' });
        }
    } catch (error) {
        console.error('Error saving appointment and initiating call:', error);
        res.status(500).json({ error: 'An error occurred while saving the appointment and initiating the call.' });
    }
};


export { sendReminderSMS, saveAppointmentAndCall };
