import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    dosages: [
        {
            dose: {
                type: String,
                required: true
            },
            medicineName: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            }
        }
    ]
});

const Medicine = mongoose.model('medicine', medicineSchema);

export default Medicine;