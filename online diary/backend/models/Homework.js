// models/Homework.js
const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Homework', homeworkSchema);
