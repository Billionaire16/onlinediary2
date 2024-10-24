// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const diaryRoutes = require('./routes/diaryRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const remarkRoutes = require('./routes/remarkRoutes');

// Config environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error: ', err));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/diary', diaryRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/remarks', remarkRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
