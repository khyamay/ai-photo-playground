import express from 'express';

import { photoRouter } from './photo.routes';

const router = express.Router();

router.use('/photo', photoRouter);

export const routes = router;
