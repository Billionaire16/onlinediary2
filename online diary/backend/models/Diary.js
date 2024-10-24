// models/Diary.js
const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    subject: { type: String, required: true },
    entry: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Diary', diarySchema);
