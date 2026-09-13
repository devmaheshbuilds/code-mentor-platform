const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Routes
const languageRoutes = require('./routes/language.routes');
const moduleRoutes= require('./routes/module.routes');
const lessonRoutes= require('./routes/lesson.routes');
const test_casesRoutes= require('./routes/test_cases.routes');
const progressRoutes= require('./routes/progress.routes');
const hint_logsRoutes= require('./routes/hint_logs.routes')
const paste_eventsRoutes= require('./routes/paste_events.routes')

app.use('/api/languages', languageRoutes);
app.use('/api/module',moduleRoutes);
app.use('/api/lessons',lessonRoutes);
app.use('/api/test_cases',test_casesRoutes);
app.use('/api/progress',progressRoutes);
app.use('/api/hint_logs',hint_logsRoutes);
app.use('/api/paste_events',paste_eventsRoutes);

// Error-handling middleware - must be defined AFTER all routes.
// Any error passed via next(err) (including from asyncHandler) lands here.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
    });
});




app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});