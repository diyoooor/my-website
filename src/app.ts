// src/app.ts
import express, { Application } from 'express';

// Logger
import morgan from 'morgan';
import logger from './utils/logger.util';

// Routes
import healthRouter from './routes/health.route';
import userRouter from './routes/user.route';

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
app.use('/health', healthRouter);
app.use('/user', userRouter)

export default app;
