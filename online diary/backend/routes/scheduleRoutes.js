// routes/scheduleRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Schedule = require('../models/Schedule');
const router = express.Router();

// Create schedule entry (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { day, time, subject } = req.body;
    try {
        const schedule = new Schedule({ day, time, subject, teacher: req.user.userId });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all schedule entries (student and teacher access)
router.get('/', auth, async (req, res) => {
    try {
        const schedules = await Schedule.find().sort({ day: 1, time: 1 });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update schedule entry (teacher only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete schedule entry (teacher only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const schedule = await Schedule.findByIdAndDelete(req.params.id);
        if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
        res.json({ message: 'Schedule deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
