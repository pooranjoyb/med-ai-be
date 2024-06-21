import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    docName: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: String,
        required: true,
    },
    appointmentTime: {
        type: String,
        required: true,
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;