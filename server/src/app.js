/**
 * Express entry point for Code Mentor.
 * Mounts REST routes used by the lesson / progress / hint APIs
 * and sends any thrown errors to the shared error handler.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.CLIENT_URL
        ? process.env.CLIENT_URL.split(',').map((value) => value.trim())
        : true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'code-mentor-api' });
});

// Domain routes — each file owns one Supabase table.
const languageRoutes = require('./routes/language.routes');
const moduleRoutes = require('./routes/module.routes');
const lessonRoutes = require('./routes/lesson.routes');
const test_casesRoutes = require('./routes/test_cases.routes');
const progressRoutes = require('./routes/progress.routes');
const hint_logsRoutes = require('./routes/hint_logs.routes');
const paste_eventsRoutes = require('./routes/paste_events.routes');
const mentorRoutes = require('./routes/mentor.routes');
const executeRoutes = require('./routes/execute.routes');

app.use('/api/mentor', mentorRoutes);
app.use('/api/execute', executeRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/test_cases', test_casesRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/hint_logs', hint_logsRoutes);
app.use('/api/paste_events', paste_eventsRoutes);

// Must sit after routes. asyncHandler forwards failures here with next(err).
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || [],
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App is running on port ${PORT}`);
});
