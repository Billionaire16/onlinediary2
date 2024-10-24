// routes/remarksRoutes.js
const express = require('express');
const auth = require('../middleware/auth');
const Remark = require('../models/Remark');
const router = express.Router();

// Create remark (teacher only)
router.post('/', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    const { student, remark, type } = req.body; // type could be "compliment" or "concern"
    try {
        const newRemark = new Remark({ student, remark, type, teacher: req.user.userId });
        await newRemark.save();
        res.status(201).json(newRemark);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all remarks (student and teacher access)
router.get('/', auth, async (req, res) => {
    try {
        const remarks = await Remark.find({ student: req.user.userId }).populate('student', 'username');
        res.json(remarks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Update remark (teacher only)
router.put('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const remark = await Remark.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!remark) return res.status(404).json({ message: 'Remark not found' });
        res.json(remark);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Delete remark (teacher only)
router.delete('/:id', auth, async (req, res) => {
    if (req.user.role !== 'teacher') return res.status(403).json({ message: 'Access denied' });

    try {
        const remark = await Remark.findByIdAndDelete(req.params.id);
        if (!remark) return res.status(404).json({ message: 'Remark not found' });
        res.json({ message: 'Remark deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
