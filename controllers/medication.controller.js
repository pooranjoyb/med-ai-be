import dotenv from 'dotenv';
import pkg from 'twilio';
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

            const message = `Reminder: Take ${dose} of ${medicineName} at ${time}.`;

            await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });

            console.log(`SMS reminder sent to ${phoneNumber}: ${message}`);
        }

        res.json({ message: 'SMS reminders sent successfully.' });
    } catch (error) {
        console.error('Error sending SMS reminders:', error);
        res.status(500).json({ error: 'An error occurred while sending SMS reminders.' });
    }
};

export default sendReminderSMS;
