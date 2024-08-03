import express from 'express';

import { cloudinaryRouter } from './cloudinary.route';
import { imageRouter } from './image.route';

const router = express.Router();

router.use('/cloudinary', cloudinaryRouter);
router.use('/image', imageRouter);

export const routes = router;
