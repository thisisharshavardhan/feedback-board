import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { requestLogger } from './src/middleware/requestLogger';
import { errorHandler } from './src/middleware/errorHandler';
import { feedbackRouter } from './src/modules/feedback/feedback.router';
import { config } from './src/config/env';

export function createApp(): express.Application {
  const app = express();

  app.use(
    cors({
      origin: config.nodeEnv === 'production' ? false : config.clientOrigin,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'X-Voter-Token', 'X-Admin-Key'],
    })
  );

  app.use(express.json());
  app.use(requestLogger);

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/feedback', feedbackRouter);

  if (config.nodeEnv === 'production') {
    const clientDist = path.resolve(__dirname, '../../client/dist');
    if (fs.existsSync(clientDist)) {
      app.use(express.static(clientDist));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
      });
    }
  }

  app.use(errorHandler);

  return app;
}
