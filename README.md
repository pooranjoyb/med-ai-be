# Med-AI: Your AI-Driven Health Companion

Med-AI is an innovative healthcare application that harnesses artificial intelligence to enhance medical diagnostics, treatment planning, and healthcare delivery. It focuses on improving patient care and operational efficiency through advanced AI technologies.

## Key Features:

### 📅 Appointment Booking:
- Streamlined appointment scheduling system for patients to book and manage appointments with healthcare providers efficiently.
- After booking, patients receive a confirmation call.

### 📝 Prescription Summary:
- AI-powered summarization of medical prescriptions to provide patients with clear and concise information about their medications.

### 💊 Medicine Reminders:
- Personalized medication reminders based on patient-specific schedules and dosage requirements, ensuring adherence to treatment plans through timely messages.

### 📈 Report Generation:
- Automated generation of medical reports and summaries, facilitating comprehensive documentation and analysis for healthcare professionals. By using `puppeteer` and handlebars, we generate the report that are being saved to MongoDB database when Patients set reminders. 

### 🌐 Multi-Language Support:
- Ensures accessibility and inclusivity by providing support for multiple languages, allowing users worldwide to interact with the application in their preferred language.

## Technologies Used:

**Frontend:** Vite + React

**Backend:** Node.js, Express

**Testing:** Postman

## Dependencies:
- `@google/generative-ai`
- `axios`
- `express`
- `handlebars`
- `mongoose`
- `nodemon`
- `puppeteer`
- `twilio`

## Gemini Models:
- `gemini-1.5-flash`
- `@google/generative-ai`

## Twilio APIs:
- SMS
- Call
