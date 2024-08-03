import { NextFunction, Request, Response } from 'express';

export const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original image URL is required' });
  }
  next();
};
