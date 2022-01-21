import express from 'express';
import config from 'config';
import swaggerSetups from './swagger';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import responseWrapper from './middlewares/responseWrapper';
import errorHandler from './middlewares/errorHandler';

import Database from './helpers/database';
import { NotFound } from './helpers/httpError';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import env from './helpers/env';

const app = express();

// Express Configs
app.use(
  cors({
    origin:
      config.cors?.allow ||
      (env.current === 'development' ? 'http://localhost:3000' : []),
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(responseWrapper);

// Doc
app.use('/swagger', ...swaggerSetups);

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => next(new NotFound('Route Not Found')));

// Error Handling
app.use(errorHandler);

// Connect to DB and start listening
Database.connect()
  .then(() => {
    const port = env.port || config.server.port;
    app.listen(port, () => {
      console.log('  App is running at port %d in %s mode', port, env.current);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

export default app;
