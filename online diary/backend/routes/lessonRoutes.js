// routes/lessonRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const router = express.Router();

// Create lesson (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { title, description, date } = req.body;
    try {
        const lesson = new Lesson({ title, description, date, teacher: req.user.userId });
        await lesson.save();
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all lessons (student and teacher access)
router.get('/', auth, async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({ date: -1 });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update a lesson (teacher only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete a lesson (teacher only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
        res.json({ message: 'Lesson deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
