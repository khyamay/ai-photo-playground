import express from 'express';

import { cloudinaryRouter } from './cloudinary.route';

import { replicateRouter } from './replicate.route';

const router = express.Router();

router.use('/cloudinary', cloudinaryRouter);
router.use('/replicate', replicateRouter);

export const routes = router;
