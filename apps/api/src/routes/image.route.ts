import { Router } from 'express';

import * as ImageController from '../controllers/image.controller';
import { validateImage } from '../middlewares';

export const imageRouter = Router();

imageRouter.post(
  '/store-url',
  validateImage,
  ImageController.handleImageUpload
);
