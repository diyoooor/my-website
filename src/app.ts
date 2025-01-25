// src/app.ts
import express, { Application } from 'express';

// Routes
import healthRouter from './routes/health.route';

// Create Express server
const app: Application = express();


// Middleware
app.use(express.json()); 

// Define a simple route
app.use('/api', healthRouter);

export default app;
