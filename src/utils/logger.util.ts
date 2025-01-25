import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Define a custom log format
const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info', // Set your desired log level here (info, debug, etc.)
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),   // Optional: colorize output for console
        customFormat
    ),
    transports: [
        new transports.Console(),
        // Example: a file transport for error logs
        new transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
});

export default logger;
