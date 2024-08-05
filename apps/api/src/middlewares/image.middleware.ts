import { NextFunction, Request, Response } from 'express';

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { imageUrl } = req.body;
  if (!imageUrl || typeof imageUrl !== 'string') {
    return res.status(400).json({ error: 'Valid image URL is required' });
  }
  next();
};
