import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, reponse: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return reponse.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return reponse.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log(' Server started on port 3333');
});
