// src/server.ts
import app from './app';
import logger from './utils/logger.util';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
});
