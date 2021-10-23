const { Schema, model } = require('mongoose');
const {ObjectId} = Schema;

const AppointmentSchema = Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    patient: { type: ObjectId, ref: "User" },
});


module.exports = model('Appointment', AppointmentSchema);
