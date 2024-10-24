// routes/gradeRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Grade = require('../models/Grade');
const router = express.Router();

// Create grade (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { student, subject, grade } = req.body;
    try {
        const newGrade = new Grade({ student, subject, grade, teacher: req.user.userId });
        await newGrade.save();
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get grades (student and teacher access)
router.get('/', auth, async (req, res) => {
    try {
        const grades = await Grade.find({ student: req.user.userId }).populate('student', 'username');
        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update grade (teacher only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json(grade);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete grade (teacher only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);
        if (!grade) return res.status(404).json({ message: 'Grade not found' });
        res.json({ message: 'Grade deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
