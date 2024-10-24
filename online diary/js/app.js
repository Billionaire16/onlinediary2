// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));
app.use('/api/homework', require('./routes/homeworkRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));
app.use('/api/schedule', require('./routes/scheduleRoutes'));
app.use('/api/remarks', require('./routes/remarksRoutes'));
app.use('/api/diary', require('./routes/diaryRoutes')); // Don't forget to add this!

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
