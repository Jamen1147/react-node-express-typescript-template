import express from 'express';
import config from 'config';
import swaggerSetups from './swagger';
import cors from 'cors';

import responseWrapper from './middlewares/responseWrapper';
import errorHandler from './middlewares/errorHandler';

import Database from './helpers/database';
import { NotFound } from './helpers/httpError';

import userRouter from './routes/user';
import valueRouter from './routes/value';
import weatherRouter from './routes/waether';
import authRouter from './routes/auth';

const app = express();

// Express Configs
app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(responseWrapper);

// Doc
app.use('/swagger', ...swaggerSetups);

// Routes
app.use('/api/v1/value', valueRouter);
app.use('/api/v1/weather', weatherRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => next(new NotFound('Not Found')));

// Error Handling
app.use(errorHandler);

// Connect to DB and start listening
Database.connect()
  .then(() => {
    const port = process.env.PORT || config.server.port;
    app.listen(port, () => {
      console.log(
        '  App is running at port %d in %s mode',
        port,
        app.get('env')
      );
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export default app;
