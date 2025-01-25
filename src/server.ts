// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger.util';
import connectDB from './config/db.config';

dotenv.config(); // Load environment variables

const PORT = process.env.APP_PORT ?? 3000;

const startServer = async (): Promise<void> => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
