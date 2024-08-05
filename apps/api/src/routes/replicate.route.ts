import { Router } from 'express';
import * as ReplicateController from '../controllers/replicate.controller';
import { validateImage } from '../middlewares';

export const replicateRouter = Router();

replicateRouter.post(
  '/restore',
  validateImage,
  ReplicateController.handleRestoreImage
);
