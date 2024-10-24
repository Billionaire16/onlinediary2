// routes/homeworkRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Homework = require('../models/Homework');
const router = express.Router();

// Create homework (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { subject, description, dueDate } = req.body;
    try {
        const homework = new Homework({ subject, description, dueDate, teacher: req.user.userId });
        await homework.save();
        res.status(201).json(homework);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all homework (student and teacher access)
router.get('/', auth, async (req, res) => {
    try {
        const homework = await Homework.find().sort({ dueDate: -1 });
        res.json(homework);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update homework (teacher only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const homework = await Homework.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json(homework);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete homework (teacher only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const homework = await Homework.findByIdAndDelete(req.params.id);
        if (!homework) return res.status(404).json({ message: 'Homework not found' });
        res.json({ message: 'Homework deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
