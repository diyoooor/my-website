// src/app.ts
import express, { Application } from 'express';

// Routes
import healthRouter from './routes/health.route';
import morgan from 'morgan';
import logger from './utils/logger.util';

// Create Express server
const app: Application = express();


// Morgan setup: direct Morgan’s output to Winston
app.use(morgan('tiny', {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));

// Middleware
app.use(express.json());

// Define a simple route
app.use('/api/v1/health', healthRouter);

export default app;
