import express from 'express';
import config from 'config';
import swaggerSetups from './swagger';
import responseWrapper from './middlewares/responseWrapper';
import { NotFound } from './helpers/httpError';
import valueRouter from './routes/value';
import weatherRouter from './routes/waether';
import errorHandler from './middlewares/errorHandler';

const app = express();

// Express Configs
app.use(express.json());
app.use(responseWrapper);

// Doc
app.use('/api/v1/swagger', ...swaggerSetups);

// Routes
app.use('/api/v1/value', valueRouter);
app.use('/api/v1/weather', weatherRouter);

app.use((req, res, next) => next(new NotFound('Not Found')));

const port = process.env.PORT || config.server.port;

// Error Handling
app.use(errorHandler);

// Start
app.listen(port, () => {
  console.log('  App is running at port %d in %s mode', port, app.get('env'));
});

export default app;
