// routes/diaryRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Diary = require('../models/Diary');
const router = express.Router();

// Create diary entry (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { date, subject, entry } = req.body;
    try {
        const diary = new Diary({ date, subject, entry, teacher: req.user.userId });
        await diary.save();
        res.status(201).json(diary);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get diary entries (student access)
router.get('/', auth, async (req, res) => {
    try {
        const diaryEntries = await Diary.find().sort({ date: -1 });
        res.json(diaryEntries);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
