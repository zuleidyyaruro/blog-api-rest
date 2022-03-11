require('dotenv').config();
const express = require('express');

// controllers
const globalErrorHandler = require('./controllers/error.controller');

// routes
const postsRoutes = require('./routes/posts.routes');
const userRoutes = require('./routes/users.routes');
const commentsRoutes = require('./routes/comments.routes');

// utils
const AppError = require('./utils/appError');

// init app
const app = express();

app.use(express.json());

// endpoints
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/comments', commentsRoutes);

app.use('*', (req, res, next) => {
    next(new AppError(404, `${req.originalUrl} not found in this server`));
})

// error handler
app.use(globalErrorHandler);

module.exports = app;