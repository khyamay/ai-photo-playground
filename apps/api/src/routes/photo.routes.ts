import { Router } from 'express';

import { handlePhotoUpload } from '../controllers/photo.controller';
import { uploadMiddleware } from '../middlewares';

export const photoRouter = Router();

photoRouter.post('/upload', uploadMiddleware, handlePhotoUpload);
