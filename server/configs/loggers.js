import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const logger = winston.createLogger({
  LOG_LEVEL: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default logger;
