// models/Remark.js
const mongoose = require('mongoose');

const remarkSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    type: { type: String, enum: ['compliment', 'remark'], required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Remark', remarkSchema);
