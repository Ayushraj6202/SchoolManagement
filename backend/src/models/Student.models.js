import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rollId: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    DOB: {
        type: Date,
        required: true,
    },
    yearOfAdmission: {
        type: Date,
    },
    parent: {
        father: {
            name: { type: String },
            DOB: { type: Date },
            phoneNumber: { type: String },
        },
        mother: {
            name: { type: String },
            DOB: { type: Date },
            phoneNumber: { type: String },
        },
    },
    address: {
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        village: {
            type: String,
        },
        pincode: {
            type: Number,
        },
    }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
