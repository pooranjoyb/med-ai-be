import dotenv from 'dotenv';
import pkg from 'twilio';
import { parse, format } from 'date-fns';
const { Twilio } = pkg;

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

            // Parse and format the time
            const now = new Date();
            const currentDateString = format(now, 'yyyy-MM-dd');
            const parsedTime = parse(`${currentDateString} ${time}`, 'yyyy-MM-dd h:mm a', new Date());
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

export default sendReminderSMS;
