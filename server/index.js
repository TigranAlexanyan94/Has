import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import logger from './configs/loggers';
import sequelizeCon from './configs/dbConfig';
import router from './routes/index';
import { initModels } from './models/index';
import cors from 'cors';
import bodyParser from 'body-parser'

dotenv.config();

const POST = process.env.PORT || 3003;
const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use('/ping', (request, response) => {
  response.send('pong');
});
app.use('/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const start = () => {
  sequelizeCon
    .authenticate()
    .then(() => {
      logger.info('Connection has been established successfully.');
      initModels(sequelizeCon);
      return sequelizeCon.sync();
    })
    .then(() => {
      app.listen(POST, () => {
        logger.info(`App listening on http://${process.env.DB_HOST}:${POST}`);
      });
    })
    .catch((error) => {
      logger.info('Database Error: ', error.message);
    });
};

start();
